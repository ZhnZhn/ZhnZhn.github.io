"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _itemFn = require("../../utils/itemFn");
var _strFn = require("../../utils/strFn");
const MAX_SUBTITLE = 60;
const _crDirection = tradeFlowCaption => (0, _strFn.isTokenInStr)(tradeFlowCaption, 'Export') ? 'to' : 'from';
const _crTitle = (one, tradeFlow, tradePartner) => {
  const _tradeFlowCaption = (0, _itemFn.getCaption)(tradeFlow),
    _title = (0, _itemFn.getCaption)(one) + ': ' + _tradeFlowCaption,
    _tradePartnerCapion = (0, _itemFn.getCaption)(tradePartner);
  return _tradePartnerCapion ? `${_title} ${_crDirection(_tradeFlowCaption)} ${_tradePartnerCapion}` : _title;
};
const _crSubtitle = three => {
  const _threeCaption = (0, _itemFn.getCaption)(three);
  return _threeCaption.length > MAX_SUBTITLE ? _threeCaption.slice(0, MAX_SUBTITLE) + '...' : _threeCaption;
};
const crLoadOptions = (props, options) => {
  const {
      fnValue,
      loadId,
      dataSource
    } = props || {},
    {
      one,
      two,
      three,
      tradeFlow,
      tradePartner,
      freq,
      chart,
      chType,
      time,
      seriaColor,
      seriaWidth,
      tradePartners
    } = options || {},
    _oneValue = (0, _itemFn.getValue)(one),
    _two = (0, _itemFn.getValue)(three) || (0, _itemFn.getValue)(two),
    _value = (0, _isTypeFn.isFn)(fnValue) ? fnValue(_oneValue, _two) : void 0;
  return {
    loadId,
    dataSource,
    value: _value,
    title: _crTitle(one, tradeFlow, tradePartner),
    subtitle: _crSubtitle(three),
    oneC: (0, _itemFn.getCaption)(one),
    one: _oneValue,
    two: _two,
    ...(0, _itemFn.getValue)(tradeFlow),
    tp: (0, _itemFn.getValue)(tradePartner),
    freq: (0, _itemFn.getValue)(freq),
    chart: (0, _itemFn.getValue)(chart),
    chType,
    time,
    seriaType: (0, _itemFn.getValue)(chType),
    seriaColor,
    seriaWidth,
    tradePartners
  };
};
var _default = exports.default = crLoadOptions;
//# sourceMappingURL=un5.js.map