/*
 Copyright 2013-2015 Jason Leyba
 
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

package com.github.jsdossier.jscomp;

import static com.github.jsdossier.testing.CompilerUtil.createSourceFile;
import static com.google.common.truth.Truth.assertThat;

import com.github.jsdossier.annotations.Input;
import com.github.jsdossier.testing.CompilerUtil;
import com.github.jsdossier.testing.GuiceRule;
import com.google.javascript.jscomp.CompilerOptions;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.nio.file.FileSystem;

import javax.inject.Inject;

/**
 * Tests for tracking aliases created by the compiler.
 */
@RunWith(JUnit4.class)
public class AliasTransformationTest {
  
  @Rule
  public GuiceRule guice = GuiceRule.builder(this)
      .setLanguageIn(CompilerOptions.LanguageMode.ECMASCRIPT6_STRICT)
      .build();

  @Inject @Input private FileSystem inputFs;
  @Inject private TypeRegistry2 typeRegistry;
  @Inject private CompilerUtil util;
  
  @Test
  public void doesNotResolveAliasIfThereWereNoTransformations() {
    util.compile(inputFs.getPath("foo/bar.js"),
        "/** @constructor */ function X() {};",
        "/** @constructor */ function Y() {};");
    
    NominalType2 x = typeRegistry.getType("X");
    assertThat(typeRegistry.resolveAlias(x, "Y")).isNull();
  }
  
  @Test
  public void resolveAliasFromGoogScopeBlock() {
    util.compile(inputFs.getPath("foo/bar.js"),
        "goog.provide('foo');",
        "goog.scope(function() {",
        "  var x = foo;",
        "  /** @constructor */x.A = function() {};",
        "});");

    NominalType2 a = typeRegistry.getType("foo.A");
    assertThat(typeRegistry.resolveAlias(a, "x")).isEqualTo("foo");
    assertThat(typeRegistry.resolveAlias(a, "y")).isNull();
    assertThat(typeRegistry.resolveAlias(a, "foo")).isNull();
  }
  
  @Test
  public void resolveAliasFromGoogModule() {
    util.compile(inputFs.getPath("foo/bar.js"),
        "goog.module('foo');",
        "/** @constructor */ function X() {};",
        "/** @constructor @extends {X} */ function Y() {};",
        "exports.Z = Y;");

    NominalType2 z = typeRegistry.getType("foo.Z");
    assertThat(typeRegistry.resolveAlias(z, "X")).isEqualTo("$jscomp.scope.X");
    assertThat(typeRegistry.resolveAlias(z, "Y")).isEqualTo("$jscomp.scope.Y");
  }
  
  @Test
  public void resolveAliasFromNodeModule() {
    defineInputModules("module", "foo.js", "bar.js");
    util.compile(
        createSourceFile(
            inputFs.getPath("module/foo.js"),
            "exports.X = class {};"),
        createSourceFile(
            inputFs.getPath("module/bar.js"),
            "const f = require('./foo');",
            "class Y extends f.X {}",
            "exports.Z = Y;"));

    NominalType2 z = typeRegistry.getType("dossier$$module__module$bar.Z");
    assertThat(typeRegistry.resolveAlias(z, "f")).isEqualTo("dossier$$module__module$foo");
    assertThat(typeRegistry.resolveAlias(z, "Y")).isEqualTo("$jscomp.scope.Y");
  }
  
  @Test
  public void resolveAliasFromEs6Module() {
    defineInputModules("module", "foo.js", "bar.js");
    util.compile(
        createSourceFile(
            inputFs.getPath("module/foo.js"),
            "class X {}",
            "export {X as Y};"),
        createSourceFile(
            inputFs.getPath("module/bar.js"),
            "import * as f from './foo';",
            "export class Y extends f.X {}"));

    NominalType2 type = typeRegistry.getType("module$module$bar.Y");
    assertThat(typeRegistry.resolveAlias(type, "Y")).isEqualTo("Y$$module$module$bar");
  }

  private void defineInputModules(String prefix, String... modules) {
    guice.toBuilder()
        .setModulePrefix(prefix)
        .setModules(modules)
        .build()
        .createInjector()
        .injectMembers(this);
  }
}