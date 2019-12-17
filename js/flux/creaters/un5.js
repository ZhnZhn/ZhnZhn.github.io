"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var C = {
  DF_ONE: {
    caption: 'All',
    value: 'all'
  },
  COLLON: ': ',
  DOTS: '...',
  MAX_SUBTITLE: 60,
  TRADE_FLOW: {
    caption: 'Export Value',
    value: {
      rg: 2,
      measure: "TradeValue"
    }
  }
};

var createLoadOptions = function createLoadOptions(props, options) {
  if (props === void 0) {
    props = {};
  }

  if (options === void 0) {
    options = {};
  }

  var _props = props,
      fnValue = _props.fnValue,
      loadId = _props.loadId,
      dataSource = _props.dataSource,
      _options = options,
      one = _options.one,
      two = _options.two,
      three = _options.three,
      tradeFlow = _options.tradeFlow,
      _one = one || C.DF_ONE,
      _tradeFlow = tradeFlow || C.TRADE_FLOW,
      _two = three.value ? three.value : two.value,
      _value = typeof fnValue === 'function' ? fnValue(_one.value, _two) : undefined,
      _title = _one.caption + C.COLLON + _tradeFlow.caption,
      _subtitle = three.caption.length > C.MAX_SUBTITLE ? three.caption.substr(0, C.MAX_SUBTITLE) + C.DOTS : three.caption;

  return (0, _extends2["default"])({
    value: _value,
    loadId: loadId,
    title: _title,
    subtitle: _subtitle,
    dataSource: dataSource,
    one: _one.value,
    two: _two
  }, _tradeFlow.value);
};

var _default = createLoadOptions;
exports["default"] = _default;
//# sourceMappingURL=un5.js.map