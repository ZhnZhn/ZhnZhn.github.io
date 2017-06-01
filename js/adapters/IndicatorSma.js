'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnGetConfigMfi = exports.fnRemoveSeries = exports.fnAddSeriesSma = undefined;

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _ChartConfig = require('../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnAddSeriesSma = exports.fnAddSeriesSma = function fnAddSeriesSma(option) {
  var chart = option.chart,
      id = option.id,
      period = option.period,
      isPlus = option.isPlus,
      plus = option.plus,
      parentId = chart.options.zhConfig.id,
      dataSma = [],
      data = chart.series[0].data;


  var bSum = (0, _big2.default)('0.0');
  var i = 0,
      max = data.length,
      point = void 0;
  var _period = isPlus ? parseFloat((0, _big2.default)(period).plus(plus).minus(1).toFixed(0)) : parseFloat((0, _big2.default)(period).minus(1).toFixed(0));
  for (; i < max; i++) {
    point = data[i];
    if (i > _period) {
      bSum = bSum.plus(point.y).minus(data[i - period].y);
      dataSma.push([point.x, parseFloat(bSum.div(period).toFixed(2))]);
    } else {
      bSum = bSum.plus(point.y);
    }
  }

  if (dataSma.length > 0) {
    var seria = Object.assign(_ChartConfig2.default.fSeries(), {
      zhSeriaId: parentId + '_' + id,
      zhValueText: id,
      lineWidth: 2,
      data: dataSma
    });
    chart.addSeries(seria, true, true);
    return chart.options.colors[seria['_colorIndex']];
  } else {
    console.log('It seems, there are not enough data for SMA(' + period + ')');
    return undefined;
  }
};

var fnRemoveSeries = exports.fnRemoveSeries = function fnRemoveSeries(chart, zhValueText) {
  var series = chart.series;
  for (var i = 0, max = series.length; i < max; i++) {
    if (series[i].userOptions.zhValueText === zhValueText) {
      series[i].remove(true);
      return true;
    }
  }
  return false;
};

var _fnConvertToUTC = function _fnConvertToUTC(str) {
  var arrDate = str.split('-');
  return Date.UTC(arrDate[0], parseInt(arrDate[1], 10) - 1, arrDate[2]);
};

var _fnGetPriceAndFlow = function _fnGetPriceAndFlow(point) {
  var close = point[4],
      high = point[2] ? point[2] : close,
      low = point[3] ? point[2] : close,
      bTp = (0, _big2.default)(high).plus(low).plus(close).div(3),
      bRmf = bTp.times(point[5]),
      isFullData = point[2] && point[3] ? true : false;
  return { bTp: bTp, bRmf: bRmf, isFullData: isFullData };
};

var fnGetConfigMfi = exports.fnGetConfigMfi = function fnGetConfigMfi(chart, period, id) {

  var data = chart.options.zhPoints,
      parentId = chart.options.zhConfig.id,
      dataMcad = [],
      nPeriod = parseFloat(period) + 1;

  var bPositiveFlow = (0, _big2.default)('0.0'),
      bNegativeFlow = (0, _big2.default)('0.0001'),
      nNotFullPoint = 0;

  for (var i = 0, max = data.length; i < max; i++) {
    var point = data[i];
    if (i < nPeriod) {
      if (i == 0) {
        var _fnGetPriceAndFlow2 = _fnGetPriceAndFlow(point),
            bTp = _fnGetPriceAndFlow2.bTp,
            bRmf = _fnGetPriceAndFlow2.bRmf,
            isFullData = _fnGetPriceAndFlow2.isFullData;

        if (!isFullData) {
          nNotFullPoint += 1;
        }
        dataMcad.push({
          y: null,
          x: _fnConvertToUTC(point[0]),
          isNegative: false,
          tp: parseFloat(bTp.toFixed(4)),
          rmf: parseFloat(bRmf.toFixed(4))
        });
      } else {
        var _fnGetPriceAndFlow3 = _fnGetPriceAndFlow(point),
            _bTp = _fnGetPriceAndFlow3.bTp,
            _bRmf = _fnGetPriceAndFlow3.bRmf,
            _isFullData = _fnGetPriceAndFlow3.isFullData;

        if (!_isFullData) {
          nNotFullPoint += 1;
        }
        var isNegative = void 0;
        if (_bTp.gt(dataMcad[i - 1].tp)) {
          bPositiveFlow = bPositiveFlow.plus(_bRmf.toFixed(4));
          isNegative = false;
        } else {
          bNegativeFlow = bNegativeFlow.plus(_bRmf.toFixed(4));
          isNegative = true;
        }
        dataMcad.push({
          y: null,
          x: _fnConvertToUTC(point[0]),
          isNegative: isNegative,
          tp: parseFloat(_bTp.toFixed(4)),
          rmf: parseFloat(_bRmf.toFixed(4))
        });
      }
    } else {
      var _fnGetPriceAndFlow4 = _fnGetPriceAndFlow(point),
          _bTp2 = _fnGetPriceAndFlow4.bTp,
          _bRmf2 = _fnGetPriceAndFlow4.bRmf,
          _isFullData2 = _fnGetPriceAndFlow4.isFullData;

      if (!_isFullData2) {
        nNotFullPoint += 1;
      }

      var _isNegative = void 0;
      if (_bTp2.gt(dataMcad[i - 1].tp)) {
        bPositiveFlow = bPositiveFlow.plus(_bRmf2.toFixed(4));
        _isNegative = false;
      } else {
        bNegativeFlow = bNegativeFlow.plus(_bRmf2.toFixed(4));
        _isNegative = true;
      }
      if (dataMcad[i - period].isNegative) {
        bNegativeFlow = bNegativeFlow.minus(dataMcad[i - period].rmf);
      } else {
        bPositiveFlow = bPositiveFlow.minus(dataMcad[i - period].rmf);
      }

      var bMFR_PlusOne = bPositiveFlow.div(bNegativeFlow.toFixed(4)).plus('1'),
          bRatio = (0, _big2.default)('100').div(bMFR_PlusOne.toFixed(4)),
          bY = (0, _big2.default)('100').minus(bRatio.toFixed(4));

      dataMcad.push({
        x: _fnConvertToUTC(point[0]),
        y: parseFloat(bY.toFixed(2)),
        zhDate: point[0],
        isNegative: _isNegative,
        tp: parseFloat(_bTp2.toFixed(4)),
        rmf: parseFloat(_bRmf2.toFixed(4))
      });
    }
  }

  var titleNotFullPoint = nNotFullPoint !== 0 ? ' Not Full Data HL:' + nNotFullPoint : '',
      config = _ChartConfig2.default.fIndicatorMfiConfig(id, parentId, id + titleNotFullPoint, dataMcad);

  return config;
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\IndicatorSma.js.map