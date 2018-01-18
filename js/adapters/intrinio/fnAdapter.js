'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNumberOrNull = _AdapterFn2.default.isNumberOrNull,
    ymdToUTC = _AdapterFn2.default.ymdToUTC,
    valueMoving = _AdapterFn2.default.valueMoving,
    crZhFn = _AdapterFn2.default.crZhFn;


var FRED = 'FRED';

var _crId = function _crId(value, two) {
  return two ? value + '_' + two : value;
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
  var value = option.value,
      _option$title = option.title,
      title = _option$title === undefined ? '' : _option$title,
      dataSource = option.dataSource,
      linkFn = option.linkFn,
      two = option.two,
      item = _crLinkItem(option),
      id = _crId(value, two);

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

  crConfigOption: function crConfigOption(_ref2) {
    var option = _ref2.option,
        data = _ref2.data;
    return (0, _extends3.default)({
      zhConfig: _crZhConfig(option),
      valueMoving: valueMoving(data),
      info: _crInfo(option)
    }, crZhFn());
  }

};

exports.default = fnAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\intrinio\fnAdapter.js.map