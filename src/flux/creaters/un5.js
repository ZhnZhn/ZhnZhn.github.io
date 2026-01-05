import { isFn } from '../../utils/isTypeFn';

import {
  getCaption,
  getValue
} from '../../utils/itemFn';
import {
  isTokenInStr
} from '../../utils/strFn';

const MAX_SUBTITLE = 60;

const _crDirection = (
  tradeFlowCaption
) => isTokenInStr(tradeFlowCaption, 'Export')
  ? 'to'
  : 'from';

const _crTitle = (
  one,
  tradeFlow,
  tradePartner
) => {
  const _tradeFlowCaption = getCaption(tradeFlow)
  , _title = getCaption(one) + ': ' + _tradeFlowCaption
  , _tradePartnerCapion = getCaption(tradePartner);
  return _tradePartnerCapion
   ? `${_title} ${_crDirection(_tradeFlowCaption)} ${_tradePartnerCapion}`
   : _title;
};

const _crSubtitle = three => {
  const _threeCaption = getCaption(three);
  return _threeCaption.length > MAX_SUBTITLE
    ? _threeCaption.slice(0, MAX_SUBTITLE) + '...'
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
  , _oneValue = getValue(one)
  , _two = getValue(three) || getValue(two)
  , _value = isFn(fnValue)
       ? fnValue(_oneValue, _two)
       : void 0;

  return {
    loadId,
    dataSource,
    value: _value,
    title: _crTitle(one, tradeFlow, tradePartner),
    subtitle: _crSubtitle(three),
    oneC: getCaption(one),
    one: _oneValue,
    two: _two,
    ...getValue(tradeFlow),
    tp: getValue(tradePartner),
    freq: getValue(freq),
    chart: getValue(chart),
    chType,
    time,
    seriaType: getValue(chType),
    seriaColor,
    seriaWidth,
    tradePartners
  };
};

export default crLoadOptions
