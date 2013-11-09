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
  var output = '<!DOCTYPE html><meta charset="UTF-8"><title>' + soy.$$escapeHtml(opt_data.title) + '</title>';
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
  return '<nav id="sidenav"><input type="checkbox" id="sidenav-types-ctrl" /><input type="checkbox" id="sidenav-files-ctrl" /><a id="sidenav-overview"><div><h4>Overview</h4></div></a><div id="sidenav-types"><label for="sidenav-types-ctrl"><h4>Types</h4></label><i>No data</i></div><div id="sidenav-files"><label for="sidenav-files-ctrl"><h4>Files</h4></label><i>No data</i></div>' + ((opt_data.hasLicense) ? '<a href="license.html"><div><h4>License</h4></div></a>' : '') + '</nav>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.footer = function(opt_data, opt_ignored) {
  var output = '<footer><a href="https://github.com/jleyba/js-dossier">Generated by dossier</a></footer>';
  var scriptList23 = opt_data.scripts;
  var scriptListLen23 = scriptList23.length;
  for (var scriptIndex23 = 0; scriptIndex23 < scriptListLen23; scriptIndex23++) {
    var scriptData23 = scriptList23[scriptIndex23];
    output += '<script src="' + soy.$$escapeHtml(scriptData23) + '"><\/script>';
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
    var tokenList34 = opt_data.comment.token;
    var tokenListLen34 = tokenList34.length;
    for (var tokenIndex34 = 0; tokenIndex34 < tokenListLen34; tokenIndex34++) {
      var tokenData34 = tokenList34[tokenIndex34];
      output += ((tokenData34.isCode) ? '<code ' + ((tokenData34.href || tokenData34.unresolvedLink) ? ' class="type"' : '') + '>' : '') + ((tokenData34.href) ? '<a href="' + soy.$$escapeHtml(tokenData34.href) + '">' : (tokenData34.unresolvedLink) ? '<a class="unresolved-link">' : '') + ((tokenData34.isCode || tokenData34.isLiteral) ? soy.$$escapeHtml(tokenData34.text) : soy.$$filterNoAutoescape(tokenData34.text)) + ((tokenData34.unresolvedLink || tokenData34.href) ? '</a>' : '') + ((tokenData34.isCode) ? '</code>' : '');
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
    var typeList72 = opt_data.types;
    var typeListLen72 = typeList72.length;
    for (var typeIndex72 = 0; typeIndex72 < typeListLen72; typeIndex72++) {
      var typeData72 = typeList72[typeIndex72];
      if (! (typeIndex72 == 0)) {
        output += '\n  ';
        if (typeIndex72 > 1) {
          var iLimit79 = typeIndex72 - 1;
          for (var i79 = 0; i79 < iLimit79; i79++) {
            output += '    ';
          }
        }
        output += '&#x2514; ';
      }
      output += (typeIndex72 == typeListLen72 - 1) ? soy.$$escapeHtml(typeData72.text) : '<a href="' + soy.$$escapeHtml(typeData72.href) + '">' + soy.$$escapeHtml(typeData72.text) + '</a>';
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
    var interfaceList103 = opt_data.type.implementedType;
    var interfaceListLen103 = interfaceList103.length;
    for (var interfaceIndex103 = 0; interfaceIndex103 < interfaceListLen103; interfaceIndex103++) {
      var interfaceData103 = interfaceList103[interfaceIndex103];
      output += '<code><a href="' + soy.$$escapeHtml(interfaceData103.href) + '">' + soy.$$escapeHtml(interfaceData103.text) + '</a></code>' + ((! (interfaceIndex103 == interfaceListLen103 - 1)) ? ', ' : '');
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
  return '<header><h1>' + ((opt_data.type.isInterface) ? 'Interface ' + soy.$$escapeHtml(opt_data.type.name) : (opt_data.type.constructor) ? 'Class ' + soy.$$escapeHtml(opt_data.type.name) : (opt_data.type.enumeration) ? 'Enum ' + soy.$$escapeHtml(opt_data.type.name) : 'Namespace ' + soy.$$escapeHtml(opt_data.type.name)) + ((opt_data.type.constructor && opt_data.type.constructor.templateName.length) ? '.' + dossier.soy.printTemplateNames({names: opt_data.type.constructor.templateName}) : '') + ((opt_data.type.deprecation) ? '<span class="deprecation-notice"> (deprecated)</span>' : '') + '</h1>' + dossier.soy.sourceLink({href: opt_data.type.source}) + ((opt_data.type.enumeration) ? '<dl><dt>Type: <code class="type">' + soy.$$filterNoAutoescape(opt_data.type.enumeration.typeHtml) + '</code></dl>' : '') + dossier.soy.classInheritance({types: opt_data.type.extendedType}) + dossier.soy.printInterfaces(opt_data) + dossier.soy.deprecationNotice({deprecation: opt_data.type.deprecation}) + '</header>';
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
  var valueList170 = opt_data.enumeration.value;
  var valueListLen170 = valueList170.length;
  for (var valueIndex170 = 0; valueIndex170 < valueListLen170; valueIndex170++) {
    var valueData170 = valueList170[valueIndex170];
    output += '<dt><a class="enum member' + ((valueData170.deprecation) ? ' deprecation-notice' : '') + '" name="' + soy.$$escapeHtml(opt_data.name + '.' + valueData170.name) + '">' + soy.$$escapeHtml(valueData170.name) + '</a>' + ((valueData170.description && valueData170.description.token.length || valueData170.deprecation && valueData170.deprecation.notice && valueData170.deprecation.notice.token.length) ? '<dd>' + dossier.soy.deprecationNotice({deprecation: valueData170.deprecation}) + dossier.soy.comment({comment: valueData170.description, omitLeadingTag: true}) : '');
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
    var typedefList194 = opt_data.typeDefs;
    var typedefListLen194 = typedefList194.length;
    for (var typedefIndex194 = 0; typedefIndex194 < typedefListLen194; typedefIndex194++) {
      var typedefData194 = typedefList194[typedefIndex194];
      output += '<div class="wrap-details';
      switch (typedefData194.visibility) {
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
      output += '"><div><details><summary><div><a class="source" href="' + soy.$$escapeHtml(typedefData194.href) + '">code &raquo;</a><a class="member' + ((typedefData194.deprecation) ? ' deprecation-notice' : '') + '" name="' + soy.$$escapeHtml(typedefData194.name) + '">' + soy.$$escapeHtml(typedefData194.name) + '</a> : <code class="type">' + soy.$$filterNoAutoescape(typedefData194.typeHtml) + '</code>' + dossier.soy.deprecationNotice({deprecation: typedefData194.deprecation}) + '</div><div>' + ((typedefData194.description && typedefData194.description.token.length) ? dossier.soy.comment({comment: typedefData194.description, omitLeadingTag: true}) : 'No description.') + '</div></summary></details></div></div>';
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
    var typeList236 = opt_data.types;
    var typeListLen236 = typeList236.length;
    for (var typeIndex236 = 0; typeIndex236 < typeListLen236; typeIndex236++) {
      var typeData236 = typeList236[typeIndex236];
      output += '<dt><a href="' + soy.$$escapeHtml(typeData236.href) + '">' + soy.$$escapeHtml(typeData236.name) + '</a><dd>' + ((typeData236.summary) ? soy.$$escapeHtml(typeData236.summary) : 'No Description.');
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
    var detailList263 = opt_data.details;
    var detailListLen263 = detailList263.length;
    for (var detailIndex263 = 0; detailIndex263 < detailListLen263; detailIndex263++) {
      var detailData263 = detailList263[detailIndex263];
      output += '<dt>' + ((detailData263.name) ? soy.$$escapeHtml(detailData263.name) : '') + ((detailData263.typeHtml) ? ((detailData263.name) ? ': ' : '') + '<code class="type">' + soy.$$filterNoAutoescape(detailData263.typeHtml) + '</code>' : '') + ((detailData263.description && detailData263.description.token.length) ? '<dd>' + dossier.soy.comment({comment: detailData263.description, omitLeadingTag: true}) : '');
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
  var nameList302 = opt_data.names;
  var nameListLen302 = nameList302.length;
  for (var nameIndex302 = 0; nameIndex302 < nameListLen302; nameIndex302++) {
    var nameData302 = nameList302[nameIndex302];
    output += soy.$$escapeHtml(nameData302) + ((! (nameIndex302 == nameListLen302 - 1)) ? ', ' : '');
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
  var name__soy315 = opt_data.parentName ? opt_data.parentName + '.' + opt_data.member.base.name : opt_data.member.base.name;
  output += '<span class="member' + ((opt_data.member.base.deprecation) ? ' deprecation-notice' : '') + '">' + ((! opt_data.member.isConstructor) ? '<a name="' + soy.$$escapeHtml(name__soy315) + '">' + soy.$$escapeHtml(name__soy315) + '</a>' : soy.$$escapeHtml(name__soy315));
  if (opt_data.member.parameter) {
    output += ' <span class="args">(';
    var parameterList333 = opt_data.member.parameter;
    var parameterListLen333 = parameterList333.length;
    for (var parameterIndex333 = 0; parameterIndex333 < parameterListLen333; parameterIndex333++) {
      var parameterData333 = parameterList333[parameterIndex333];
      output += soy.$$escapeHtml(parameterData333.name) + ((! (parameterIndex333 == parameterListLen333 - 1)) ? ', ' : '');
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
dossier.soy.ctor = function(opt_data, opt_ignored) {
  var output = '<h2>Constructor</h2><div class="ctor wrap-details';
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
  output += '"><div><div class="ctor">' + dossier.soy.memberSignature({member: opt_data.fn}) + '</div>' + dossier.soy.fnDetails(opt_data) + '</div></div>';
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
  var isFunction__soy369 = opt_data.prop.parameter != null;
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
  output += '"><div><details' + ((isFunction__soy369) ? ' class="function"' : '') + '><summary><div>' + dossier.soy.sourceLink({href: opt_data.prop.base.source}) + dossier.soy.memberSignature({member: opt_data.prop, parentName: opt_data.parentName}) + '</div>' + dossier.soy.deprecationNotice({deprecation: opt_data.prop.base.deprecation}) + dossier.soy.comment({comment: opt_data.prop.base.description}) + '</summary>' + ((isFunction__soy369) ? dossier.soy.fnDetails({fn: opt_data.prop}) : '') + '</details></div></div>';
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
  var propertyList400 = opt_data.properties;
  var propertyListLen400 = propertyList400.length;
  for (var propertyIndex400 = 0; propertyIndex400 < propertyListLen400; propertyIndex400++) {
    var propertyData400 = propertyList400[propertyIndex400];
    output += dossier.soy.printProperty({prop: propertyData400, parentName: opt_data.parentName});
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
    var protoList409 = opt_data.type.prototype;
    var protoListLen409 = protoList409.length;
    for (var protoIndex409 = 0; protoIndex409 < protoListLen409; protoIndex409++) {
      var protoData409 = protoList409[protoIndex409];
      output += (protoData409['function'].length) ? ((! (protoIndex409 == 0 && protoIndex409 == protoListLen409 - 1)) ? '<h3>Defined in <code class="type">' + ((protoData409.href) ? '<a href="' + soy.$$escapeHtml(protoData409.href) + '">' + soy.$$escapeHtml(protoData409.name) + '</a>' : soy.$$escapeHtml(protoData409.name)) + '</code></h3>' : '') + dossier.soy.printProperties({properties: protoData409['function']}) : '';
    }
    output += '</section>';
  }
  if (opt_data.type.hasInstanceProperties) {
    output += '<section id="instance-properties"><h2>Instance Properties</h2>';
    var protoList432 = opt_data.type.prototype;
    var protoListLen432 = protoList432.length;
    for (var protoIndex432 = 0; protoIndex432 < protoListLen432; protoIndex432++) {
      var protoData432 = protoList432[protoIndex432];
      output += (protoData432.property.length) ? ((! (protoIndex432 == 0 && protoIndex432 == protoListLen432 - 1)) ? '<h3>Defined in <code class="type">' + ((protoData432.href) ? '<a href="' + soy.$$escapeHtml(protoData432.href) + '">' + soy.$$escapeHtml(protoData432.name) + '</a>' : soy.$$escapeHtml(protoData432.name)) + '</code></h3>' : '') + dossier.soy.printProperties({properties: protoData432.property}) : '';
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
  return ((opt_data.type.staticFunction.length) ? '<section id="static-functions"><h2>' + ((opt_data.type.constructor) ? 'Static Functions' : 'Global Functions') + '</h2>' + dossier.soy.printProperties({properties: opt_data.type.staticFunction, parentName: opt_data.type.name}) + '</section>' : '') + ((opt_data.type.staticProperty.length) ? '<section id="static-properties"><h2>' + ((opt_data.type.constructor) ? 'Static Properties' : 'Global Properties') + '</h2>' + dossier.soy.printProperties({properties: opt_data.type.staticProperty, parentName: opt_data.type.name}) + '</section>' : '') + ((opt_data.type.compilerConstant.length) ? '<section id="compiler-constants"><h2>Compiler Constants</h2>' + dossier.soy.printProperties({properties: opt_data.type.compilerConstant, parentName: opt_data.type.name}) + '</section>' : '');
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
    var typeList504 = opt_data.types;
    var typeListLen504 = typeList504.length;
    for (var typeIndex504 = 0; typeIndex504 < typeListLen504; typeIndex504++) {
      var typeData504 = typeList504[typeIndex504];
      output += (! typeData504.isTypedef) ? '<li class="link"><a href="' + soy.$$escapeHtml(opt_data.basePath) + soy.$$escapeHtml(typeData504.href) + '">' + ((typeData504.isInterface) ? '<i>' + soy.$$escapeHtml(typeData504.name) + '</i>' : soy.$$escapeHtml(typeData504.name)) + '</a>' : '';
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
  var isDirectory__soy522 = opt_data.file.children.length > 0;
  output += (! opt_data.parent) ? '<ul>' : '';
  if (isDirectory__soy522) {
    output += (opt_data.file.name) ? '<li>' + soy.$$escapeHtml(opt_data.file.name) + '/<ul>' : '';
    var childList533 = opt_data.file.children;
    var childListLen533 = childList533.length;
    for (var childIndex533 = 0; childIndex533 < childListLen533; childIndex533++) {
      var childData533 = childList533[childIndex533];
      output += dossier.soy.fileNavlist({file: childData533, basePath: opt_data.basePath, parent: opt_data.file});
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
dossier.soy.namespaceNavlist = function(opt_data, opt_ignored) {
  var output = (opt_data.ns.name) ? '<li ' + ((opt_data.ns.href) ? 'class="link"' : '') + '>' + ((opt_data.ns.href) ? '<a href="' + soy.$$escapeHtml(opt_data.basePath) + soy.$$escapeHtml(opt_data.ns.href) + '">' : '') + ((opt_data.ns.isInterface) ? '<i>' + soy.$$escapeHtml(opt_data.ns.name) + '</i>' : soy.$$escapeHtml(opt_data.ns.name)) + ((opt_data.ns.href) ? '</a>' : '') : '';
  if (opt_data.ns.children.length) {
    output += '<ul>';
    var childList579 = opt_data.ns.children;
    var childListLen579 = childList579.length;
    for (var childIndex579 = 0; childIndex579 < childListLen579; childIndex579++) {
      var childData579 = childList579[childIndex579];
      output += dossier.soy.namespaceNavlist({ns: childData579, basePath: opt_data.basePath});
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
dossier.soy.typefile = function(opt_data, opt_ignored) {
  return dossier.soy.pageHeader({title: opt_data.spec.type.name, resources: opt_data.spec.resources}) + '<div id="main-wrapper">' + dossier.soy.sideNavToggle(null) + '<main>' + dossier.soy.typeHeader({type: opt_data.spec.type}) + '<section>' + dossier.soy.comment({comment: opt_data.spec.type.description}) + ((opt_data.spec.type.constructor && ! opt_data.spec.type.isInterface) ? dossier.soy.ctor({fn: opt_data.spec.type.constructor}) : '') + ((opt_data.spec.type.enumeration) ? dossier.soy.enumValues({name: opt_data.spec.type.name, enumeration: opt_data.spec.type.enumeration}) : '') + '</section>' + dossier.soy.nestedTypeSummaries({title: 'Interfaces', types: opt_data.spec.type.nested.interfaces}) + dossier.soy.nestedTypeSummaries({title: 'Classes', types: opt_data.spec.type.nested.classes}) + dossier.soy.nestedTypeSummaries({title: 'Enumerations', types: opt_data.spec.type.nested.enums}) + dossier.soy.visibilityControls(null) + dossier.soy.typedefs({typeDefs: opt_data.spec.type.typeDef}) + dossier.soy.prototype({type: opt_data.spec.type}) + dossier.soy.static({type: opt_data.spec.type}) + '</main>' + dossier.soy.topNav(null) + dossier.soy.sideNav({hasLicense: opt_data.spec.hasLicense}) + '<div id="push-footer"></div></div>' + dossier.soy.footer({scripts: opt_data.spec.resources.script});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.indexFile = function(opt_data, opt_ignored) {
  return dossier.soy.pageHeader({title: 'Index', resources: opt_data.spec.resources}) + '<div id="main-wrapper"><main>' + ((opt_data.spec.readme && opt_data.spec.readme.token.length) ? dossier.soy.comment({comment: opt_data.spec.readme}) : '<section id="type-index"><h2>Namespaces / Types</h2><i>No data</i></section><section id="file-index"><h2>Files</h2><i>No data</i></section>') + '</main>' + dossier.soy.topNav(null) + dossier.soy.sideNav({hasLicense: opt_data.spec.hasLicense}) + '<div id="push-footer"></div></div>' + dossier.soy.footer({scripts: opt_data.spec.resources.script});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.licenseFile = function(opt_data, opt_ignored) {
  return dossier.soy.pageHeader({title: 'License', resources: opt_data.spec.resources}) + '<div id="main-wrapper">' + dossier.soy.sideNavToggle(null) + '<main><header><h1>License</h1></header><pre><table class="licensefile"><tbody><tr><td>' + soy.$$filterNoAutoescape(opt_data.spec.license.text) + '</table></pre></main>' + dossier.soy.topNav(null) + dossier.soy.sideNav({hasLicense: true}) + '<div id="push-footer"></div></div>' + dossier.soy.footer({scripts: opt_data.spec.resources.script});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
dossier.soy.srcfile = function(opt_data, opt_ignored) {
  var output = dossier.soy.pageHeader({title: opt_data.spec.file.baseName, resources: opt_data.spec.resources}) + '<div id="main-wrapper">' + dossier.soy.sideNavToggle(null) + '<main><header><h1>' + soy.$$escapeHtml(opt_data.spec.file.path) + '</h1></header><pre><table class="srcfile"><tbody>';
  var count__soy673 = 1;
  var lineList674 = opt_data.spec.file.lines;
  var lineListLen674 = lineList674.length;
  for (var lineIndex674 = 0; lineIndex674 < lineListLen674; lineIndex674++) {
    var lineData674 = lineList674[lineIndex674];
    output += '<tr><td><a name="l' + soy.$$escapeHtml(count__soy673) + '" href="#l' + soy.$$escapeHtml(count__soy673) + '">' + soy.$$escapeHtml(count__soy673) + '</a><td>' + soy.$$escapeHtml(lineData674);
    var count__soy683 = count__soy673 + 1;
  }
  output += '</table></pre></main>' + dossier.soy.topNav(null) + dossier.soy.sideNav({hasLicense: opt_data.spec.hasLicense}) + '<div id="push-footer"></div></div>' + dossier.soy.footer({scripts: opt_data.spec.resources.script});
  return output;
};
