'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var valueMoving = _AdapterFn2.default.valueMoving,
    crZhFn = _AdapterFn2.default.crZhFn;


var _crZhConfig = function _crZhConfig(option) {
  var title = option.title,
      dataSource = option.dataSource,
      value = option.value,
      linkFn = option.linkFn;

  return {
    id: value, key: value,
    itemCaption: title,
    isWithoutAdd: true,
    isWithLegend: false,
    linkFn: linkFn, item: value,
    dataSource: dataSource
  };
};

var _crInfo = function _crInfo(_ref) {
  var title = _ref.title;
  return {
    name: title
  };
};

var fnAdapter = {
  crData: function crData(json) {
    return json.Data.map(function (p) {
      return {
        x: p.time * 1000,
        y: p.close
      };
    });
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\crypto-compare\fnAdapter.js.map