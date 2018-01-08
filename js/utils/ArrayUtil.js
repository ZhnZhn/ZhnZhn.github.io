"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ArrayUtil = {

  findIndexByProp: function findIndexByProp(propName) {
    return function (arr, propValue) {
      if (!Array.isArray(arr)) {
        return -1;
      }

      return arr.findIndex(function (item, index) {
        return item[propName] === propValue;
      });
    };
  },

  isSameByProp: function isSameByProp(propName) {
    return function (arr, propValue) {
      if (!Array.isArray(arr)) {
        return false;
      }

      var index = arr.findIndex(function (item, i) {
        return item[propName] === propValue;
      });

      return index === -1 ? false : true;
    };
  },

  isStrInArr: function isStrInArr(str) {
    return function (arr) {
      if (!Array.isArray(arr)) {
        return false;
      }
      var i = void 0,
          len = arr.length;
      for (i = 0; i < len; i++) {
        if (str === arr[i]) {
          return true;
        }
      }
      return false;
    };
  }
};

exports.default = ArrayUtil;
//# sourceMappingURL=ArrayUtil.js.map