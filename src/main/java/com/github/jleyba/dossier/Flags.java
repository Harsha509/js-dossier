// Copyright 2013 Jason Leyba
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package com.github.jleyba.dossier;

import com.google.common.base.Optional;
import com.google.common.collect.Lists;
import org.kohsuke.args4j.CmdLineException;
import org.kohsuke.args4j.CmdLineParser;
import org.kohsuke.args4j.Option;
import org.kohsuke.args4j.OptionDef;
import org.kohsuke.args4j.spi.OptionHandler;
import org.kohsuke.args4j.spi.Parameters;
import org.kohsuke.args4j.spi.Setter;

import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Nullable;

/**
 * Describes the runtime configuration for the app.
 */
class Flags {

  @Option(
      name = "--help", aliases = "-h",
      usage = "Print this help message and exit.")
  boolean displayHelp;

  @Option(name = "--closure_library",
      handler = ClosurePathHandler.class,
      usage = "Path to the base directory of the Closure library (which must contain base.js and " +
          "deps.js). When this option is specified, Closure's deps.js and all of the files " +
          "specified by --closure_deps will be parsed for calls to goog.addDependency. The " +
          "resulting dependency map will be used to automatically expand the set of --src input " +
          "files any time a symbol is goog.require'd with the file that goog.provides that " +
          "symbol along with its transitive dependencies.")
  Optional<Path> closureLibraryDir = Optional.absent();

  @Option(name = "--closure_deps",
      handler = SimplePathHandler.class,
      usage = "Path to a file to parse for calls to goog.addDependency. This option requires " +
          "also specifying --closure_library. You may specify this option multiple times.")
  List<Path> closureDepsFile = new LinkedList<>();

  @Option(
      name = "--src", aliases = "-s",
      handler = SimplePathHandler.class,
      required = true,
      usage = "A .js file to generate API documentation for. If this path refers to a directory, " +
          "all .js files under the directory will be included as sources. This option may be " +
          "specified multiple times.")
  List<Path> srcs = new LinkedList<>();

  @Option(
      name = "--exclude", aliases = "-x",
      handler = SimplePathHandler.class,
      usage = "Path to a .js file to exclude from processing. If a directory is specified, all " +
          "its descendants will be excluded. This option may be specified multiple times.")
  List<Path> excludes = new LinkedList<>();

  @Option(
      name = "--exclude_filter", aliases = "-f",
      handler = PatternHandler.class,
      usage = "Defines a regular expression to apply to all of the input sources; those sources " +
          "matching this expression will be excluded from processing. This option may be " +
          "specified multiple times.")
  List<Pattern> filter = new LinkedList<>();

  @Option(
      name = "--extern", aliases = "-e",
      handler = SimplePathHandler.class,
      usage = "Path to a .js file to include as an extern file for the Closure compiler. These " +
          "files are used to satisfy references to external types, but are excluded when " +
          "generating API documentation. This option may be specified multiple times.")
  List<Path> externs = new LinkedList<>();

  @Option(
      name = "--license",
      handler = SimplePathHandler.class,
      usage = "Defines the path to the license file to include with the generated documentation.")
  Path license = null;

  @Option(
      name = "--readme",
      handler = SimplePathHandler.class,
      usage = "Path to a README file to include in the generated documentation. This file, which " +
          "should use markdown syntax will be included as the content of the main index page.")
  Path readme = null;

  @Option(
      name = "--output", aliases = "-o",
      handler = OutputDirPathHandler.class,
      usage = "Path to the directory to write all generated documentation to.",
      required = true)
  Path outputDir;

  private Flags() {}

  /**
   * Parses the given command line flags, exiting the program if there are any errors or if usage
   * information was requested with the {@link #displayHelp --help} flag.
   */
  static Flags parse(String[] args) {
    Flags flags = new Flags();
    CmdLineParser parser = new CmdLineParser(flags);

    boolean isConfigValid = true;
    List<String> preprocessedArgs = preprocessArgs(args);
    try {
      parser.parseArgument(preprocessedArgs);
    } catch (CmdLineException e) {
      System.err.println(e.getMessage());
      isConfigValid = false;
    }

    if (!flags.closureDepsFile.isEmpty() && !flags.closureLibraryDir.isPresent()) {
      System.err.println("--closure_deps requires --closure_library to be set");
      isConfigValid = false;
    }

    if (!isConfigValid || flags.displayHelp) {
      parser.printUsage(System.err);
      System.exit(1);
    }

    return flags;
  }

