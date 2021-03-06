/*
Copyright 2013-2016 Jason Leyba

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package com.github.jsdossier;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Preconditions.checkState;
import static com.google.common.base.Strings.isNullOrEmpty;
import static com.google.common.truth.Truth.assertThat;
import static com.google.common.truth.Truth.assertWithMessage;
import static java.nio.charset.StandardCharsets.UTF_8;
import static java.nio.file.Files.copy;
import static java.nio.file.Files.createDirectories;
import static java.nio.file.Files.createTempDirectory;
import static java.nio.file.Files.createTempFile;
import static java.nio.file.Files.readAllBytes;
import static java.nio.file.Files.write;
import static org.junit.Assert.assertEquals;

import com.google.common.base.Joiner;
import com.google.common.base.Splitter;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Iterables;
import com.google.common.io.Resources;
import com.google.common.jimfs.Jimfs;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.Before;
import org.junit.Test;
import org.junit.experimental.runners.Enclosed;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(Enclosed.class)
public class EndToEndTest {

  @RunWith(JUnit4.class)
  public static class ConfigurationEquivalenceTest {
    @Test
    public void flagAndJsonConfigAreEquivalent() throws IOException {
      FileSystem fs = Jimfs.newFileSystem();
      Path tmpDir = fs.getPath("/root");

      Scenario jsonScenario = createScenario(tmpDir, false);
      Scenario flagScenario = createScenario(tmpDir, true);

      String[] jsonArgs = jsonScenario.buildCommandLine();
      String[] flagArgs = flagScenario.buildCommandLine();

      assertThat(jsonArgs.length).isLessThan(flagArgs.length);
      assertThat(jsonArgs).asList().contains("-c");
      assertThat(flagArgs).asList().doesNotContain("-c");

      com.github.jsdossier.Config jsonConfig = loadConfig(jsonScenario);
      com.github.jsdossier.Config flagConfig = loadConfig(flagScenario);

      assertThat(jsonConfig.getFileSystem()).isSameAs(flagConfig.getFileSystem());
      assertThat(jsonConfig.toJson()).isEqualTo(flagConfig.toJson());
    }

    private com.github.jsdossier.Config loadConfig(Scenario scenario) throws IOException {
      Flags flags = Flags.parse(scenario.buildCommandLine(), scenario.getInputFileSystem());
      return com.github.jsdossier.Config.fromFlags(flags, scenario.getInputFileSystem());
    }

    private Scenario createScenario(Path tmpDir, boolean useFlags) throws IOException {
      Scenario scenario = new Scenario("out/equivalence_test", useFlags);
      // These tests require the default file system.
      scenario.initFileSystem(tmpDir);
      return scenario;
    }
  }

  private abstract static class AbstractScenarioTest {
    private Path outDir;

    abstract Scenario getScenario();

    @Before
    public void initOutputDir() throws Exception {
      outDir = getScenario().init();
    }

    @Test
    public void checkCopiesAllSourceFiles() {
      assertExists(outDir.resolve("source/closure_module.js.src.html"));
      assertExists(outDir.resolve("source/globals.js.src.html"));
      assertExists(outDir.resolve("source/json.js.src.html"));
      assertExists(outDir.resolve("source/example/index.js.src.html"));
      assertExists(outDir.resolve("source/subdir/emptyenum.js.src.html"));
    }

    @Test
    public void checkSourceFileRendering() throws IOException {
      Document document = load(outDir.resolve("source/subdir/emptyenum.js.src.html"));
      compareWithGoldenFile(extractPageData(document), "source/subdir/emptyenum.js.src.json");
      checkHeader(document);
      checkNav(document);
      compareWithGoldenFile(querySelectorAll(document, "footer"), "source/subdir/footer.html");
    }

    @Test
    public void checkMarkdownIndexProcessing() throws IOException {
      Document document = load(outDir.resolve("index.html"));
      compareWithGoldenFile(extractPageData(document), "index.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkGlobalClass() throws IOException {
      Document document = load(outDir.resolve("GlobalCtor.html"));
      compareWithGoldenFile(extractPageData(document), "GlobalCtor.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkGlobalEnum() throws IOException {
      Document document = load(outDir.resolve("GlobalEnum.html"));
      compareWithGoldenFile(extractPageData(document), "GlobalEnum.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkEmptyGlobalEnum() throws IOException {
      Document document = load(outDir.resolve("EmptyEnum.html"));
      compareWithGoldenFile(extractPageData(document), "EmptyEnum.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkGlobalUndefinedEnum() throws IOException {
      Document document = load(outDir.resolve("UndefinedEnum.html"));
      compareWithGoldenFile(extractPageData(document), "UndefinedEnum.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkDeprecatedClass() throws IOException {
      Document document = load(outDir.resolve("DeprecatedFoo.html"));
      compareWithGoldenFile(extractPageData(document), "DeprecatedFoo.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkFunctionNamespace() throws IOException {
      Document document = load(outDir.resolve("sample.json.html"));
      compareWithGoldenFile(extractPageData(document), "sample.json.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkInterfaceThatExtendsOtherInterfaces() throws IOException {
      Document document = load(outDir.resolve("sample.inheritance.LeafInterface.html"));
      compareWithGoldenFile(extractPageData(document), "sample.inheritance.LeafInterface.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkExportedApiOfClosureModule() throws IOException {
      Document document = load(outDir.resolve("closure.module.html"));
      compareWithGoldenFile(extractPageData(document), "closure.module.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkClassDefiendOnClosureModuleExportsObject() throws IOException {
      Document document = load(outDir.resolve("closure.module.Clazz.html"));
      compareWithGoldenFile(extractPageData(document), "closure.module.Clazz.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkClassExportedByClosureModule() throws IOException {
      Document document = load(outDir.resolve("closure.module.PubClass.html"));
      compareWithGoldenFile(extractPageData(document), "closure.module.PubClass.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkClassExtendsTemplateClass() throws IOException {
      Document document = load(outDir.resolve("sample.inheritance.NumberClass.html"));
      compareWithGoldenFile(extractPageData(document), "sample.inheritance.NumberClass.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkGoogDefinedClass() throws IOException {
      Document document = load(outDir.resolve("sample.inheritance.StringClass.html"));
      compareWithGoldenFile(extractPageData(document), "sample.inheritance.StringClass.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkDeprecatedClassWithSuperTypes() throws IOException {
      Document document = load(outDir.resolve("sample.inheritance.DeprecatedFinalClass.html"));
      compareWithGoldenFile(
          extractPageData(document), "sample.inheritance.DeprecatedFinalClass.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkPackageIndexCommonJsModule() throws IOException {
      Document document = load(outDir.resolve("module/example/index.html"));
      compareWithGoldenFile(extractPageData(document), "module/example/index.json");
      checkHeader(document);
      checkNav(document);
      checkModuleFooter(document);
    }

    @Test
    public void checkCommonJsModule() throws IOException {
      Document document = load(outDir.resolve("module/example/nested.html"));
      compareWithGoldenFile(extractPageData(document), "module/example/nested.json");
      checkHeader(document);
      checkNav(document);
      checkModuleFooter(document);
    }

    @Test
    public void checkCommonJsModuleThatIsExportedConstructor() throws IOException {
      Document document = load(outDir.resolve("module/example/worker.html"));
      compareWithGoldenFile(extractPageData(document), "module/example/worker.json");
      checkHeader(document);
      checkNav(document);
      checkModuleFooter(document);
    }

    @Test
    public void checkCommonJsModuleClassAlias() throws IOException {
      Document document = load(outDir.resolve("module/example/index_exports_Greeter.html"));
      compareWithGoldenFile(extractPageData(document), "module/example/index_exports_Greeter.json");
      checkHeader(document);
      checkNav(document);
      checkModuleFooter(document);
    }

    @Test
    public void checkCommonJsModuleExportedInterface() throws IOException {
      Document document = load(outDir.resolve("module/example/nested_exports_IdGenerator.html"));
      compareWithGoldenFile(
          extractPageData(document), "module/example/nested_exports_IdGenerator.json");
      checkHeader(document);
      checkNav(document);
      checkModuleFooter(document);
    }

    @Test
    public void checkCommonJsModuleInterfaceImplementation() throws IOException {
      Document document =
          load(outDir.resolve("module/example/nested_exports_IncrementingIdGenerator.html"));
      compareWithGoldenFile(
          extractPageData(document), "module/example/nested_exports_IncrementingIdGenerator.json");
      checkHeader(document);
      checkNav(document);
      checkModuleFooter(document);
    }

    @Test
    public void checkModuleExportedClass() throws IOException {
      Document document = load(outDir.resolve("module/example/nested_exports_Person.html"));
      compareWithGoldenFile(extractPageData(document), "module/example/nested_exports_Person.json");
      checkHeader(document);
      checkNav(document);
      checkModuleFooter(document);
    }

    @Test
    public void checkClassThatExtendsExternType() throws IOException {
      Document document = load(outDir.resolve("sample.inheritance.RunnableError.html"));
      compareWithGoldenFile(extractPageData(document), "sample.inheritance.RunnableError.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkNamespaceWithFilteredTypes() throws IOException {
      Document document = load(outDir.resolve("foo.html"));
      compareWithGoldenFile(extractPageData(document), "foo.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkUnfilteredAliasOfFilteredClass() throws IOException {
      Document document = load(outDir.resolve("foo.quot.OneBarAlias.html"));
      compareWithGoldenFile(extractPageData(document), "foo.quot.OneBarAlias.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkEs6Class() throws IOException {
      Document document = load(outDir.resolve("Calculator.html"));
      compareWithGoldenFile(extractPageData(document), "Calculator.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkTypesWithCaseInsensitiveOutputFileNameCollision() throws IOException {
      for (String file : ImmutableList.of("test.Registry.html", "test.registry.html")) {
        Document document = load(outDir.resolve(file));
        compareWithGoldenFile(extractPageData(document), "Registry.json");
        checkHeader(document);
        checkNav(document);
        checkFooter(document);
      }
    }

    @Test
    public void checkEs6Module() throws IOException {
      Document document = load(outDir.resolve("module/example/net.html"));
      compareWithGoldenFile(extractPageData(document), "module/example/net.json");
      checkHeader(document);
      checkNav(document);
      checkModuleFooter(document);
    }

    @Test
    public void checkEs6ModuleWithImportButNoExports() throws IOException {
      Document document = load(outDir.resolve("module/example/empty.html"));
      compareWithGoldenFile(extractPageData(document), "module/example/empty.json");
      checkHeader(document);
      checkNav(document);
      checkModuleFooter(document);
    }

    @Test
    public void checkEs6ModuleExportedClass() throws IOException {
      Document document = load(outDir.resolve("module/example/net_exports_HttpClient.html"));
      compareWithGoldenFile(
          extractPageData(document), "module/example/net_exports_HttpClient.json");
      checkHeader(document);
      checkNav(document);
      checkModuleFooter(document);
    }

    @Test
    public void checkGeneratedTypeIndex() throws IOException {
      String goldenPath = "resources/golden/types.json";
      URL url = EndToEndTest.class.getResource(goldenPath);
      String expectedContent = Resources.toString(url, UTF_8).trim();

      String actualContent = new String(readAllBytes(outDir.resolve("types.js")), UTF_8);
      actualContent = actualContent.substring("var TYPES = ".length());
      actualContent = actualContent.substring(0, actualContent.length() - 1);

      Gson gson = new GsonBuilder().setPrettyPrinting().create();

      JsonArray json = gson.fromJson(actualContent, JsonArray.class);
      actualContent = gson.toJson(json).trim();

      updateGoldenFile(goldenPath, actualContent);
      assertThat(actualContent).isEqualTo(expectedContent);
    }

    @Test
    public void visibilityRendering() throws IOException {
      Document document = load(outDir.resolve("vis.html"));
      compareWithGoldenFile(extractPageData(document), "vis.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);

      document = load(outDir.resolve("vis.InheritsVis.html"));
      compareWithGoldenFile(extractPageData(document), "vis.InheritsVis.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    @Test
    public void checkRecord() throws IOException {
      Document document = load(outDir.resolve("Person.html"));
      compareWithGoldenFile(extractPageData(document), "Person.json");
      checkHeader(document);
      checkNav(document);
      checkFooter(document);
    }

    private void checkHeader(Document document) throws IOException {
      compareWithGoldenFile(querySelector(document, "header"), "header.html");
    }

    private void checkFooter(Document document) throws IOException {
      Elements elements = querySelectorAll(document, "footer");
      compareWithGoldenFile(elements, "footer.html");
    }

    private void checkModuleFooter(Document document) throws IOException {
      Elements elements = querySelectorAll(document, "footer");
      compareWithGoldenFile(elements, "module/example/footer.html");
    }

    private void checkNav(Document document) {
      Elements elements = querySelectorAll(document, ".dossier-nav");
      assertThat(elements.size()).isEqualTo(1);
    }

    private void compareWithGoldenFile(Element element, String goldenPath) throws IOException {
      compareWithGoldenFile(element.toString(), goldenPath);
    }

    private void compareWithGoldenFile(Elements elements, String goldenPath) throws IOException {
      compareWithGoldenFile(elements.toString(), goldenPath);
    }

    private void compareWithGoldenFile(String actual, String goldenPath) throws IOException {
      actual = normalizeLines(actual);
      goldenPath = "resources/golden/" + goldenPath;

      updateGoldenFile(goldenPath, actual);

      String golden = Resources.toString(EndToEndTest.class.getResource(goldenPath), UTF_8);
      golden = normalizeLines(golden);
      assertEquals(golden, actual);
    }

    private static void updateGoldenFile(String goldenPath, String content) throws IOException {
      if (Boolean.getBoolean("dossier.e2e.updateGolden")) {
        Path localFsPath =
            FileSystems.getDefault()
                .getPath("./test/java")
                .resolve(EndToEndTest.class.getPackage().getName().replace('.', '/'))
                .resolve(goldenPath);
        Files.write(localFsPath, content.getBytes(UTF_8));
      }
    }

    private static String normalizeLines(String in) {
      Iterable<String> lines = Splitter.on('\n').split(in);
      lines =
          StreamSupport.stream(lines.spliterator(), false)
              .filter(Objects::nonNull)
              .map(
                  input -> {
                    int end = input.length();
                    while (end > 0 && input.charAt(end - 1) <= ' ') {
                      end -= 1;
                    }
                    return input.substring(0, end);
                  })
              .collect(Collectors.toList());
      return Joiner.on('\n').join(lines).trim();
    }

    private static Document load(Path path) throws IOException {
      String html = toString(path);
      Document document = Jsoup.parse(html);
      document.outputSettings().prettyPrint(true).indentAmount(2);
      return document;
    }

    private static String extractPageData(Document document) {
      Elements elements = document.select("main[data-page-data]");
      checkState(!elements.isEmpty(), "Main element not found in %s", document);
      Element element = Iterables.getOnlyElement(elements);

      Gson gson = new GsonBuilder().setPrettyPrinting().create();

      String data = element.attributes().dataset().get("page-data");
      JsonArray json = gson.fromJson(data, JsonArray.class);
      return gson.toJson(json).trim();
    }

    private static Element querySelector(Document document, String selector) {
      Elements elements = document.select(selector);
      checkState(!elements.isEmpty(), "Selector %s not found in %s", selector, document);
      return Iterables.getOnlyElement(elements);
    }

    private static Elements querySelectorAll(Document document, String selector) {
      return document.select(selector);
    }

    private static String toString(Path path) throws IOException {
      return new String(readAllBytes(path), UTF_8);
    }

    private static void assertExists(Path path) {
      assertWithMessage("Expected to exist: " + path).that(Files.exists(path)).isTrue();
    }
  }

  @RunWith(JUnit4.class)
  public static class DirectoryOutputTest extends AbstractScenarioTest {
    private static final Scenario SCENARIO = new Scenario("out/");

    @Override
    Scenario getScenario() {
      return SCENARIO;
    }
  }

  @RunWith(JUnit4.class)
  public static class DirectoryOutputFlagBasedConfigTest extends AbstractScenarioTest {
    private static final Scenario SCENARIO = new Scenario("out/flags", true);

    @Override
    Scenario getScenario() {
      return SCENARIO;
    }
  }

  @RunWith(JUnit4.class)
  public static class ZipOutputTest extends AbstractScenarioTest {
    private static final Scenario SCENARIO = new Scenario("out.zip");

    @Override
    Scenario getScenario() {
      return SCENARIO;
    }
  }

  private static class Config {
    private final JsonObject json = new JsonObject();
    private final JsonArray customPages = new JsonArray();
    private final JsonArray moduleFilters = new JsonArray();
    private final JsonArray typeFilters = new JsonArray();
    private final JsonArray sources = new JsonArray();
    private final JsonArray modules = new JsonArray();

    void addCustomPage(String name, Path path) {
      JsonObject spec = new JsonObject();
      spec.addProperty("name", name);
      spec.addProperty("path", path.toString());
      customPages.add(spec);
      json.add("customPages", customPages);
      json.addProperty("moduleNamingConvention", "NODE");
    }

    void addFilter(String name) {
      typeFilters.add(new JsonPrimitive(name));
      json.add("typeFilters", typeFilters);
    }

    void addModuleFilter(String path) {
      moduleFilters.add(new JsonPrimitive(path));
      json.add("moduleFilters", moduleFilters);
    }

    void setOutput(Path path) {
      json.addProperty("output", path.toString());
    }

    void setReadme(Path path) {
      json.addProperty("readme", path.toString());
    }

    void addSource(Path path) {
      sources.add(new JsonPrimitive(path.toString()));
      json.add("sources", sources);
    }

    void addModule(Path path) {
      modules.add(new JsonPrimitive(path.toString()));
      json.addProperty("environment", "NODE");
      json.add("modules", modules);
    }

    @Override
    public String toString() {
      return json.toString();
    }
  }

  private static void writeConfig(Path path, Config config) throws IOException {
    write(path, ImmutableList.of(config.toString()), UTF_8);
  }

  private static void copyResource(String from, Path to) throws IOException {
    createDirectories(to.getParent());

    InputStream resource = EndToEndTest.class.getResourceAsStream(from);
    checkNotNull(resource, "Resource not found: %s", from);
    copy(resource, to, StandardCopyOption.REPLACE_EXISTING);
  }

  private static class Scenario {
    private final String outputPath;
    private final boolean useFlags;

    private Path tmpDir;
    private Path srcDir;
    private Path outDir;
    private Exception initFailure;

    private Scenario(String outputPath) {
      this(outputPath, false);
    }

    private Scenario(String outputPath, boolean useFlags) {
      this.outputPath = outputPath;
      this.useFlags = useFlags;
    }

    @Override
    public String toString() {
      return outputPath;
    }

    public Path init() throws Exception {
      if (outDir != null) {
        return outDir;
      }

      if (initFailure != null) {
        throw initFailure;
      }

      try {
        initFileSystem();
        outDir = generateData();
        return outDir;
      } catch (Exception e) {
        initFailure = e;
        throw e;
      }
    }

    public static boolean useDefaultFileSystem() {
      return Boolean.getBoolean("dossier.e2e.useDefaultFileSystem");
    }

    private void initFileSystem() throws IOException {
      initFileSystem(null);
    }

    private static Path createTmpDir(String outputPath) throws IOException {
      FileSystem fileSystem;
      Path tmpDir;
      if (outputPath.endsWith(".zip") || useDefaultFileSystem()) {
        fileSystem = FileSystems.getDefault();

        String baseDir = System.getProperty("dossier.e2e.useDir");
        if (!isNullOrEmpty(baseDir)) {
          tmpDir = fileSystem.getPath(baseDir);
          createDirectories(tmpDir);
        } else {
          tmpDir = fileSystem.getPath(System.getProperty("java.io.tmpdir"));
          tmpDir = createTempDirectory(tmpDir, "dossier.e2e");
        }
      } else {
        fileSystem = Jimfs.newFileSystem();
        tmpDir = fileSystem.getPath("/tmp");
        createDirectories(tmpDir);
      }
      return tmpDir;
    }

    private void initFileSystem(Path tmpDir) throws IOException {
      if (tmpDir == null) {
        tmpDir = createTmpDir(outputPath);
      }
      this.tmpDir = tmpDir;
      srcDir = tmpDir.resolve("src");

      copyResource("resources/SimpleReadme.md", srcDir.resolve("SimpleReadme.md"));
      copyResource("resources/Custom.md", srcDir.resolve("Custom.md"));
      copyResource("resources/closure_module.js", srcDir.resolve("main/closure_module.js"));
      copyResource("resources/es2015.js", srcDir.resolve("main/es2015.js"));
      copyResource("resources/filter.js", srcDir.resolve("main/filter.js"));
      copyResource("resources/globals.js", srcDir.resolve("main/globals.js"));
      copyResource("resources/json.js", srcDir.resolve("main/json.js"));
      copyResource("resources/inheritance.js", srcDir.resolve("main/inheritance.js"));
      copyResource("resources/namespace.js", srcDir.resolve("main/namespace.js"));
      copyResource("resources/registry.js", srcDir.resolve("main/registry.js"));
      copyResource("resources/visibility.js", srcDir.resolve("main/visibility.js"));
      copyResource("resources/emptyenum.js", srcDir.resolve("main/subdir/emptyenum.js"));
      copyResource("resources/module/index.js", srcDir.resolve("main/example/index.js"));
      copyResource("resources/module/nested.js", srcDir.resolve("main/example/nested.js"));
      copyResource("resources/module/es6/empty.js", srcDir.resolve("main/example/empty.js"));
      copyResource("resources/module/es6/filter.js", srcDir.resolve("main/example/filter.js"));
      copyResource("resources/module/es6/net.js", srcDir.resolve("main/example/net.js"));
      copyResource("resources/module/worker.js", srcDir.resolve("main/example/worker.js"));
    }

    FileSystem getInputFileSystem() {
      return srcDir.getFileSystem();
    }

    private void addAll(List<String> list, String... items) {
      list.addAll(Arrays.asList(items));
    }

    String[] buildCommandLine() throws IOException {
      final Path output = tmpDir.resolveSibling(outputPath);
      final List<String> filters = ImmutableList.of("^foo.\\w+_.*", "foo.FilteredClass", "foo.bar");

      final List<String> moduleFilters = ImmutableList.of(".*/main/example/filter.js$");

      final List<Path> sources =
          ImmutableList.of(
              srcDir.resolve("main/closure_module.js"),
              srcDir.resolve("main/es2015.js"),
              srcDir.resolve("main/filter.js"),
              srcDir.resolve("main/globals.js"),
              srcDir.resolve("main/json.js"),
              srcDir.resolve("main/inheritance.js"),
              srcDir.resolve("main/namespace.js"),
              srcDir.resolve("main/registry.js"),
              srcDir.resolve("main/visibility.js"),
              srcDir.resolve("main/subdir/emptyenum.js"),

              // NB: this is explicitly declared as a normal source input to test that Dossier detects
              // the import statement and registers it as a module.
              srcDir.resolve("main/example/empty.js"));

      final List<Path> modules =
          ImmutableList.of(
              srcDir.resolve("main/example/filter.js"),
              srcDir.resolve("main/example/index.js"),
              srcDir.resolve("main/example/nested.js"),
              srcDir.resolve("main/example/net.js"),
              srcDir.resolve("main/example/worker.js"));

      String[] args;
      if (useFlags) {
        List<String> list = new ArrayList<>();
        addAll(
            list,
            "--num_threads",
            "1",
            "--output",
            output.toString(),
            "--readme",
            srcDir.resolve("SimpleReadme.md").toString(),
            "--custom_page",
            "Custom Page:" + srcDir.resolve("Custom.md"),
            "--environment",
            "NODE",
            "--module_naming_convention",
            "NODE");

        for (String filter : filters) {
          list.add("--type_filter");
          list.add(filter);
        }

        for (String filter : moduleFilters) {
          list.add("--module_filter");
          list.add(filter);
        }

        for (Path source : sources) {
          list.add("--source");
          list.add(source.toString());
        }

        for (Path module : modules) {
          list.add("--module");
          list.add(module.toString());
        }

        args = new String[list.size()];
        list.toArray(args);
      } else {
        Path config = createTempFile(tmpDir, "config", ".json");
        writeConfig(
            config,
            new Config() {
              {
                setOutput(output);
                setReadme(srcDir.resolve("SimpleReadme.md"));

                addCustomPage("Custom Page", srcDir.resolve("Custom.md"));

                for (String filter : filters) {
                  addFilter(filter);
                }

                for (String filter : moduleFilters) {
                  addModuleFilter(filter);
                }

                for (Path source : sources) {
                  addSource(source);
                }

                for (Path module : modules) {
                  addModule(module);
                }
              }
            });

        if (config.getFileSystem() == FileSystems.getDefault()) {
          config.toFile().deleteOnExit();
        }

        args = new String[] {"-c", config.toAbsolutePath().toString()};
      }
      return args;
    }

    private Path generateData() throws IOException {
      final Path output = tmpDir.resolveSibling(outputPath);
      System.out.println("Generating output in " + output);

      String[] args = buildCommandLine();
      Main.run(args, srcDir.getFileSystem());

      if (output.toString().endsWith(".zip")) {
        FileSystem fs;
        if (output.getFileSystem() == FileSystems.getDefault()) {
          URI uri = URI.create("jar:file:" + output.toAbsolutePath());
          fs = FileSystems.newFileSystem(uri, ImmutableMap.of());
        } else {
          fs = output.getFileSystem().provider().newFileSystem(output, ImmutableMap.of());
        }
        return fs.getPath("/");
      }
      return output;
    }
  }
}
