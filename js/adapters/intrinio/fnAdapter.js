'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNumberOrNull = _AdapterFn2.default.isNumberOrNull,
    ymdToUTC = _AdapterFn2.default.ymdToUTC,
    valueMoving = _AdapterFn2.default.valueMoving;


var FRED = 'FRED';

var _crId = function _crId(option) {
  var value = option.value,
      two = option.two,
      _option$three = option.three,
      three = _option$three === undefined ? '' : _option$three;

  return two ? value + '_' + two + '_' + three : value;
};
var _crLinkItem = function _crLinkItem(option) {
  var linkFn = option.linkFn,
      _option$value = option.value,
      value = _option$value === undefined ? '' : _option$value;

  if (linkFn === FRED) {
    return {
      id: value.replace('$', ''),
      article: option.dfArticle
    };
  }
  return value;
};
var _crZhConfig = function _crZhConfig(option) {
  var _option$title = option.title,
      title = _option$title === undefined ? '' : _option$title,
      dataSource = option.dataSource,
      linkFn = option.linkFn,
      item = _crLinkItem(option),
      id = _crId(option);

  return {
    id: id, key: id,
    itemCaption: title,
    isWithoutAdd: true,
    isWithLegend: false,
    linkFn: linkFn, item: item, dataSource: dataSource
  };
};

var _crInfo = function _crInfo(_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === undefined ? '' : _ref$title;
  return {
    name: title
  };
};

var fnAdapter = {
  crSubtitle: function crSubtitle(_ref2) {
    var _ref2$subtitle = _ref2.subtitle,
        subtitle = _ref2$subtitle === undefined ? '' : _ref2$subtitle,
        threeCaption = _ref2.threeCaption;

    return threeCaption ? subtitle + ', ' + threeCaption : subtitle;
  },

  crData: function crData(json) {
    var d = [];
    json.data.forEach(function (p) {
      var date = p.date,
          value = p.value;

      if (isNumberOrNull(value)) {
        d.push({
          x: ymdToUTC(date),
          y: value
        });
      }
    });
    return d.reverse();
  },

  crConfigOption: function crConfigOption(_ref3) {
    var option = _ref3.option,
        data = _ref3.data;
    return {
      zhConfig: _crZhConfig(option),
      valueMoving: valueMoving(data),
      info: _crInfo(option)
    };
  }

};

exports.default = fnAdapter;
//# sourceMappingURL=fnAdapter.js.map