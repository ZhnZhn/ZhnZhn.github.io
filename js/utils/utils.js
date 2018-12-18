"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isValueInObject = exports.isValueInObject = function isValueInObject(value, obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop] === value) {
      return true;
    }
  }
  return false;
};

var isValueInPlainObject = exports.isValueInPlainObject = function isValueInPlainObject(value, obj) {
  for (var prop in obj) {
    if (obj[prop] === value) {
      return true;
    }
  }
  return false;
};
//# sourceMappingURL=utils.js.map