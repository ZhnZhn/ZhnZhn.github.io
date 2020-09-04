"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _Type = require("../../constants/Type");

var _formatAllNumber = _interopRequireDefault(require("../../utils/formatAllNumber"));

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _QuandlFn = _interopRequireDefault(require("./QuandlFn"));

var _fnStacked = _interopRequireDefault(require("./fnStacked"));

var crValueMoving = _fnStacked["default"].crValueMoving,
    crZhConfig = _fnStacked["default"].crZhConfig;
var _assign = Object.assign,
    setTitleToConfig = _QuandlFn["default"].setTitleToConfig,
    createDatasetInfo = _QuandlFn["default"].createDatasetInfo,
    createPercent = _QuandlFn["default"].createPercent,
    crPieConfig = _ChartConfig["default"].crPieConfig,
    crInnerPieSeria = _ChartConfig["default"].crInnerPieSeria,
    crOuterPieSeria = _ChartConfig["default"].crOuterPieSeria,
    compareByY = _AdapterFn["default"].compareByY,
    HEIGHT = _Chart["default"].HEIGHT,
    LEGEND_ROW_HEIGHT = _Chart["default"].LEGEND_ROW_HEIGHT;

var _calcLegendHeight = function _calcLegendHeight(length) {
  return length !== 0 ? HEIGHT + LEGEND_ROW_HEIGHT * (Math.ceil(length / 4) - 1) : HEIGHT;
};

var _addPercentToItem = function _addPercentToItem(item, bTotal) {
  var _bPercent = createPercent({
    bValue: (0, _big["default"])(item.y),
    bTotal: bTotal
  });

  item.name += ' ' + _bPercent;
};

var _createTopDonutData = function _createTopDonutData(_ref) {
  var _ref$isPercent = _ref.isPercent,
      isPercent = _ref$isPercent === void 0 ? false : _ref$isPercent,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$bTotal = _ref.bTotal,
      bTotal = _ref$bTotal === void 0 ? (0, _big["default"])('0.0') : _ref$bTotal;

  var arr = [],
      _bTotal90 = bTotal.times(0.9);

  var bArrTotal = (0, _big["default"])('0.0'),
      i = 0,
      _max = data.length;

  for (; i < _max; i++) {
    var item = data[i];

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
      name: 'Other ' + createPercent({
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

var _crYear = function _crYear(yearStr) {
  return yearStr ? yearStr.split('-')[0] : '';
};

var _sortData = function _sortData(data) {
  return data.sort(compareByY).reverse();
};

var toSemiDonut = function toSemiDonut(json, option) {
  var config = crPieConfig(),
      _option$sliceItems = option.sliceItems,
      items = _option$sliceItems === void 0 ? [] : _option$sliceItems,
      _option$value = option.value,
      value = _option$value === void 0 ? '' : _option$value,
      id = value + "_" + _Type.ChartType.SEMI_DONUT,
      jsonData = json.dataset.data,
      jsonData1 = jsonData[0],
      jsonData2 = jsonData[1],
      _year1 = _crYear(jsonData1[0]),
      _year2 = _crYear(jsonData2[0]),
      _data1 = [],
      _data2 = [];

  var _bTotal1 = (0, _big["default"])('0.0');

  var _bTotal2 = (0, _big["default"])('0.0');

  items.forEach(function (item) {
    var value = item.value,
        caption = item.caption,
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

  var _dataTop1 = _createTopDonutData({
    isPercent: true,
    data: _sortData(_data1),
    bTotal: _bTotal1
  });

  var _dataTop2 = _createTopDonutData({
    data: _sortData(_data2),
    bTotal: _bTotal2
  });

  config.series = [crInnerPieSeria({
    center: ['20%', '80%'],
    year: _year1,
    bTotal: (0, _formatAllNumber["default"])(_bTotal1)
  }), crOuterPieSeria({
    center: ['20%', '80%'],
    data: _dataTop1,
    isShowInLegend: true
  }), crInnerPieSeria({
    center: ['70%', '80%'],
    year: _year2,
    bTotal: (0, _formatAllNumber["default"])(_bTotal2)
  }), crOuterPieSeria({
    center: ['70%', '80%'],
    data: _dataTop2
  })];
  setTitleToConfig(config, option);

  _assign(config, {
    chart: {
      height: _calcLegendHeight(_dataTop1.length)
    },
    valueMoving: crValueMoving(_bTotal1, _year1, _bTotal2, _year2),
    zhConfig: crZhConfig(option, id),
    info: createDatasetInfo(json)
  });

  return {
    config: config
  };
};

var _default = toSemiDonut;
exports["default"] = _default;
//# sourceMappingURL=toSemiDonut.js.map