"use strict";

exports.__esModule = true;
exports.isUndef = exports.isTypeNumber = exports.isStr = exports.isObj = exports.isNumber = exports.isNotEmptyArr = exports.isNaN = exports.isInt = exports.isFn = exports.isArr = void 0;
const isTypeNumber = v => typeof v === 'number';
exports.isTypeNumber = isTypeNumber;
const isNumber = v => isTypeNumber(v) && v - v === 0;
exports.isNumber = isNumber;
const isNaN = exports.isNaN = Number.isNaN;
const isInt = exports.isInt = Number.isInteger;
const isStr = v => typeof v === 'string';
exports.isStr = isStr;
const isUndef = v => typeof v === 'undefined';
exports.isUndef = isUndef;
const isFn = v => typeof v === 'function';
exports.isFn = isFn;
const isObj = v => typeof v === 'object' && v !== null;
exports.isObj = isObj;
const isArr = exports.isArr = Array.isArray;
const isNotEmptyArr = arr => isArr(arr) && arr.length > 0;
exports.isNotEmptyArr = isNotEmptyArr;
//# sourceMappingURL=isTypeFn.js.map