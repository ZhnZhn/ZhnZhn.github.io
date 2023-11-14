"use strict";

exports.__esModule = true;
exports.crWidthStyle = exports.NO_RESULT = void 0;
var _uiApi = require("../uiApi");
const NO_RESULT = exports.NO_RESULT = 'noresult';
const crWidthStyle = (width, style) => width ? {
  ...style,
  width: width + ((0, _uiApi.isTokenInStr)('' + width, '%') ? '' : 'px')
} : null;
exports.crWidthStyle = crWidthStyle;
//# sourceMappingURL=InputSelectFn.js.map