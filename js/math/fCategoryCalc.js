"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _crHm = function _crHm(data) {
  var hm = {};
  data.forEach(function (point) {
    hm[point.category] = point;
  });
  return hm;
};

var fCategoryRate = function fCategoryRate(calc) {
  return function (d1, d2, _ref) {
    var rc = _ref.rc,
        sc = _ref.sc;

    var hmD2 = _crHm(d2);

    return d1.map(function (p1) {
      var category = p1.category,
          color = p1.color,
          status = p1.status,
          value = calc(p1, hmD2[category]);
      return {
        y: value,
        id: category,
        c: category,
        color: color === sc ? rc : color,
        status: status
      };
    });
  };
};

var _default = fCategoryRate;
exports["default"] = _default;
//# sourceMappingURL=fCategoryCalc.js.map