'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DateUtils = require('../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ymdToUTC = _DateUtils2.default.ymdToUTC;


var C = {
  ATH_UP: 'rgba(76, 175, 80, 0.75)',
  ATH_DOWN: 'rgba(244, 67, 54, 0.75)'
};

var momAth = function momAth(data) {
  var dataMom = [],
      dataAth = [],
      dataSum = [];
  var i = 1,
      max = data.length,
      point = void 0,
      prevPoint = void 0,
      x = void 0,
      mom = void 0,
      ath = void 0,
      co = void 0;

  for (; i < max; i++) {
    prevPoint = data[i - 1];
    point = data[i];
    x = ymdToUTC(point[0]);
    mom = point[4] - prevPoint[4];
    dataMom.push({ x: x, y: mom });
    ath = parseFloat((point[1] - prevPoint[4]).toFixed(4));
    dataAth.push({
      x: x, y: ath,
      color: ath > 0 ? C.ATH_UP : C.ATH_DOWN
    });
    co = parseFloat((point[4] - point[1]).toFixed(4));
    dataSum.push({ x: x, y: co });
  }
  return { dataMom: dataMom, dataAth: dataAth, dataSum: dataSum };
};

exports.default = momAth;
//# sourceMappingURL=momAth.js.map