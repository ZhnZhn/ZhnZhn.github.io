"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ArrayUtil = {
  findIndexByProp: function findIndexByProp(propItem, arr, value) {
    return arr.findIndex(function (item, index) {
      return item[propItem] === value;
    });
  },
  checkSameByProp: function checkSameByProp(propItem, arr, value) {
    var index = arr ? arr.findIndex(function (item, i) {
      return item[propItem] === value;
    }) : -1;
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }
};

exports.default = ArrayUtil;
//# sourceMappingURL=ArrayUtil.js.map