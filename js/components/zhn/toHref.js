"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var toHref = function toHref(href) {
  var protocol = (href || '').split('://')[0];
  return protocol === 'https' ? href : '';
};

var _default = toHref;
exports["default"] = _default;
//# sourceMappingURL=toHref.js.map