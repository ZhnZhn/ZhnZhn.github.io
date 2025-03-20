import { isFn } from '../../utils/isTypeFn';

import {
  getC,
  getV
} from '../../utils/getPropertyFn';

const MAX_SUBTITLE = 60;

const _crDirection = (
  tradeFlowCaption
) => tradeFlowCaption.indexOf('Export') !== -1
  ? 'to'
  : 'from';

const _crTitle = (
  one,
  tradeFlow,
  tradePartner
) => {
  const _tradeFlowCaption = getC(tradeFlow)
  , _title = getC(one) + ': ' + _tradeFlowCaption
  , _tradePartnerCapion = getC(tradePartner);
  return _tradePartnerCapion
   ? `${_title} ${_crDirection(_tradeFlowCaption)} ${_tradePartnerCapion}`
   : _title;
};

const _crSubtitle = three => {
  const _threeCaption = getC(three);
  return _threeCaption.length > MAX_SUBTITLE
    ? _threeCaption.substring(0, MAX_SUBTITLE) + '...'
    : _threeCaption;
};

const crLoadOptions = (
  props,
  options
) => {
  const {
    fnValue,
    loadId,
    dataSource
  } = props || {}
  , {
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
  } = options || {}
  , _oneValue = getV(one)
  , _two = getV(three) || getV(two)
  , _value = isFn(fnValue)
       ? fnValue(_oneValue, _two)
       : void 0;

  return {
    loadId,
    dataSource,
    value: _value,
    title: _crTitle(one, tradeFlow, tradePartner),
    subtitle: _crSubtitle(three),
    oneC: getC(one),
    one: _oneValue,
    two: _two,
    ...getV(tradeFlow),
    tp: getV(tradePartner),
    freq: getV(freq),
    chart: getV(chart),
    chType,
    time,
    seriaType: getV(chType),
    seriaColor,
    seriaWidth,
    tradePartners
  };
};

export default crLoadOptions
