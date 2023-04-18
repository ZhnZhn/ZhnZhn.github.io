export {
  ymdToUTC,
  valueMoving,
  roundBy
} from '../AdapterFn';

import domSanitize from '../../utils/domSanitize';
import { toDescr } from './fnDescr';

const _isArr = Array.isArray;
const _crEmptyHmObject = () => Object.create(null);
const isNumber = n => typeof n === 'number'
  && n-n === 0;

export const isPositiveNumber = n =>
  isNumber(n) && n > 0

export const isTotalByAll = option =>
  option.two === 'TOTAL';

export const isNotNested = ptTitle =>
  ptTitle.indexOf(', nes') === -1;

export const getItemTradeValue = item =>
  (item || {}).primaryValue;

export const getItemCmdCode = item => {
  const {cmdCode} = item || {}
  return (cmdCode || '').length === 2
    ? cmdCode
    : domSanitize(cmdCode)
}

export const getItemCmdDescE = item =>
  domSanitize((item || {}).cmdDescE)

const _sanitizeNumber = (v) => isNumber(v)
  ? ''+v
  : domSanitize(v)

export const getItemPtTitle = item => {
  const { partnerCode } = item || {}
  return _sanitizeNumber(partnerCode);
}

export const getItemPeriod = item => {
  const { period } = item || {};
  return _sanitizeNumber(period);
}

export const isSameTradePartnerCode = (
  item
) => item
  && (item.partnerCode === item.partner2Code || item.partner2Code === 0);

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
    itemTime: period,
    legend: isLegend ? [] : void 0,
    isWithoutIndicator: isWi,
    dataSource
  };
}
