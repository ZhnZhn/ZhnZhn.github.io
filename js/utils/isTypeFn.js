"use strict";

exports.__esModule = true;
exports.isUndef = exports.isTypeNumber = exports.isStr = exports.isObj = exports.isNumber = exports.isNotEmptyArr = exports.isNaN = exports.isInt = void 0;
const isTypeNumber = n => typeof n === 'number';
exports.isTypeNumber = isTypeNumber;
const isNumber = n => isTypeNumber(n) && n - n === 0;
exports.isNumber = isNumber;
const isNaN = Number.isNaN;
exports.isNaN = isNaN;
const isInt = Number.isInteger;
exports.isInt = isInt;
const isStr = str => typeof str === 'string';
exports.isStr = isStr;
const isUndef = v => typeof v === 'undefined';
exports.isUndef = isUndef;
const isObj = obj => typeof obj === 'object' && !!obj;
exports.isObj = isObj;
const _isArr = Array.isArray;
const isNotEmptyArr = arr => _isArr(arr) && arr.length > 0;
exports.isNotEmptyArr = isNotEmptyArr;
//# sourceMappingURL=isTypeFn.js.map