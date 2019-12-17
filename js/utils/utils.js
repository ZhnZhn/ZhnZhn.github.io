"use strict";

exports.__esModule = true;
exports.isValueInPlainObject = exports.isValueInObject = void 0;

var isValueInObject = function isValueInObject(value, obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop] === value) {
      return true;
    }
  }

  return false;
};

exports.isValueInObject = isValueInObject;

var isValueInPlainObject = function isValueInPlainObject(value, obj) {
  for (var prop in obj) {
    if (obj[prop] === value) {
      return true;
    }
  }

  return false;
};

exports.isValueInPlainObject = isValueInPlainObject;
//# sourceMappingURL=utils.js.map