"use strict";

exports.__esModule = true;
exports.default = void 0;

var _createrFns = require("./createrFns");

const MAX_SUBTITLE = 60;

const _crTitle = (one, tradeFlow, tradePartner) => {
  const _title = (0, _createrFns.getC)(one) + ': ' + (0, _createrFns.getC)(tradeFlow),
        _tradePartnerCapion = (0, _createrFns.getC)(tradePartner);

  return _tradePartnerCapion ? _title + " to " + _tradePartnerCapion : _title;
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
    tradePartner
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
    one: _oneValue,
    two: _two,
    ...(0, _createrFns.getV)(tradeFlow),
    tp: (0, _createrFns.getV)(tradePartner)
  };
};

var _default = crLoadOptions;
exports.default = _default;
//# sourceMappingURL=un5.js.map