"use strict";

exports.__esModule = true;
exports.factoryOpCompareBy = exports.factoryCompareBy = void 0;
const _isNaN = Number.isNaN;

const _compareMaybeNaN = (v1, v2) => {
  if (_isNaN(v1)) {
    return _isNaN(v2) ? 0 : 1;
  }

  return _isNaN(v2) ? -1 : 2;
};

const _compareNumber = (v1, v2) => {
  const _r = _compareMaybeNaN(v1, v2);

  if (_r !== 2) return _r;
  if (v1 < v2) return 1;
  if (v1 > v2) return -1;
  return 0;
};

const _compareStr = (v1, v2) => {
  if (v1 < v2) return 1;
  if (v1 > v2) return -1;
  return 0;
};

const factoryCompareBy = (TOKEN_NAN, pn) => (a, b) => {
  const v1 = a[pn],
        v2 = b[pn];
  return typeof v1 === 'number' || v1 === TOKEN_NAN ? _compareNumber(v1, v2) : _compareStr(v1, v2);
};

exports.factoryCompareBy = factoryCompareBy;

const factoryOpCompareBy = (pn, fn) => (a, b) => {
  const _r = _compareMaybeNaN(a[pn], b[pn]);

  if (_r !== 2) return _r;
  return fn(b, a);
};

exports.factoryOpCompareBy = factoryOpCompareBy;
//# sourceMappingURL=compareFactory.js.map