  private static List<String> preprocessArgs(String[] args) {
    Pattern argPattern = Pattern.compile("(--[a-zA-Z_]+)=(.*)");
    Pattern quotesPattern = Pattern.compile("^['\"](.*)['\"]$");
    List<String> processedArgs = Lists.newArrayList();
    for (String arg : args) {
      Matcher matcher = argPattern.matcher(arg);
      if (matcher.matches()) {
        processedArgs.add(matcher.group(1));

        String value = matcher.group(2);
        Matcher quotesMatcher = quotesPattern.matcher(value);
        if (quotesMatcher.matches()) {
          processedArgs.add(quotesMatcher.group(1));
        } else {
          processedArgs.add(value);
        }
      } else {
        processedArgs.add(arg);
      }
    }

    return processedArgs;
  }

  private static Path getPath(String path) {
    return FileSystems.getDefault()
        .getPath(path)
        .toAbsolutePath()
        .normalize();
  }

  public static class PatternHandler extends OptionHandler<Pattern> {

    public PatternHandler(
        CmdLineParser parser, OptionDef option, Setter<? super Pattern> setter) {
      super(parser, option, setter);
    }

    @Override
    public int parseArguments(Parameters params) throws CmdLineException {
      setter.addValue(Pattern.compile(params.getParameter(0)));
      return 1;
    }

    @Override
    public String getDefaultMetaVariable() {
      return "REGEX";
    }
  }

  public static class OutputDirPathHandler extends OptionHandler<Path> {

    public OutputDirPathHandler(
        CmdLineParser parser, OptionDef option, Setter<? super Path> setter) {
      super(parser, option, setter);
    }

    @Override
    public int parseArguments(Parameters params) throws CmdLineException {
      Path path = getPath(params.getParameter(0));
      if (Files.exists(path) && !Files.isDirectory(path)) {
        throw new CmdLineException(owner, "Path must be a directory: " + path);
      }
      setter.addValue(path);
      return 1;
    }

    @Override
    public String getDefaultMetaVariable() {
      return "PATH";
    }
  }

  public static class SimplePathHandler extends OptionHandler<Path> {
    public SimplePathHandler(
        CmdLineParser parser, OptionDef option, Setter<? super Path> setter) {
      super(parser, option, setter);
    }

    @Override
    public int parseArguments(Parameters params) throws CmdLineException {
      Path path = getPath(params.getParameter(0));
      if (!Files.exists(path)) {
        throw new CmdLineException(owner, "Path does not exist: " + path);
      }

      if (!Files.isReadable(path)) {
        throw new CmdLineException(owner, "Path is not readable: " + path);
      }

      setter.addValue(path);
      return 1;
    }

    @Override
    public String getDefaultMetaVariable() {
      return "PATH";
    }
  }

  public static class ClosurePathHandler extends OptionHandler<Optional<Path>> {
    public ClosurePathHandler(
        CmdLineParser parser, OptionDef option, Setter<? super Optional<Path>> setter) {
      super(parser, option, setter);
    }

    @Override
    public int parseArguments(Parameters params) throws CmdLineException {
      Path path = getPath(params.getParameter(0));
      if (Files.exists(path) && !Files.isDirectory(path)) {
        throw new CmdLineException(owner, "Path must be a directory: " + path);
      }
      checkExists(path.resolve("base.js"));
      checkExists(path.resolve("deps.js"));
      setter.addValue(Optional.of(path));
      return 1;
    }

    @Override
    public String getDefaultMetaVariable() {
      return "PATH";
    }

    private void checkExists(Path p) throws CmdLineException {
      if (!Files.exists(p) || !Files.isReadable(p)) {
        throw new CmdLineException(owner, String.format(
            "%s must exist in the specified directory: %s",
            p.getFileName(), p.getParent()));
      }
    }
  }
}
