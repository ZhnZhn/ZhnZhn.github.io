"use strict";

exports.__esModule = true;
exports.pointwise = void 0;
const pointwise = function (mathOperation) {
  for (var _len2 = arguments.length, serieses = new Array(_len2 > 1 ? _len2 - 1 : 0), _key = 1; _key < _len2; _key++) {
    serieses[_key - 1] = arguments[_key];
  }
  let result = [],
    _getSeriesValuesByIndex = i => serieses.map(seria => seria[i]),
    _len = serieses[0].length,
    i;
  for (i = 0; i < _len; i++) {
    result.push(mathOperation(..._getSeriesValuesByIndex(i)));
  }
  return result;
};
exports.pointwise = pointwise;
//# sourceMappingURL=pointwise.js.map