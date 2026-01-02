"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.merge = exports.getFnByPropName = exports.getByPropsFrom = void 0;
var _highcharts = _interopRequireDefault(require("highcharts"));
var _isTypeFn = require("./isTypeFn");
const merge = exports.merge = _highcharts.default.merge;
const getByPropsFrom = function (obj) {
  for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }
  return (props || []).reduce((nextObj, propName) => (nextObj || ((0, _isTypeFn.isStr)(propName) ? {} : []))[propName], obj);
};
exports.getByPropsFrom = getByPropsFrom;
const getFnByPropName = (obj, propName, dfValue) => !obj || !(0, _isTypeFn.isFn)(obj[propName]) ? () => dfValue : obj[propName];
exports.getFnByPropName = getFnByPropName;
//# sourceMappingURL=objFn.js.map