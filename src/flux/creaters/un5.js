import {
  getV,
  getC,
  isFn
} from './createrFns';

const MAX_SUBTITLE = 60;

const _crTitle = (
  one,
  tradeFlow,
  tradePartner
) => {
  const _title = getC(one) + ': ' + getC(tradeFlow)
  , _tradePartnerCapion = getC(tradePartner);
  return _tradePartnerCapion
   ? `${_title} to ${_tradePartnerCapion}`
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
    tradePartner
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
    one: _oneValue,
    two: _two,
    ...getV(tradeFlow),
    tp: getV(tradePartner)
  };
};

export default crLoadOptions
