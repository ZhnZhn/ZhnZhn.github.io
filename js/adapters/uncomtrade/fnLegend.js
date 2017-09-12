'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _conf = require('./conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnLegend = {

  fItemWithRatio: function fItemWithRatio(hm, sum) {
    return function (item) {
      var name = item.name,
          _points = hm[name],
          _p = _points[_points.length - 1],
          _ratio = _p ? ' ' + (_p.y / sum * 100).toFixed(1) + '%' : '';

      return (0, _extends3.default)({}, item, {
        name: name + _ratio
      });
    };
  },

  calcRecentSum: function calcRecentSum(hm) {
    var key = void 0,
        sum = 0;
    for (key in hm) {
      if (key.indexOf(', nes') === -1 && key.indexOf(_conf2.default.WORLD) === -1) {
        var points = hm[key];
        sum += points[points.length - 1].y;
      }
    }
    return sum;
  },

  toAllLegend: function toAllLegend(arr, hm, measure) {
    var sum = fnLegend.calcRecentSum(hm),
        crItemWithRatio = fnLegend.fItemWithRatio(hm, sum);
    return sum !== 0 && measure !== _conf2.default.AVG_PRICE ? arr.map(crItemWithRatio) : arr;
  },

  toWorldLegend: function toWorldLegend(arr, hm) {
    var world = hm[_conf2.default.WORLD],
        sum = world ? world[world.length - 1].y : fnLegend.calcRecentSum(hm),
        crItemWithRatio = fnLegend.fItemWithRatio(hm, sum);

    return sum !== 0 && sum != null ? arr.map(crItemWithRatio) : arr;
  }
};

exports.default = fnLegend;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\uncomtrade\fnLegend.js.map