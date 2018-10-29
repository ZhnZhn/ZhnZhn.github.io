'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ymdToUTC = _AdapterFn2.default.ymdToUTC,
    valueMoving = _AdapterFn2.default.valueMoving;


var _crInfo = function _crInfo(_ref) {
  var title = _ref.title,
      subtitle = _ref.subtitle,
      two = _ref.two;
  return {
    name: title + ': ' + subtitle + ' (' + two + ')'
  };
};

var fnAdapter = {
  crId: function crId(option) {
    var _option$one = option.one,
        one = _option$one === undefined ? '' : _option$one,
        _option$two = option.two,
        two = _option$two === undefined ? '' : _option$two;

    return one + '_' + two;
  },
  crData: function crData(arrIn) {
    if (!Array.isArray(arrIn)) {
      return [];
    }
    var d = [];
    arrIn.forEach(function (p) {
      if (p && p.value != null && p.date) {
        d.push({
          x: ymdToUTC(p.date),
          y: p.value
        });
      }
    });
    return d.reverse();
  },

  crConfigOptions: function crConfigOptions(option, data) {
    var title = option.title,
        linkItem = option.linkItem,
        dataSource = option.dataSource,
        _id = fnAdapter.crId(option);

    return {
      info: _crInfo(option),
      zhConfig: {
        key: _id,
        id: _id,
        itemCaption: title,
        isWithoutAdd: true,
        linkFn: 'DF',
        item: (0, _extends3.default)({}, linkItem),
        dataSource: dataSource
      },
      valueMoving: valueMoving(data)
    };
  }
};

exports.default = fnAdapter;
//# sourceMappingURL=fnAdapter.js.map