"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _compareByFn = require("../compareByFn");

var _ChartType = require("../../constants/ChartType");

var _formatAllNumber = _interopRequireDefault(require("../../utils/formatAllNumber"));

var _Chart = require("../../charts/Chart");

var _PieConfigFn = require("../../charts/PieConfigFn");

var _QuandlFn = require("./QuandlFn");

var _fnStacked = require("./fnStacked");

const _assign = Object.assign;

const _calcLegendHeight = length => length !== 0 ? _Chart.CHART_HEIGHT + _Chart.LEGEND_ROW_HEIGHT * (Math.ceil(length / 4) - 1) : _Chart.CHART_HEIGHT;

const _addPercentToItem = (item, bTotal) => {
  const _bPercent = (0, _QuandlFn.crPercent)({
    bValue: (0, _big.default)(item.y),
    bTotal: bTotal
  });

  item.name += ' ' + _bPercent;
};

const _createTopDonutData = _ref => {
  let {
    isPercent = false,
    data = [],
    bTotal = (0, _big.default)('0.0')
  } = _ref;

  const arr = [],
        _bTotal90 = bTotal.times(0.9);

  let bArrTotal = (0, _big.default)('0.0'),
      i = 0,
      _max = data.length;

  for (; i < _max; i++) {
    const item = data[i];

    if (i === 0 || !bArrTotal.gte(_bTotal90) || i === _max - 1) {
      if (isPercent) {
        _addPercentToItem(item, bTotal);
      }

      arr.push(item);
    } else {
      break;
    }

    bArrTotal = bArrTotal.plus(item.y);
  }

  if (!bArrTotal.eq(bTotal)) {
    bArrTotal = bTotal.minus(bArrTotal);
    arr.push({
      name: 'Other ' + (0, _QuandlFn.crPercent)({
        bValue: bArrTotal,
        bTotal: bTotal
      }),
      nameFull: 'Other',
      color: 'gray',
      y: parseFloat(bArrTotal)
    });
  }

  return arr;
};

const _crYear = yearStr => yearStr ? yearStr.split('-')[0] : '';

const _sortData = data => data.sort(_compareByFn.compareByY).reverse();

const toSemiDonut = (json, option) => {
  const config = (0, _PieConfigFn.crPieConfig)(),
        {
    sliceItems: items = [],
    value = ''
  } = option,
        id = value + "_" + _ChartType.CHT_SEMI_DONUT,
        [jsonData1, jsonData2] = json.dataset.data,
        _year1 = _crYear(jsonData1[0]),
        _year2 = _crYear(jsonData2[0]),
        _data1 = [],
        _data2 = [];

  let _bTotal1 = (0, _big.default)('0.0');

  let _bTotal2 = (0, _big.default)('0.0');

  items.forEach(item => {
    const {
      value,
      caption
    } = item,
          y1 = jsonData1[value],
          y2 = jsonData2[value];

    if (y1) {
      _data1.push({
        name: (caption || '').split(';')[0].substring(0, 9),
        nameFull: caption,
        y: y1
      });

      _bTotal1 = _bTotal1.plus(y1);
    }

    if (y2) {
      _data2.push({
        nameFull: caption,
        y: y2
      });

      _bTotal2 = _bTotal2.plus(y2);
    }
  });

  const _dataTop1 = _createTopDonutData({
    isPercent: true,
    data: _sortData(_data1),
    bTotal: _bTotal1
  });

  const _dataTop2 = _createTopDonutData({
    data: _sortData(_data2),
    bTotal: _bTotal2
  });

  config.series = [(0, _PieConfigFn.crInnerPieSeria)({
    center: ['20%', '80%'],
    year: _year1,
    bTotal: (0, _formatAllNumber.default)(_bTotal1)
  }), (0, _PieConfigFn.crOuterPieSeria)({
    center: ['20%', '80%'],
    data: _dataTop1,
    isShowInLegend: true
  }), (0, _PieConfigFn.crInnerPieSeria)({
    center: ['70%', '80%'],
    year: _year2,
    bTotal: (0, _formatAllNumber.default)(_bTotal2)
  }), (0, _PieConfigFn.crOuterPieSeria)({
    center: ['70%', '80%'],
    data: _dataTop2
  })];
  (0, _QuandlFn.setTitleToConfig)(config, option);

  _assign(config, {
    chart: {
      height: _calcLegendHeight(_dataTop1.length)
    },
    valueMoving: (0, _fnStacked.crValueMoving)(_bTotal1, _year1, _bTotal2, _year2),
    zhConfig: (0, _fnStacked.crZhConfig)(option, id),
    info: (0, _QuandlFn.crDatasetInfo)(json)
  });

  return {
    config
  };
};

var _default = toSemiDonut;
exports.default = _default;
//# sourceMappingURL=toSemiDonut.js.map