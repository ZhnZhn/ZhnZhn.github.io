'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _conf = require('./conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnHm = {

  crAvgPricePoint: function crAvgPricePoint(item) {
    var TradeValue = item.TradeValue,
        NetWeight = item.NetWeight,
        _y = NetWeight && TradeValue != null ? parseFloat((TradeValue / NetWeight).toFixed(2)) : undefined;

    return {
      y: _y,
      forSort: NetWeight
    };
  },

  fValue: function fValue(pnValue) {
    switch (pnValue) {
      case _conf2.default.AVG_PRICE:
        return this.crAvgPricePoint;
      default:
        return function (item) {
          return {
            y: item[pnValue],
            forSort: item[pnValue]
          };
        };
    }
  },
  fPoint: function fPoint(pnValue) {
    var _crValue = this.fValue(pnValue);
    return function (item) {
      return (0, _extends3.default)({
        isCategory: true,
        x: item.period
      }, _crValue(item));
    };
  },


  toArr: function toArr(obj) {
    var arr = [];
    var propName = void 0;
    for (propName in obj) {
      arr.push(obj[propName]);
    }
    return arr.sort();
  },

  toSeriaNames: function toSeriaNames(hm) {
    var arr = [];
    //let propName;
    for (var propName in hm) {
      if (propName !== _conf2.default.WORLD) {
        var points = hm[propName];
        arr.push({
          value: points[points.length - 1].forSort,
          name: propName
        });
      }
    }
    return arr.sort(_AdapterFn2.default.compareByValue).reverse();
  },

  toHmCategories: function toHmCategories(_ref) {
    var dataset = _ref.dataset,
        _ref$pnCountry = _ref.pnCountry,
        pnCountry = _ref$pnCountry === undefined ? 'ptTitle' : _ref$pnCountry,
        _ref$pnValue = _ref.pnValue,
        pnValue = _ref$pnValue === undefined ? 'TradeValue' : _ref$pnValue;

    var hm = Object.create(null),
        _category = Object.create(null),
        _crPoint = this.fPoint(pnValue);

    dataset.forEach(function (item) {
      var ptTitle = item[pnCountry];
      if (hm[ptTitle] === undefined) {
        hm[ptTitle] = [];
      }
      hm[ptTitle].push(_crPoint(item));

      var period = item.period;
      if (_category[period] === undefined) {
        _category[period] = period;
      }
    });

    var categories = this.toArr(_category);

    return { hm: hm, categories: categories };
  }
};

exports.default = fnHm;
//# sourceMappingURL=fnHm.js.map