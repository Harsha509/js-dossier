package com.github.jleyba.dossier;

import static com.google.common.base.Preconditions.checkArgument;
import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Preconditions.checkState;

import com.google.common.base.Optional;
import com.google.common.base.Splitter;
import com.google.common.base.Strings;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterables;
import com.google.javascript.rhino.JSDocInfo;
import com.google.javascript.rhino.JSTypeExpression;
import com.google.javascript.rhino.Node;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Nullable;

/**
 * Wraps a {@link JSDocInfo} object to compensate for the loss of information from
 * compiler's original parsing:
 * <ol>
 *   <li>guarantees parameter info will be returned in order of declaration in the original
 *       comment</li>
 *   <li>preserves whitespace on multi-line comments</li>
 * </ol>
 */
class JsDoc {

  private final JSDocInfo info;

  private final Map<String, ArgDescriptor> parameters = new LinkedHashMap<>();
  private final List<ThrowsClause> throwsClauses = new LinkedList<>();
  private final List<String> seeClauses = new LinkedList<>();

  private String blockComment = "";
  private String returnDescription = "";
  private String deprecationReason = "";
  private boolean parsed = false;

  JsDoc(JSDocInfo info) {
    this.info = checkNotNull(info, "null info");
  }

  JSDocInfo getInfo() {
    return info;
  }

  String getSource() {
    return info.getSourceName();
  }

  int getLineNum() {
    Node node = info.getAssociatedNode();
    if (node != null) {
      return Math.max(node.getLineno(), 0);
    }
    return 0;
  }

  boolean isConstructor() {
    return info.isConstructor();
  }

  boolean isInterface() {
    return info.isInterface();
  }

  boolean isEnum() {
    return info.getEnumParameterType() != null;
  }

  boolean isDeprecated() {
    return info.isDeprecated();
  }

  boolean isDefine() {
    return info.isDefine();
  }

  boolean isTypedef() {
    return info.getTypedefType() != null;
  }

  @Nullable JSTypeExpression getType() {
    if (isEnum()) {
      return info.getEnumParameterType();
    } else if (isTypedef()) {
      return info.getTypedefType();
    } else {
      return info.getType();
    }
  }

  JSDocInfo.Visibility getVisibility() {
    // TODO(jleyba): Properly handle Visibility.INHERITED
    if (info.getVisibility() == JSDocInfo.Visibility.INHERITED) {
      return JSDocInfo.Visibility.PUBLIC;
    }
    return info.getVisibility();
  }

  List<JSTypeExpression> getExtendedInterfaces() {
    return info.getExtendedInterfaces();
  }

  String getBlockComment() {
    parse();
    return blockComment;
  }

  String getDeprecationReason() {
    checkState(isDeprecated());
    parse();
    return deprecationReason;
  }

  ImmutableList<ArgDescriptor> getParameters() {
    parse();
    return ImmutableList.copyOf(parameters.values());
  }

  ArgDescriptor getParameter(String name) {
    parse();
    checkArgument(parameters.containsKey(name), "No parameter named %s", name);
    return parameters.get(name);
  }

  @Nullable JSTypeExpression getReturnType() {
    return info.getReturnType();
  }

  String getReturnDescription() {
    parse();
    return returnDescription;
  }

  ImmutableList<String> getSeeClauses() {
    parse();
    return ImmutableList.copyOf(seeClauses);
  }

  ImmutableList<ThrowsClause> getThrowsClauses() {
    parse();
    return ImmutableList.copyOf(throwsClauses);
  }

  ImmutableList<String> getTemplateTypeNames() {
    return info.getTemplateTypeNames();
  }

  private static final Pattern EOL_PATTERN = Pattern.compile("\r?\n");

