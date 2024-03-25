"use strict";

exports.__esModule = true;
exports.isUndef = exports.isTypeNumber = exports.isStr = exports.isObj = exports.isNumber = exports.isNotEmptyArr = exports.isNaN = exports.isInt = exports.isFn = exports.isBool = exports.isArr = void 0;
const _fIsTypeof = strType => v => typeof v === strType;
const isTypeNumber = exports.isTypeNumber = _fIsTypeof("number");
const isNumber = v => isTypeNumber(v) && v - v === 0;
exports.isNumber = isNumber;
const isNaN = exports.isNaN = Number.isNaN;
const isInt = exports.isInt = Number.isInteger;
const isBool = exports.isBool = _fIsTypeof("boolean");
const isStr = exports.isStr = _fIsTypeof("string");
const isUndef = exports.isUndef = _fIsTypeof("undefined");
const isFn = exports.isFn = _fIsTypeof("function");
const isObj = v => typeof v === 'object' && v !== null;
exports.isObj = isObj;
const isArr = exports.isArr = Array.isArray;
const isNotEmptyArr = arr => isArr(arr) && arr.length > 0;
exports.isNotEmptyArr = isNotEmptyArr;
//# sourceMappingURL=isTypeFn.js.map