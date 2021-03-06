/*
Copyright 2013-2018 Jason Leyba

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

package com.github.jsdossier.testing;

import com.github.jsdossier.jscomp.Position;
import com.google.common.truth.FailureMetadata;
import com.google.common.truth.Subject;
import javax.annotation.Nullable;

public final class PositionSubject extends Subject<PositionSubject, Position> {
  PositionSubject(FailureMetadata md, @Nullable Position actual) {
    super(md, actual);
  }

  public void isEqualTo(int line, int col) {
    isEqualTo(Position.of(line, col));
  }
}
