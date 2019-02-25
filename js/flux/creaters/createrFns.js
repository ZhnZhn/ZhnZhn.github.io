'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _getCaption = function _getCaption(item) {
  return item && item.caption || '';
};

var _crC = function _crC(title, subtitle) {
  return {
    title: title, subtitle: subtitle
  };
};

var createrFns = {

  crItemKey: function crItemKey(items, seriaType, date) {
    var _prefix = items.filter(Boolean).map(function (item) {
      return item.value || item;
    }).join('_');
    return _prefix + '_' + (seriaType || '') + '_' + (date || '');
  },

  crCaption: function crCaption(items) {
    var oneC = _getCaption(items[0]),
        twoC = _getCaption(items[1]),
        threeC = _getCaption(items[2]),
        fourC = _getCaption(items[3]);

    if (fourC) return _crC(oneC + ': ' + twoC, threeC + ': ' + fourC);
    if (threeC) return _crC(oneC, twoC + ': ' + threeC);
    if (twoC) return _crC(oneC, twoC);
    return (0, _extends3.default)({
      oneC: oneC, twoC: twoC, threeC: threeC, fourC: fourC
    }, _crC(oneC));
  },

  crAlertConf: function crAlertConf(alertItemId, alertGeo, alertMetric) {
    return {
      alertItemId: alertItemId, alertGeo: alertGeo, alertMetric: alertMetric
    };
  }
};

exports.default = createrFns;
//# sourceMappingURL=createrFns.js.map