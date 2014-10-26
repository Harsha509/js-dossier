// This file was automatically generated from dossier.soy.
// Please don't edit this file by hand.

goog.provide('dossier.soy');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.pageHeader = function(opt_data, opt_ignored) {
  var output = '<!DOCTYPE html><meta charset="UTF-8"><meta http-equiv="Content-Language" content="en" /><title>' + soy.$$escapeHtml(opt_data.title) + '</title>';
  var styleSheetList6 = opt_data.resources.css;
  var styleSheetListLen6 = styleSheetList6.length;
  for (var styleSheetIndex6 = 0; styleSheetIndex6 < styleSheetListLen6; styleSheetIndex6++) {
    var styleSheetData6 = styleSheetList6[styleSheetIndex6];
    output += '<link href="' + soy.$$escapeHtml(styleSheetData6) + '" rel="stylesheet" type="text/css">';
  }
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.topNav = function(opt_data, opt_ignored) {
  return '<nav id="topnav"><div><div id="menubutton"><label for="sidenav-toggle">Menu</label></div><form id="searchbox"><div><input type="search" placeholder="Search" tabindex="1"></div></form></div></nav>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.sideNavToggle = function(opt_data, opt_ignored) {
  return '<input type="checkbox" id="sidenav-toggle" />';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.sideNav = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return '<nav id="sidenav"><input type="checkbox" id="sidenav-types-ctrl" /><input type="checkbox" id="sidenav-files-ctrl" /><input type="checkbox" id="sidenav-modules-ctrl" /><a id="sidenav-overview"><div><h4>Overview</h4></div></a><div id="sidenav-types"><label for="sidenav-types-ctrl"><h4>Types</h4></label><i>Loading</i></div><div id="sidenav-modules"><label for="sidenav-modules-ctrl"><h4>Modules</h4></label><i>Loading</i></div><div id="sidenav-files"><label for="sidenav-files-ctrl"><h4>Files</h4></label><i>Loading</i></div>' + ((opt_data.licensePath) ? '<a href="' + soy.$$escapeHtml(opt_data.licensePath) + '"><div><h4>License</h4></div></a>' : '') + '</nav>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.footer = function(opt_data, opt_ignored) {
  var output = '<footer><a href="https://github.com/jleyba/js-dossier">Generated by dossier</a></footer>';
  var scriptList25 = opt_data.scripts;
  var scriptListLen25 = scriptList25.length;
  for (var scriptIndex25 = 0; scriptIndex25 < scriptListLen25; scriptIndex25++) {
    var scriptData25 = scriptList25[scriptIndex25];
    output += '<script src="' + soy.$$escapeHtml(scriptData25) + '"><\/script>';
  }
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.comment = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.comment && opt_data.comment.token.length) {
    output += (! opt_data.omitLeadingTag) ? '<p>' : '';
    var tokenList36 = opt_data.comment.token;
    var tokenListLen36 = tokenList36.length;
    for (var tokenIndex36 = 0; tokenIndex36 < tokenListLen36; tokenIndex36++) {
      var tokenData36 = tokenList36[tokenIndex36];
      output += ((tokenData36.isCode) ? '<code ' + ((tokenData36.href || tokenData36.unresolvedLink) ? ' class="type"' : '') + '>' : '') + ((tokenData36.href) ? '<a href="' + soy.$$escapeHtml(tokenData36.href) + '">' : (tokenData36.unresolvedLink) ? '<a class="unresolved-link">' : '') + ((tokenData36.isCode || tokenData36.isLiteral) ? soy.$$escapeHtml(tokenData36.text) : soy.$$filterNoAutoescape(tokenData36.text)) + ((tokenData36.unresolvedLink || tokenData36.href) ? '</a>' : '') + ((tokenData36.isCode) ? '</code>' : '');
    }
  }
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.sourceLink = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  return (opt_data.href) ? '<a class="source" href="' + soy.$$escapeHtml(opt_data.href) + '">code &raquo;</a>' : '';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.classInheritance = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.types.length >= 2) {
    output += '<pre><code>';
    var typeList74 = opt_data.types;
    var typeListLen74 = typeList74.length;
    for (var typeIndex74 = 0; typeIndex74 < typeListLen74; typeIndex74++) {
      var typeData74 = typeList74[typeIndex74];
      if (! (typeIndex74 == 0)) {
        output += '\n  ';
        if (typeIndex74 > 1) {
          var iLimit81 = typeIndex74 - 1;
          for (var i81 = 0; i81 < iLimit81; i81++) {
            output += '    ';
          }
        }
        output += '&#x2514; ';
      }
      output += (typeIndex74 == typeListLen74 - 1 || ! typeData74.href) ? soy.$$escapeHtml(typeData74.text) : '<a href="' + soy.$$escapeHtml(typeData74.href) + '">' + soy.$$escapeHtml(typeData74.text) + '</a>';
    }
    output += '</code></pre>';
  }
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.printInterfaces = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.type.implementedType.length) {
    output += '<dl><dt>All ' + ((opt_data.type.isInterface) ? 'extended' : 'implemented') + ' interfaces:<dd>';
    var interfaceList105 = opt_data.type.implementedType;
    var interfaceListLen105 = interfaceList105.length;
    for (var interfaceIndex105 = 0; interfaceIndex105 < interfaceListLen105; interfaceIndex105++) {
      var interfaceData105 = interfaceList105[interfaceIndex105];
      output += '<code><a href="' + soy.$$escapeHtml(interfaceData105.href) + '">' + soy.$$escapeHtml(interfaceData105.text) + '</a></code>' + ((! (interfaceIndex105 == interfaceListLen105 - 1)) ? ', ' : '');
    }
    output += '</dl>';
  }
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.deprecationNotice = function(opt_data, opt_ignored) {
  return (opt_data.deprecation && opt_data.deprecation.notice && opt_data.deprecation.notice.token.length) ? '<div class="deprecation-notice">Deprecated: <span class="deprecation-reason">' + dossier.soy.comment({comment: opt_data.deprecation.notice, omitLeadingTag: true}) + '</span></div>' : '';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.typeHeader = function(opt_data, opt_ignored) {
  return '<header><h1>' + ((opt_data.type.isModule) ? 'Module ' + soy.$$escapeHtml(opt_data.type.name) : (opt_data.type.isInterface) ? 'Interface ' + soy.$$escapeHtml(opt_data.type.name) : (opt_data.type.mainFunction && opt_data.type.mainFunction.isConstructor) ? 'Class ' + soy.$$escapeHtml(opt_data.type.name) : (opt_data.type.enumeration) ? 'Enum ' + soy.$$escapeHtml(opt_data.type.name) : 'Namespace ' + soy.$$escapeHtml(opt_data.type.name)) + ((opt_data.type.mainFunction && opt_data.type.mainFunction.templateName.length) ? '.' + dossier.soy.printTemplateNames({names: opt_data.type.mainFunction.templateName}) : '') + ((opt_data.type.deprecation) ? '<span class="deprecation-notice"> (deprecated)</span>' : '') + '</h1>' + dossier.soy.sourceLink({href: opt_data.type.source}) + ((opt_data.type.enumeration) ? '<dl><dt>Type: <code class="type">' + soy.$$filterNoAutoescape(opt_data.type.enumeration.typeHtml) + '</code></dl>' : '') + dossier.soy.classInheritance({types: opt_data.type.extendedType}) + dossier.soy.printInterfaces(opt_data) + dossier.soy.deprecationNotice({deprecation: opt_data.type.deprecation}) + '</header>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.enumValues = function(opt_data, opt_ignored) {
  var output = '<h2>Values and Descriptions</h2><div class="type-summary">';
  switch (opt_data.enumeration.visibility) {
    case 'PUBLIC':
      output += '<dl class="public">';
      break;
    case 'PROTECTED':
      output += '<dl class="protected">';
      break;
    case 'PRIVATE':
      output += '<dl class="private">';
      break;
  }
  var valueList175 = opt_data.enumeration.value;
  var valueListLen175 = valueList175.length;
  for (var valueIndex175 = 0; valueIndex175 < valueListLen175; valueIndex175++) {
    var valueData175 = valueList175[valueIndex175];
    output += '<dt><a class="enum member' + ((valueData175.deprecation) ? ' deprecation-notice' : '') + '" name="' + soy.$$escapeHtml(opt_data.name + '.' + valueData175.name) + '">' + soy.$$escapeHtml(valueData175.name) + '</a>' + ((valueData175.description && valueData175.description.token.length || valueData175.deprecation && valueData175.deprecation.notice && valueData175.deprecation.notice.token.length) ? '<dd>' + dossier.soy.deprecationNotice({deprecation: valueData175.deprecation}) + dossier.soy.comment({comment: valueData175.description, omitLeadingTag: true}) : '');
  }
  output += '</dl></div>';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.typedefs = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.typeDefs.length > 0) {
    output += '<section id="typedefs"><h2>Type Definitions</h2>';
    var typedefList199 = opt_data.typeDefs;
    var typedefListLen199 = typedefList199.length;
    for (var typedefIndex199 = 0; typedefIndex199 < typedefListLen199; typedefIndex199++) {
      var typedefData199 = typedefList199[typedefIndex199];
      output += '<div class="wrap-details';
      switch (typedefData199.visibility) {
        case 'PUBLIC':
          output += ' public';
          break;
        case 'PROTECTED':
          output += ' protected';
          break;
        case 'PRIVATE':
          output += ' private';
          break;
      }
      output += '"><div><details><summary><div><a class="source" href="' + soy.$$escapeHtml(typedefData199.href) + '">code &raquo;</a><a class="member' + ((typedefData199.deprecation) ? ' deprecation-notice' : '') + '" name="' + soy.$$escapeHtml(typedefData199.name) + '">' + soy.$$escapeHtml(typedefData199.name) + '</a> : <code class="type">' + soy.$$filterNoAutoescape(typedefData199.typeHtml) + '</code>' + dossier.soy.deprecationNotice({deprecation: typedefData199.deprecation}) + '</div><div>' + ((typedefData199.description && typedefData199.description.token.length) ? dossier.soy.comment({comment: typedefData199.description, omitLeadingTag: true}) : 'No description.') + '</div></summary></details></div></div>';
    }
    output += '</section>';
  }
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.nestedTypeSummaries = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.types.length > 0) {
    output += '<section><h2>' + soy.$$escapeHtml(opt_data.title) + '</h2><div class="type-summary"><table><tbody><tr><td><dl>';
    var typeList241 = opt_data.types;
    var typeListLen241 = typeList241.length;
    for (var typeIndex241 = 0; typeIndex241 < typeListLen241; typeIndex241++) {
      var typeData241 = typeList241[typeIndex241];
      output += '<dt><a href="' + soy.$$escapeHtml(typeData241.href) + '">' + soy.$$escapeHtml(typeData241.name) + '</a><dd>' + ((typeData241.summary && typeData241.summary.token.length) ? dossier.soy.comment({comment: typeData241.summary, omitLeadingTag: true}) : 'No Description.');
    }
    output += '</dl></table></div></section>';
  }
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.returnDetails = function(opt_data, opt_ignored) {
  return (opt_data.details && opt_data.details.description && opt_data.details.description.token.length) ? '<tr><th>Returns<tr><td><dl>' + dossier.soy.comment({comment: opt_data.details.description, omitLeadingTag: true}) + '</dl>' : '';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.typeDetails = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.details && opt_data.details.length > 0) {
    output += '<tr><th>' + soy.$$escapeHtml(opt_data.header) + '<tr><td><dl>';
    var detailList270 = opt_data.details;
    var detailListLen270 = detailList270.length;
    for (var detailIndex270 = 0; detailIndex270 < detailListLen270; detailIndex270++) {
      var detailData270 = detailList270[detailIndex270];
      output += '<dt>' + ((detailData270.name) ? soy.$$escapeHtml(detailData270.name) : '') + ((detailData270.typeHtml) ? ((detailData270.name) ? ': ' : '') + '<code class="type">' + soy.$$filterNoAutoescape(detailData270.typeHtml) + '</code>' : '') + ((detailData270.description && detailData270.description.token.length) ? '<dd>' + dossier.soy.comment({comment: detailData270.description, omitLeadingTag: true}) : '');
    }
    output += '</dl>';
  }
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.fnDetails = function(opt_data, opt_ignored) {
  return (opt_data.fn.parameter.length || opt_data.fn.thrown.length || opt_data.fn['return'] && opt_data.fn['return'].description && opt_data.fn['return'].description.token.length && ! opt_data.fn.isConstructor) ? '<div class="info"><table><tbody>' + dossier.soy.typeDetails({header: 'Parameters', details: opt_data.fn.parameter}) + ((! opt_data.fn.isConstructor) ? dossier.soy.returnDetails({details: opt_data.fn['return']}) : '') + dossier.soy.typeDetails({header: 'Throws', details: opt_data.fn.thrown}) + '</table></div>' : '';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.printTemplateNames = function(opt_data, opt_ignored) {
  var output = '<code class="type">&lt;';
  var nameList309 = opt_data.names;
  var nameListLen309 = nameList309.length;
  for (var nameIndex309 = 0; nameIndex309 < nameListLen309; nameIndex309++) {
    var nameData309 = nameList309[nameIndex309];
    output += soy.$$escapeHtml(nameData309) + ((! (nameIndex309 == nameListLen309 - 1)) ? ', ' : '');
  }
  output += '&gt;</code>';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.memberSignature = function(opt_data, opt_ignored) {
  var output = (! opt_data.member.isConstructor && opt_data.member.templateName && opt_data.member.templateName.length) ? dossier.soy.printTemplateNames({names: opt_data.member.templateName}) + ' ' : '';
  var name__soy322 = opt_data.parentName ? opt_data.parentName + '.' + opt_data.member.base.name : opt_data.member.base.name;
  output += '<span class="member' + ((opt_data.member.base.deprecation) ? ' deprecation-notice' : '') + '">' + ((! opt_data.member.isConstructor && ! opt_data.omitLink) ? '<a name="' + soy.$$escapeHtml(name__soy322) + '">' + soy.$$escapeHtml(name__soy322) + '</a>' : soy.$$escapeHtml(name__soy322));
  if (opt_data.member.parameter) {
    output += ' <span class="args">( ';
    var parameterList340 = opt_data.member.parameter;
    var parameterListLen340 = parameterList340.length;
    for (var parameterIndex340 = 0; parameterIndex340 < parameterListLen340; parameterIndex340++) {
      var parameterData340 = parameterList340[parameterIndex340];
      output += soy.$$escapeHtml(parameterData340.name) + ((! (parameterIndex340 == parameterListLen340 - 1)) ? ',' : '') + ' ';
    }
    output += ')</span>' + ((! opt_data.member.isConstructor && opt_data.member['return'] && opt_data.member['return'].typeHtml && opt_data.member['return'].typeHtml != 'undefined' && opt_data.member['return'].typeHtml != '?') ? ' &rArr; <code class="type">' + soy.$$filterNoAutoescape(opt_data.member['return'].typeHtml) + '</code>' : '');
  } else if (opt_data.member.typeHtml) {
    output += ' : <code class="type">' + soy.$$filterNoAutoescape(opt_data.member.typeHtml) + '</code>';
  }
  output += '</span>';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.mainFunction = function(opt_data, opt_ignored) {
  var output = '<h2>' + ((opt_data.fn.isConstructor) ? 'Constructor' : 'Main') + '</h2><div class="ctor wrap-details';
  switch (opt_data.fn.base.visibility) {
    case 'PUBLIC':
      output += ' public';
      break;
    case 'PROTECTED':
      output += ' protected';
      break;
    case 'PRIVATE':
      output += ' private';
      break;
  }
  output += '"><div><div class="ctor">' + dossier.soy.memberSignature({member: opt_data.fn, omitLink: true}) + '</div>' + dossier.soy.fnDetails(opt_data) + '</div></div>';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.printProperty = function(opt_data, opt_ignored) {
  var output = '';
  var isFunction__soy384 = opt_data.prop.parameter != null;
  output += '<div class="wrap-details';
  switch (opt_data.prop.base.visibility) {
    case 'PUBLIC':
      output += ' public';
      break;
    case 'PROTECTED':
      output += ' protected';
      break;
    case 'PRIVATE':
      output += ' private';
      break;
  }
  output += '"><div><details' + ((isFunction__soy384) ? ' class="function"' : '') + '><summary><div>' + dossier.soy.sourceLink({href: opt_data.prop.base.source}) + dossier.soy.memberSignature({member: opt_data.prop, parentName: opt_data.parentName}) + '</div>' + dossier.soy.deprecationNotice({deprecation: opt_data.prop.base.deprecation}) + dossier.soy.comment({comment: opt_data.prop.base.description}) + '</summary>' + ((isFunction__soy384) ? dossier.soy.fnDetails({fn: opt_data.prop}) : '') + '</details></div></div>';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.printProperties = function(opt_data, opt_ignored) {
  var output = '';
  var propertyList415 = opt_data.properties;
  var propertyListLen415 = propertyList415.length;
  for (var propertyIndex415 = 0; propertyIndex415 < propertyListLen415; propertyIndex415++) {
    var propertyData415 = propertyList415[propertyIndex415];
    output += dossier.soy.printProperty({prop: propertyData415, parentName: opt_data.parentName});
  }
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.prototype = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.type.hasInstanceMethods) {
    output += '<section id="instance-methods"><h2>Instance Methods</h2>';
    var protoList424 = opt_data.type.prototype;
    var protoListLen424 = protoList424.length;
    for (var protoIndex424 = 0; protoIndex424 < protoListLen424; protoIndex424++) {
      var protoData424 = protoList424[protoIndex424];
      output += (protoData424['function'].length) ? ((! (protoIndex424 == 0 && protoIndex424 == protoListLen424 - 1)) ? '<h3>Defined in <code class="type">' + ((protoData424.href) ? '<a href="' + soy.$$escapeHtml(protoData424.href) + '">' + soy.$$escapeHtml(protoData424.name) + '</a>' : soy.$$escapeHtml(protoData424.name)) + '</code></h3>' : '') + dossier.soy.printProperties({properties: protoData424['function']}) : '';
    }
    output += '</section>';
  }
  if (opt_data.type.hasInstanceProperties) {
    output += '<section id="instance-properties"><h2>Instance Properties</h2>';
    var protoList447 = opt_data.type.prototype;
    var protoListLen447 = protoList447.length;
    for (var protoIndex447 = 0; protoIndex447 < protoListLen447; protoIndex447++) {
      var protoData447 = protoList447[protoIndex447];
      output += (protoData447.property.length) ? ((! (protoIndex447 == 0 && protoIndex447 == protoListLen447 - 1)) ? '<h3>Defined in <code class="type">' + ((protoData447.href) ? '<a href="' + soy.$$escapeHtml(protoData447.href) + '">' + soy.$$escapeHtml(protoData447.name) + '</a>' : soy.$$escapeHtml(protoData447.name)) + '</code></h3>' : '') + dossier.soy.printProperties({properties: protoData447.property}) : '';
    }
    output += '</section>';
  }
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.static = function(opt_data, opt_ignored) {
  var output = '';
  var parentName__soy468 = opt_data.type.isModule ? '' : opt_data.type.name;
  output += ((opt_data.type.staticFunction.length) ? '<section id="static-functions"><h2>' + ((opt_data.type.mainFunction && opt_data.type.mainFunction.isConstructor) ? 'Static Functions' : (opt_data.type.isModule) ? 'Functions' : 'Global Functions') + '</h2>' + dossier.soy.printProperties({properties: opt_data.type.staticFunction, parentName: parentName__soy468}) + '</section>' : '') + ((opt_data.type.staticProperty.length) ? '<section id="static-properties"><h2>' + ((opt_data.type.mainFunction && opt_data.type.mainFunction.isConstructor) ? 'Static Properties' : (opt_data.type.isModule) ? 'Properties' : 'Global Properties') + '</h2>' + dossier.soy.printProperties({properties: opt_data.type.staticProperty, parentName: parentName__soy468}) + '</section>' : '') + ((opt_data.type.compilerConstant.length) ? '<section id="compiler-constants"><h2>Compiler Constants</h2>' + dossier.soy.printProperties({properties: opt_data.type.compilerConstant, parentName: parentName__soy468}) + '</section>' : '');
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.visibilityControls = function(opt_data, opt_ignored) {
  return '<div id="visibility-controls"><b>Show:</b><label for="show-public"><span><input type="checkbox" id="show-public" checked/></span>Public</label><label for="show-protected"><span><input type="checkbox" id="show-protected"/></span>Protected</label><label for="show-private"><span><input type="checkbox" id="show-private"/></span>Private</label></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.hiddenVisibility = function(opt_data, opt_ignored) {
  return '<div class="wrap-details inv ' + soy.$$escapeHtml(opt_data.visibility) + '"><div><details><summary><label for="show-' + soy.$$escapeHtml(opt_data.visibility) + '">Show ' + soy.$$escapeHtml(opt_data.count) + ' hidden item' + ((opt_data.count > 1) ? 's' : '') + '</label></summary></details></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.navlist = function(opt_data, opt_ignored) {
  var output = '';
  if (opt_data.types.length) {
    output += '<ul>';
    var typeList524 = opt_data.types;
    var typeListLen524 = typeList524.length;
    for (var typeIndex524 = 0; typeIndex524 < typeListLen524; typeIndex524++) {
      var typeData524 = typeList524[typeIndex524];
      output += ((! typeData524.isTypedef) ? '<li class="link"><a href="' + soy.$$escapeHtml(opt_data.basePath) + soy.$$escapeHtml(typeData524.href) + '">' + ((typeData524.isInterface) ? '<i>' + soy.$$escapeHtml(typeData524.name) + '</i>' : soy.$$escapeHtml(typeData524.name)) + '</a>' : '') + ((opt_data.includeSubTypes && typeData524.types && typeData524.types.length) ? dossier.soy.navlist({types: typeData524.types, basePath: opt_data.basePath, includeSubTypes: opt_data.includeSubTypes}) : '');
    }
    output += '</ul>';
  }
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.fileNavlist = function(opt_data, opt_ignored) {
  var output = '';
  var isDirectory__soy548 = opt_data.file.children.length > 0;
  output += (! opt_data.parent) ? '<ul>' : '';
  if (isDirectory__soy548) {
    output += (opt_data.file.name) ? '<li>' + soy.$$escapeHtml(opt_data.file.name) + '/<ul>' : '';
    var childList559 = opt_data.file.children;
    var childListLen559 = childList559.length;
    for (var childIndex559 = 0; childIndex559 < childListLen559; childIndex559++) {
      var childData559 = childList559[childIndex559];
      output += dossier.soy.fileNavlist({file: childData559, basePath: opt_data.basePath, parent: opt_data.file});
    }
    output += (opt_data.file.name) ? '</ul>' : '';
  } else if (opt_data.file.name) {
    output += '<li class="link"><a href="' + soy.$$escapeHtml(opt_data.basePath) + soy.$$escapeHtml(opt_data.file.href) + '">' + soy.$$escapeHtml(opt_data.file.name) + '</a>';
  }
  output += (! opt_data.parent) ? '</ul>' : '';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.typefile = function(opt_data, opt_ignored) {
  return dossier.soy.pageHeader({title: opt_data.spec.type.name, resources: opt_data.spec.resources}) + '<div id="main-wrapper">' + dossier.soy.sideNavToggle(null) + '<main>' + dossier.soy.typeHeader({type: opt_data.spec.type}) + '<section>' + dossier.soy.comment({comment: opt_data.spec.type.description}) + ((! opt_data.spec.type.isInterface && opt_data.spec.type.mainFunction) ? dossier.soy.mainFunction({fn: opt_data.spec.type.mainFunction}) : '') + ((opt_data.spec.type.enumeration) ? dossier.soy.enumValues({name: opt_data.spec.type.name, enumeration: opt_data.spec.type.enumeration}) : '') + '</section>' + dossier.soy.nestedTypeSummaries({title: 'Interfaces', types: opt_data.spec.type.nested.interfaces}) + dossier.soy.nestedTypeSummaries({title: 'Classes', types: opt_data.spec.type.nested.classes}) + dossier.soy.nestedTypeSummaries({title: 'Enumerations', types: opt_data.spec.type.nested.enums}) + dossier.soy.visibilityControls(null) + dossier.soy.typedefs({typeDefs: opt_data.spec.type.typeDef}) + dossier.soy.prototype({type: opt_data.spec.type}) + dossier.soy.static({type: opt_data.spec.type}) + '</main>' + dossier.soy.topNav(null) + dossier.soy.sideNav({licensePath: opt_data.spec.licensePath}) + '<div id="push-footer"></div></div>' + dossier.soy.footer({scripts: opt_data.spec.resources.script});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.indexFile = function(opt_data, opt_ignored) {
  return dossier.soy.pageHeader({title: 'Index', resources: opt_data.spec.resources}) + '<div id="main-wrapper"><main>' + ((opt_data.spec.readme && opt_data.spec.readme.token.length) ? dossier.soy.comment({comment: opt_data.spec.readme}) : '<section id="type-index"><h2>Namespaces / Types</h2><i>Loading</i></section><section id="module-index"><h2>Modules</h2><i>Loading</i></section><section id="file-index"><h2>Files</h2><i>Loading</i></section>') + '</main>' + dossier.soy.topNav(null) + dossier.soy.sideNav({licensePath: opt_data.spec.licensePath}) + '<div id="push-footer"></div></div>' + dossier.soy.footer({scripts: opt_data.spec.resources.script});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.licenseFile = function(opt_data, opt_ignored) {
  return dossier.soy.pageHeader({title: 'License', resources: opt_data.spec.resources}) + '<div id="main-wrapper">' + dossier.soy.sideNavToggle(null) + '<main><header><h1>License</h1></header><pre><table class="licensefile"><tbody><tr><td>' + soy.$$filterNoAutoescape(opt_data.spec.license.text) + '</table></pre></main>' + dossier.soy.topNav(null) + dossier.soy.sideNav({licensePath: '#'}) + '<div id="push-footer"></div></div>' + dossier.soy.footer({scripts: opt_data.spec.resources.script});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.srcfile = function(opt_data, opt_ignored) {
  var output = dossier.soy.pageHeader({title: opt_data.spec.file.baseName, resources: opt_data.spec.resources}) + '<div id="main-wrapper">' + dossier.soy.sideNavToggle(null) + '<main><header><h1>' + soy.$$escapeHtml(opt_data.spec.file.path) + '</h1></header><pre><table class="srcfile"><tbody>';
  var count__soy666 = 1;
  var lineList667 = opt_data.spec.file.lines;
  var lineListLen667 = lineList667.length;
  for (var lineIndex667 = 0; lineIndex667 < lineListLen667; lineIndex667++) {
    var lineData667 = lineList667[lineIndex667];
    output += '<tr><td><a name="l' + soy.$$escapeHtml(count__soy666) + '" href="#l' + soy.$$escapeHtml(count__soy666) + '">' + soy.$$escapeHtml(count__soy666) + '</a><td>' + soy.$$escapeHtml(lineData667);
    var count__soy676 = count__soy666 + 1;
  }
  output += '</table></pre></main>' + dossier.soy.topNav(null) + dossier.soy.sideNav({licensePath: opt_data.spec.licensePath}) + '<div id="push-footer"></div></div>' + dossier.soy.footer({scripts: opt_data.spec.resources.script});
  return output;
};
