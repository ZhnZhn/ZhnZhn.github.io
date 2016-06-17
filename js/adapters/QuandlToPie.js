'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fCreatePieConfig = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _Type = require('../constants/Type');

var _Chart = require('../constants/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartConfig = require('../constants/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _QuandlFn = require('./QuandlFn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _fnCalcPieLegendHeight = function _fnCalcPieLegendHeight(length) {
  if (length !== 0) {
    return _Chart2.default.HEIGHT + _Chart2.default.LEGEND_ROW_HEIGHT * (Math.ceil(length / 4) - 1);
  } else {
    return _Chart2.default.HEIGHT;
  }
};

var _fnAddPercentToItem = function _fnAddPercentToItem(item, bTotal) {
  var _bPercent = (0, _QuandlFn.fnCreatePercent)({ bValue: (0, _big2.default)(item.y), bTotal: bTotal });
  if ((0, _big2.default)(_bPercent).gte('10.00')) {
    item.name = item.name + ' ' + _bPercent;
  } else {
    item.name = item.name + '  ' + _bPercent;
  }
};

var _fnCreateTopDonutData = function _fnCreateTopDonutData(_ref) {
  var _ref$data = _ref.data;
  var data = _ref$data === undefined ? [] : _ref$data;
  var _ref$bTotal = _ref.bTotal;
  var bTotal = _ref$bTotal === undefined ? (0, _big2.default)('0.0') : _ref$bTotal;
  var _ref$isPercent = _ref.isPercent;
  var isPercent = _ref$isPercent === undefined ? false : _ref$isPercent;

  var arr = [],
      _bTotal90 = bTotal.times(0.9);
  var bArrTotal = (0, _big2.default)('0.0');
  for (var i = 0, max = data.length; i < max; i++) {
    var item = data[i];
    if (i === 0 || !bArrTotal.gte(_bTotal90) || i === max - 1) {
      if (isPercent) {
        _fnAddPercentToItem(item, bTotal);
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
      name: 'Other ' + (0, _QuandlFn.fnCreatePercent)({ bValue: bArrTotal, bTotal: bTotal }),
      nameFull: 'Other',
      color: 'gray',
      y: parseFloat(bArrTotal)
    });
  }
  return arr;
};

var fCreatePieConfig = exports.fCreatePieConfig = function fCreatePieConfig(json, option) {
  var config = _ChartConfig2.default.fBasePieConfig();
  var _option$sliceItems = option.sliceItems;
  var items = _option$sliceItems === undefined ? [] : _option$sliceItems;
  var _option$value = option.value;
  var value = _option$value === undefined ? '' : _option$value;
  var zhSeriaId = value + '_' + _Type.ChartType.SEMI_DONUT;
  var jsonData = json.dataset && json.dataset.data ? json.dataset.data : [];
  var jsonData1 = jsonData[0];
  var jsonData2 = jsonData[1];
  var _year1 = jsonData1[0] ? jsonData1[0].split('-')[0] : '';
  var _year2 = jsonData2[0] ? jsonData2[0].split('-')[0] : '';
  var _data1 = [];
  var _data2 = [];

  var _bTotal1 = (0, _big2.default)('0.0');
  var _bTotal2 = (0, _big2.default)('0.0');

  items.forEach(function (item, index) {
    var y1 = jsonData1[item.value];
    var y2 = jsonData2[item.value];
    if (y1) {
      //const _nameFull = item.caption.replace(/;/g, '<br/>')
      var _name = item.caption.split(';')[0].substring(0, 9);
      _data1.push({ name: _name, nameFull: item.caption, y: y1 });
      _bTotal1 = _bTotal1.plus(y1);
    }
    if (y2) {
      _data2.push({ nameFull: item.caption, y: y2 });
      _bTotal2 = _bTotal2.plus(y2);
    }
  });

  var _dataTop1 = _fnCreateTopDonutData({
    data: _lodash2.default.sortBy(_data1, 'y').reverse(),
    bTotal: _bTotal1,
    isPercent: true
  });
  var _dataTop2 = _fnCreateTopDonutData({
    data: _lodash2.default.sortBy(_data2, 'y').reverse(),
    bTotal: _bTotal2
  });

  config.series = [_ChartConfig2.default.fInnerPieSeria({
    center: ['20%', '80%'],
    year: _year1,
    bTotal: _ChartConfig2.default.fnNumberFormat(_bTotal1)
  }), _ChartConfig2.default.fOuterPieSeria({
    zhSeriaId: zhSeriaId,
    center: ['20%', '80%'],
    data: _dataTop1,
    //isDataLabels : true,
    isShowInLegend: true
  }), _ChartConfig2.default.fInnerPieSeria({
    center: ['70%', '80%'],
    year: _year2,
    bTotal: _ChartConfig2.default.fnNumberFormat(_bTotal2)
  }), _ChartConfig2.default.fOuterPieSeria({
    zhSeriaId: zhSeriaId,
    center: ['70%', '80%'],
    data: _dataTop2
  })];

  (0, _QuandlFn.fnSetTitleToConfig)(config, option);

  config.chart = {
    height: _fnCalcPieLegendHeight(_dataTop1.length)
  };

  config.valueMoving = (0, _QuandlFn.fnCreateValueMoving)({
    bNowValue: _bTotal1,
    bPrevValue: _bTotal2
  });
  config.zhConfig = (0, _QuandlFn.fnCreateZhConfig)(option);
  config.zhConfig.id = zhSeriaId;
  config.zhConfig.isWithoutAdd = true;
  config.zhConfig.isWithoutIndicator = true;
  config.info = (0, _QuandlFn.fnCreateDatasetInfo)(json);

  return { config: config };
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\QuandlToPie.js.map