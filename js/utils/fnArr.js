"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _isInArrStr = _interopRequireDefault(require("./isInArrStr"));

var _isArr = Array.isArray,
    _fIsItem = function _fIsItem(propName, propValue) {
  return function (item) {
    return item[propName] === propValue;
  };
},
    _findArrIndexBy = function _findArrIndexBy(arr, propName, propValue) {
  return arr.findIndex(_fIsItem(propName, propValue));
};

var fnArr = {
  isInArrStr: _isInArrStr["default"],
  findIndexByProp: function findIndexByProp(propName) {
    return function (arr, propValue) {
      return _isArr(arr) ? _findArrIndexBy(arr, propName, propValue) : -1;
    };
  },
  isSameByProp: function isSameByProp(propName) {
    return function (arr, propValue) {
      return _isArr(arr) ? _findArrIndexBy(arr, propName, propValue) === -1 ? false : true : false;
    };
  }
};
var _default = fnArr;
exports["default"] = _default;
//# sourceMappingURL=fnArr.js.map