  private void parse() {
    if (parsed) {
      return;
    }
    parsed = true;

    String original = Strings.nullToEmpty(info.getOriginalCommentString()).trim();
    if (original.isEmpty()) {
      return;
    }
    original = original.substring(0, original.length() - 2);  // subtract closing */

    Iterable<String> lines = Splitter.on(EOL_PATTERN).split(original);
    int firstAnnotation = findFirstAnnotationLine(lines);
    int annotationOffset = 0;
    if (firstAnnotation != -1) {
      blockComment = processBlockCommentLines(
          Iterables.limit(lines, firstAnnotation)
      );

      JSDocInfo.StringPosition firstAnnotationPosition =
          info.getMarkers().iterator().next().getAnnotation();

      annotationOffset = firstAnnotationPosition.getStartLine() - firstAnnotation;
    } else {
      blockComment = processBlockCommentLines(lines);
    }

    for (JSDocInfo.Marker marker : info.getMarkers()) {
      Optional<Annotation> annotation = Annotation.forMarker(marker);
      if (!annotation.isPresent()) {
        continue;  // Unrecognized/unsupported annotation.
      }

      JSDocInfo.StringPosition description = marker.getDescription();
      if (description == null) {
        continue;
      }

      int startLine = description.getStartLine() - annotationOffset;
      Iterable<String> descriptionLines = Iterables.skip(lines, startLine);

      int numLines = Math.max(description.getEndLine() - description.getStartLine(), 1);
      descriptionLines = Iterables.limit(descriptionLines, numLines);

      switch (annotation.get()) {
        case DEPRECATED:
          deprecationReason = processDescriptionLines(descriptionLines, description);
          break;
        case PARAM:
          String name = marker.getNameNode().getItem().getString();
          parameters.put(name, new ArgDescriptor(
              name,
              getJsTypeExpression(marker),
              processDescriptionLines(descriptionLines, description)));
          break;
        case RETURN:
          returnDescription = processDescriptionLines(descriptionLines, description);
          break;
        case SEE:
          seeClauses.add(processDescriptionLines(descriptionLines, description));
          break;
        case THROWS:
          throwsClauses.add(new ThrowsClause(
              getJsTypeExpression(marker),
              processDescriptionLines(descriptionLines, description)));
          break;
      }
    }
  }

  @Nullable
  private JSTypeExpression getJsTypeExpression(JSDocInfo.Marker marker) {
    if (marker.getType() == null) {
      return null;
    }
    return new JSTypeExpression(marker.getType().getItem(), info.getSourceName());
  }

  private static final Pattern STAR_PREFIX = Pattern.compile("^\\s*\\*+");
  private static final Pattern ANNOTATION_LINE_PATTERN = Pattern.compile("^\\s*\\**\\s*@[a-zA-Z]");

  private static int findFirstAnnotationLine(Iterable<String> lines) {
    int lineNum = 0;
    for (Iterator<String> it = lines.iterator(); it.hasNext(); lineNum++) {
      String line = it.next();
      if (lineNum == 0) {
        int start = line.indexOf("/**");
        if (start != -1) {
          line = line.substring(start + 3);
        }
      }
      Matcher m = ANNOTATION_LINE_PATTERN.matcher(line);
      if (m.find(0)) {
        return lineNum;
      }
    }
    return -1;  // Not found.
  }

  private static String processBlockCommentLines(Iterable<String> lines) {
    StringBuilder builder = new StringBuilder();
    boolean first = true;
    for (String line : lines) {
      if (first) {
        first = false;
        int index = line.indexOf("/**");
        if (index != -1) {
          line = line.substring(index + 3);
        }
      }
      Matcher matcher = STAR_PREFIX.matcher(line);
      if (matcher.find(0)) {
        line = line.substring(matcher.end());
      }
      builder.append(line).append('\n');
    }
    return builder.toString().trim();
  }

  private static String processDescriptionLines(Iterable<String> lines, JSDocInfo.StringPosition position) {
    StringBuilder builder = new StringBuilder();
    boolean isFirst = true;
    Iterator<String> it = lines.iterator();
    while (it.hasNext()) {
      String line = it.next();
      if (isFirst) {
        isFirst = false;
        line = line.substring(position.getPositionOnStartLine());
      } else {
        Matcher matcher = STAR_PREFIX.matcher(line);
        if (matcher.find(0)) {
          line = line.substring(matcher.end());
        }
      }

      builder.append(line).append('\n');
    }
    return builder.toString().trim();
  }

  static class ThrowsClause {

    private final Optional<JSTypeExpression> type;
    private final String description;

    private ThrowsClause(@Nullable JSTypeExpression type, String description) {
      this.type = Optional.fromNullable(type);
      this.description = description;
    }

    Optional<JSTypeExpression> getType() {
      return type;
    }

    String getDescription() {
      return description;
    }
  }

  static enum Annotation {
    DEFINE("define"),
    DEPRECATED("deprecated"),
    PARAM("param"),
    RETURN("return"),
    SEE("see"),
    THROWS("throws")
    ;

    private final String annotation;

    private Annotation(String annotation) {
      this.annotation = annotation;
    }

    static Optional<Annotation> forMarker(JSDocInfo.Marker marker) {
      for (Annotation a : Annotation.values()) {
        if (a.annotation.equals(marker.getAnnotation().getItem())) {
          return Optional.of(a);
        }
      }
      return Optional.absent();
    }

    String getAnnotation() {
      return annotation;
    }
  }
}