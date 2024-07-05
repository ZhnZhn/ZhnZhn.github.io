"use strict";

exports.__esModule = true;
exports.default = void 0;
var _createrFns = require("./createrFns");
const MAX_SUBTITLE = 60;
const _crDirection = tradeFlowCaption => tradeFlowCaption.indexOf('Export') !== -1 ? 'to' : 'from';
const _crTitle = (one, tradeFlow, tradePartner) => {
  const _tradeFlowCaption = (0, _createrFns.getC)(tradeFlow),
    _title = (0, _createrFns.getC)(one) + ': ' + _tradeFlowCaption,
    _tradePartnerCapion = (0, _createrFns.getC)(tradePartner);
  return _tradePartnerCapion ? _title + " " + _crDirection(_tradeFlowCaption) + " " + _tradePartnerCapion : _title;
};
const _crSubtitle = three => {
  const _threeCaption = (0, _createrFns.getC)(three);
  return _threeCaption.length > MAX_SUBTITLE ? _threeCaption.substring(0, MAX_SUBTITLE) + '...' : _threeCaption;
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
      period,
      chart,
      chType,
      time,
      seriaColor,
      seriaWidth,
      tradePartners
    } = options || {},
    _oneValue = (0, _createrFns.getV)(one),
    _two = (0, _createrFns.getV)(three) || (0, _createrFns.getV)(two),
    _value = (0, _createrFns.isFn)(fnValue) ? fnValue(_oneValue, _two) : void 0;
  return {
    loadId,
    dataSource,
    value: _value,
    title: _crTitle(one, tradeFlow, tradePartner),
    subtitle: _crSubtitle(three),
    oneC: (0, _createrFns.getC)(one),
    one: _oneValue,
    two: _two,
    ...(0, _createrFns.getV)(tradeFlow),
    tp: (0, _createrFns.getV)(tradePartner),
    freq: (0, _createrFns.getV)(freq),
    period: (0, _createrFns.getV)(period),
    chart: (0, _createrFns.getV)(chart),
    chType,
    time,
    seriaColor,
    seriaWidth,
    tradePartners
  };
};
var _default = exports.default = crLoadOptions;
//# sourceMappingURL=un5.js.map