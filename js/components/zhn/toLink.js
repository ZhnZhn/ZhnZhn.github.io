"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var toLink = function toLink(href, isHttp) {
  var protocol = (href || '').split('://')[0];
  return protocol === 'https' || isHttp && protocol === 'http' ? href : void 0;
};

var _default = toLink;
exports["default"] = _default;
//# sourceMappingURL=toLink.js.map