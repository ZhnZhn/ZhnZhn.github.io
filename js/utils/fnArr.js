"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fnArr = {

  findIndexByProp: function findIndexByProp(propName) {
    return function (arr, propValue) {
      if (!Array.isArray(arr)) {
        return -1;
      }

      return arr.findIndex(function (item) {
        return item[propName] === propValue;
      });
    };
  },

  isSameByProp: function isSameByProp(propName) {
    return function (arr, propValue) {
      if (!Array.isArray(arr)) {
        return false;
      }

      return arr.findIndex(function (item) {
        return item[propName] === propValue;
      }) === -1 ? false : true;
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

exports.default = fnArr;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\fnArr.js.map