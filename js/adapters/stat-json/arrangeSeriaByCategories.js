"use strict";

exports.__esModule = true;
exports.default = void 0;

const _addToHm = (hm, p) => (hm[p.c] = p, hm);

const arrangeSeriaByCategories = (series, categories) => {
  const _hmPoints = series.data.reduce(_addToHm, {});

  series.data = categories.map(category => _hmPoints[category] || null);
  return series;
};

var _default = arrangeSeriaByCategories;
exports.default = _default;
//# sourceMappingURL=arrangeSeriaByCategories.js.map