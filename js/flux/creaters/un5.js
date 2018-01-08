'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  DF_ONE: { caption: 'All', value: 'all' },
  COLLON: ': ',
  DOTS: '...',
  MAX_SUBTITLE: 60,
  TRADE_FLOW: {
    caption: 'Export Value',
    value: { rg: 2, measure: "TradeValue" }
  }
};

var createLoadOptions = function createLoadOptions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var fnValue = props.fnValue,
      loadId = props.loadId,
      dataSource = props.dataSource,
      one = options.one,
      two = options.two,
      three = options.three,
      tradeFlow = options.tradeFlow,
      _one = one || C.DF_ONE,
      _tradeFlow = tradeFlow || C.TRADE_FLOW,
      _two = three.value ? three.value : two.value,
      _value = typeof fnValue === 'function' ? fnValue(_one.value, _two) : undefined,
      _title = _one.caption + C.COLLON + _tradeFlow.caption,
      _subtitle = three.caption.length > C.MAX_SUBTITLE ? three.caption.substr(0, C.MAX_SUBTITLE) + C.DOTS : three.caption;

  return (0, _extends3.default)({
    value: _value,
    loadId: loadId,
    title: _title,
    subtitle: _subtitle,
    dataSource: dataSource,
    one: _one.value,
    two: _two
  }, _tradeFlow.value);
};

exports.default = createLoadOptions;
//# sourceMappingURL=un5.js.map