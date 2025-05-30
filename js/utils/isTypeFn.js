"use strict";

exports.__esModule = true;
exports.parseIntBy10 = exports.isUndef = exports.isTypeNumber = exports.isStrOrNumber = exports.isStrNotBlank = exports.isStr = exports.isPositiveNumber = exports.isObj = exports.isNumber = exports.isNotEmptyArr = exports.isNaN = exports.isInt = exports.isFn = exports.isBool = exports.isArr = exports.getObjectKeys = void 0;
const _fIsTypeof = strType => v => typeof v === strType;
const isTypeNumber = exports.isTypeNumber = _fIsTypeof("number");
const isNumber = v => isTypeNumber(v) && v - v === 0;
exports.isNumber = isNumber;
const isPositiveNumber = v => isNumber(v) && v > 0;
exports.isPositiveNumber = isPositiveNumber;
const isNaN = exports.isNaN = Number.isNaN;
const isInt = exports.isInt = Number.isInteger;
const isBool = exports.isBool = _fIsTypeof("boolean");
const isStr = exports.isStr = _fIsTypeof("string");
const isUndef = exports.isUndef = _fIsTypeof("undefined");
const isFn = exports.isFn = _fIsTypeof("function");
const isStrNotBlank = v => isStr(v) && !!v.trim();
exports.isStrNotBlank = isStrNotBlank;
const isStrOrNumber = v => v !== "" && (isStr(v) || isNumber(v));
exports.isStrOrNumber = isStrOrNumber;
const isObj = v => typeof v === "object" && v !== null;
exports.isObj = isObj;
const isArr = exports.isArr = Array.isArray;
const isNotEmptyArr = arr => isArr(arr) && arr.length > 0;
exports.isNotEmptyArr = isNotEmptyArr;
const _getObjectKeys = Object.keys;
const getObjectKeys = value => isObj(value) && !isArr(value) ? _getObjectKeys(value) : [];
exports.getObjectKeys = getObjectKeys;
const parseIntBy10 = str => parseInt(str, 10);
exports.parseIntBy10 = parseIntBy10;
//# sourceMappingURL=isTypeFn.js.map