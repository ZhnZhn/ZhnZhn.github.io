"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _findPointById = function _findPointById(data, category) {
  for (var i = 0; i < data.length; i++) {
    var p = data[i];

    if (p.category === category) {
      return p;
    }
  }
};

var fCategoryRate = function fCategoryRate(calc) {
  return function (d1, d2, _ref) {
    var rc = _ref.rc,
        sc = _ref.sc;
    var dRate = [];

    for (var i = 0; i < d1.length; i++) {
      var p1 = d1[i],
          category = p1.category,
          color = p1.color,
          status = p1.status,
          p2 = _findPointById(d2, category),
          value = calc(p1, p2);

      dRate.push({
        y: value,
        id: category,
        c: category,
        color: color === sc ? rc : color,
        status: status
      });
    }

    return dRate;
  };
};

var _default = fCategoryRate;
exports["default"] = _default;
//# sourceMappingURL=fCategoryCalc.js.map