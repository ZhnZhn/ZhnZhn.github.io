export {
  ymdToUTC,
  valueMoving,
  roundBy
} from '../AdapterFn';

import domSanitize from '../../utils/domSanitize';
import formatNumber from '../../utils/formatNumber';
import { toDescr } from './fnDescr';
import { WORLD_CODE } from './conf';

const _isArr = Array.isArray
, _crEmptyHmObject = () => Object.create(null)
, _isNumber = n => typeof n === 'number' && n-n === 0
, _sanitizeNumber = (v) => _isNumber(v)
   ? ''+v
   : domSanitize(v);

export const isPositiveNumber = (
  n
) => _isNumber(n) && n > 0

export const isAggr = (
  v
) => v === 'AG2'

export const isTotalByAll = (
  option
) => option.two === 'TOTAL';

export const isAggrByTotalWorld = (
  option
) => isTotalByAll(option)
  && (!option.tp || option.tp === '0')

export const getItemTradeValue = (
  item
) => Math.round((item || {}).primaryValue || 0) || 0;

export const getItemCmdCode = (
  item
) => {
  const {cmdCode} = item || {};
  return (cmdCode || '').length < 4
    ? cmdCode
    : domSanitize(cmdCode);
}

export const getItemCmdDescE = (
  item
) => domSanitize((item || {}).cmdDescE)

const _getItemPartnerCode = (
  item
) => _sanitizeNumber((item || {}).partnerCode);

export const getItemPeriod = (
  item
) => _sanitizeNumber((item || {}).period)

const _isSameTradePartnerCode = (
  item
) => item
  && (item.partnerCode === item.partner2Code
  || item.partner2Code === 0);

let _hmTradePartner;
export const getHmTradePartners = (
  tradePartners
) => {
  if (_hmTradePartner) {
    return _hmTradePartner;
  }

  if (!_isArr(tradePartners)) {
    return _crEmptyHmObject();
  }

  _hmTradePartner = tradePartners.reduce((hm, item) => {
    if (item && item.v && item.v.length < 4
        && item.c && item.c.indexOf(', nes') === -1) {
      hm[item.v] = domSanitize(item.c)
    }
    return hm;
  }, _crEmptyHmObject());
  return _hmTradePartner;
}

export const crCategoryData = (
  json,
  option,
  crDataPoint
) => {
  const data = []
  , _hmTradePartners = getHmTradePartners(option.tradePartners);
  let totalOfWorld = 0
  , totalOfItems = 0;
  json.data.forEach(item => {
    const value = getItemTradeValue(item)
    , partnerCode = _getItemPartnerCode(item);
    if (partnerCode === WORLD_CODE && _isSameTradePartnerCode(item)) {
      totalOfWorld = value
    } else if (isPositiveNumber(value) && _isSameTradePartnerCode(item)) {
      totalOfItems += value
      data.push(crDataPoint(
        value,
        _hmTradePartners[partnerCode] || partnerCode,
        item
      ))
    }
   })
   return [
     data,
     totalOfWorld || totalOfItems
   ];
}

export const crCategoryTitle = ({
  title,
  period
}) => [title, 'in', period]
  .filter(Boolean)
  .join(' ');

export const crChartId = ({
  value,
  rg=2,
  measure,
  tp,
  freq,
  period,
  chart
}) => [value, rg, measure, tp, freq, period, chart]
  .filter(Boolean)
  .join("_");

export const crInfo = (
  json,
  option
) => ({
  frequency: option.period || (option.freq === 'M'
    ? 'Monthly'
    : 'Annual'),
  description: toDescr(json, option)
});

export const crZhConfig = (
  option, {
   itemValue,
   isLegend,
   isWi = true
  } = {}
) => {
  const {
    oneC,
    period,
    dataSource
  } = option
  , _id = crChartId(option);
  return {
    id: _id,
    key: _id,
    itemCaption: oneC,
    itemValue: itemValue && formatNumber(itemValue),
    itemTime: period,
    legend: isLegend ? [] : void 0,
    isWithoutIndicator: isWi,
    dataSource
  };
}
