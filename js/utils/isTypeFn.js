"use strict";

exports.__esModule = true;
exports.isUndef = exports.isTypeNumber = exports.isStr = exports.isNaN = exports.isInt = void 0;
const isTypeNumber = n => typeof n === 'number';
exports.isTypeNumber = isTypeNumber;
const isNaN = Number.isNaN;
exports.isNaN = isNaN;
const isInt = Number.isInteger;
exports.isInt = isInt;
const isStr = str => typeof str === 'string';
exports.isStr = isStr;
const isUndef = v => typeof v === 'undefined';
exports.isUndef = isUndef;
//# sourceMappingURL=isTypeFn.js.map