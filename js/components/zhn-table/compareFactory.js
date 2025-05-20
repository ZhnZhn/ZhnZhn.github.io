"use strict";

exports.__esModule = true;
exports.fNegate = exports.fCompareDescBy = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
const fNegate = fn => function () {
  return -1 * fn(...arguments);
};
exports.fNegate = fNegate;
const _compareDescValue = (v1, v2) => v1 < v2 ? 1 : v1 > v2 ? -1 : 0;
const _compareDescMaybeNumber = (v1, v2, _isNumber1, _isNumber2) => _isNumber1 && _isNumber2 ? _compareDescValue(v1, v2) : !_isNumber1 && !_isNumber2 ? 0 : _isNumber1 ? -1 : 1;
const fCompareDescBy = (TOKEN_NAN, pn) => (a, b) => {
  const v1 = a[pn],
    v2 = b[pn],
    _isNumber1 = (0, _isTypeFn.isNumber)(v1);
  return _isNumber1 || v1 === TOKEN_NAN || v1 === null ? _compareDescMaybeNumber(v1, v2, _isNumber1, (0, _isTypeFn.isNumber)(v2)) : _compareDescValue(v1, v2);
};
exports.fCompareDescBy = fCompareDescBy;
//# sourceMappingURL=compareFactory.js.map