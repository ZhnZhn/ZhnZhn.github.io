'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _DateUtils = require('../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ymdToUTC = _DateUtils2.default.ymdToUTC;


var _getPriceAndFlow = function _getPriceAndFlow(point) {
  var close = point[4],
      high = point[2] ? point[2] : close,
      low = point[3] ? point[2] : close,
      bTp = (0, _big2.default)(high).plus(low).plus(close).div(3),
      bRmf = bTp.times(point[5]),
      isFullData = point[2] && point[3] ? true : false;
  return { bTp: bTp, bRmf: bRmf, isFullData: isFullData };
};

var _crMfiXy = function _crMfiXy(p, y) {
  return {
    x: ymdToUTC(p),
    y: y
  };
};
var _crMfiDetail = function _crMfiDetail(isNegative, bTp, bRmf, zhDate) {
  return {
    isNegative: isNegative,
    tp: parseFloat(bTp.toFixed(4)),
    rmf: parseFloat(bRmf.toFixed(4)),
    zhDate: zhDate
  };
};

var mfi = function mfi(data, period) {

  var dataMfi = [],
      nPeriod = parseFloat(period) + 1;

  var bPositiveFlow = (0, _big2.default)('0.0'),
      bNegativeFlow = (0, _big2.default)('0.0001'),
      isNegative = false,
      nNotFullPoint = 0,
      max = data.length,
      i = 0;

  for (; i < max; i++) {
    var point = data[i];
    if (i < nPeriod) {
      if (i == 0) {
        var _getPriceAndFlow2 = _getPriceAndFlow(point),
            bTp = _getPriceAndFlow2.bTp,
            bRmf = _getPriceAndFlow2.bRmf,
            isFullData = _getPriceAndFlow2.isFullData;

        if (!isFullData) {
          nNotFullPoint += 1;
        }
        dataMfi.push((0, _extends3.default)({}, _crMfiXy(point[0], null), _crMfiDetail(false, bTp, bRmf)));
      } else {
        var _getPriceAndFlow3 = _getPriceAndFlow(point),
            _bTp = _getPriceAndFlow3.bTp,
            _bRmf = _getPriceAndFlow3.bRmf,
            _isFullData = _getPriceAndFlow3.isFullData;

        if (!_isFullData) {
          nNotFullPoint += 1;
        }
        if (_bTp.gt(dataMfi[i - 1].tp)) {
          bPositiveFlow = bPositiveFlow.plus(_bRmf.toFixed(4));
          isNegative = false;
        } else {
          bNegativeFlow = bNegativeFlow.plus(_bRmf.toFixed(4));
          isNegative = true;
        }
        dataMfi.push((0, _extends3.default)({}, _crMfiXy(point[0], null), _crMfiDetail(isNegative, _bTp, _bRmf)));
      }
    } else {
      var _getPriceAndFlow4 = _getPriceAndFlow(point),
          _bTp2 = _getPriceAndFlow4.bTp,
          _bRmf2 = _getPriceAndFlow4.bRmf,
          _isFullData2 = _getPriceAndFlow4.isFullData;

      if (!_isFullData2) {
        nNotFullPoint += 1;
      }
      if (_bTp2.gt(dataMfi[i - 1].tp)) {
        bPositiveFlow = bPositiveFlow.plus(_bRmf2.toFixed(4));
        isNegative = false;
      } else {
        bNegativeFlow = bNegativeFlow.plus(_bRmf2.toFixed(4));
        isNegative = true;
      }
      if (dataMfi[i - period].isNegative) {
        bNegativeFlow = bNegativeFlow.minus(dataMfi[i - period].rmf);
      } else {
        bPositiveFlow = bPositiveFlow.minus(dataMfi[i - period].rmf);
      }

      var bMFR_PlusOne = bPositiveFlow.div(bNegativeFlow.toFixed(4)).plus('1'),
          bRatio = (0, _big2.default)('100').div(bMFR_PlusOne.toFixed(4)),
          bY = (0, _big2.default)('100').minus(bRatio.toFixed(4));

      dataMfi.push((0, _extends3.default)({}, _crMfiXy(point[0], parseFloat(bY.toFixed(2))), _crMfiDetail(isNegative, _bTp2, _bRmf2, point[0])));
    }
  }

  return {
    dataMfi: dataMfi,
    nNotFullPoint: nNotFullPoint
  };
};

exports.default = mfi;
//# sourceMappingURL=mfi.js.map