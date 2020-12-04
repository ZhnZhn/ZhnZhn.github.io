"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var toLink = function toLink(href) {
  var protocol = (href || '').split('://')[0];
  return protocol === 'https' ? href : '';
};

var _default = toLink;
exports["default"] = _default;
//# sourceMappingURL=toLink.js.map