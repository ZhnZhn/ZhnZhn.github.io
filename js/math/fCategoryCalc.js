"use strict";

exports.__esModule = true;
exports.default = void 0;
const _isArr = Array.isArray;

const _crHm = data => {
  const hm = Object.create(null),
        _cPropName = (data[0] || {}).c ? 'c' : 'category';

  data.forEach(point => {
    hm[point[_cPropName]] = point;
  });
  return hm;
};

const fCategoryCalc = calc => (d1, d2, {
  rc,
  sc
}) => {
  if (!_isArr(d1) || !_isArr(d2)) {
    return [];
  }

  const _hmD2 = _crHm(d2);

  return d1.map(p1 => {
    const {
      category,
      color,
      status
    } = p1;
    return {
      y: calc(p1, _hmD2[category]),
      id: category,
      c: category,
      color: color === sc ? rc : color,
      status
    };
  });
};

var _default = fCategoryCalc;
exports.default = _default;
//# sourceMappingURL=fCategoryCalc.js.map