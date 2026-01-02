"use strict";

exports.__esModule = true;
exports.getByPropsFrom = void 0;
var _isTypeFn = require("./isTypeFn");
const getByPropsFrom = function (obj) {
  for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }
  return (props || []).reduce((nextObj, propName) => (nextObj || ((0, _isTypeFn.isStr)(propName) ? {} : []))[propName], obj);
};
exports.getByPropsFrom = getByPropsFrom;
//# sourceMappingURL=objFn.js.map