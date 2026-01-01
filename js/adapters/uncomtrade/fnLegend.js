"use strict";

exports.__esModule = true;
exports.toWorldLegend = exports.toAllLegend = void 0;
var _mathFn = require("../../math/mathFn");
var _conf = require("./conf");
const _fItemWithRatio = (hm, sum) => item => {
  const {
      name
    } = item,
    _points = hm[name],
    _p = _points[_points.length - 1],
    _ratio = _p ? (0, _mathFn.roundBy)(_p.y / sum * 100, 1) + '%' : '';
  return {
    ...item,
    name: _ratio + ' ' + name
  };
};
const _hasNotToken = (str, token) => str.indexOf(token) === -1;
const _calcRecentSum = hm => {
  let key,
    sum = 0;
  for (key in hm) {
    if (_hasNotToken(key, ', nes') && _hasNotToken(key, _conf.WORLD)) {
      const points = hm[key];
      sum += points[points.length - 1].y;
    }
  }
  return sum;
};
const toAllLegend = (arr, hm, measure) => {
  const sum = _calcRecentSum(hm),
    crItemWithRatio = _fItemWithRatio(hm, sum);
  return sum !== 0 && measure !== _conf.AVG_PER_W && measure !== _conf.AVG_PER_Q ? arr.map(crItemWithRatio) : arr;
};
exports.toAllLegend = toAllLegend;
const toWorldLegend = (arr, hm) => {
  const world = hm[_conf.WORLD],
    sum = world ? world[world.length - 1].y : _calcRecentSum(hm),
    crItemWithRatio = _fItemWithRatio(hm, sum);
  return sum !== 0 && sum != null ? arr.map(crItemWithRatio) : arr;
};
exports.toWorldLegend = toWorldLegend;
//# sourceMappingURL=fnLegend.js.map