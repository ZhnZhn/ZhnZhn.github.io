"use strict";

exports.__esModule = true;
exports.joinByDot = exports.joinByBlank = exports.joinBy = exports.isInArrStr = exports.arrFactoryIsSameByProp = exports.arrFactoryFindIndexByProp = void 0;
var _bindTo = require("./bindTo");
const _isArr = Array.isArray,
  _fIsItem = (propName, propValue) => item => item[propName] === propValue,
  _findArrIndexBy = (arr, propName, propValue) => arr.findIndex(_fIsItem(propName, propValue));
const isInArrStr = arr => str => _isArr(arr) ? arr.indexOf(str) !== -1 : false;
exports.isInArrStr = isInArrStr;
const arrFactoryIsSameByProp = propName => (arr, propValue) => _isArr(arr) ? _findArrIndexBy(arr, propName, propValue) !== -1 : false;
exports.arrFactoryIsSameByProp = arrFactoryIsSameByProp;
const arrFactoryFindIndexByProp = propName => (arr, propValue) => _isArr(arr) ? _findArrIndexBy(arr, propName, propValue) : -1;
exports.arrFactoryFindIndexByProp = arrFactoryFindIndexByProp;
const joinBy = function (delimeter) {
  for (var _len = arguments.length, restItems = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    restItems[_key - 1] = arguments[_key];
  }
  return restItems.filter(Boolean).join(delimeter);
};
exports.joinBy = joinBy;
const joinByBlank = exports.joinByBlank = (0, _bindTo.bindTo)(joinBy, " ");
const joinByDot = exports.joinByDot = (0, _bindTo.bindTo)(joinBy, ".");
//# sourceMappingURL=arrFn.js.map