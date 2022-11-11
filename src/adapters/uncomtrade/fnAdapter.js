export {
  ymdToUTC,
  valueMoving,
  roundBy
} from '../AdapterFn';

import domSanitize from '../../utils/domSanitize';
import { toDescr } from './fnDescr';

const isNumber = n => typeof n === 'number'
  && n-n === 0;

export const isPositiveNumber = n =>
  isNumber(n) && n > 0

export const isTotalByAll = option =>
  option.tp === 'all' && option.two === 'total';

export const isNotNested = ptTitle =>
  ptTitle.indexOf(', nes') === -1;

export const getItemTradeValue = item =>
  (item || {}).TradeValue;

export const getItemCmdCode = item => {
  const {cmdCode} = item || {}
  return (cmdCode || '').length === 2
    ? cmdCode
    : domSanitize(cmdCode)
}

export const getItemCmdDescE = item =>
  domSanitize((item || {}).cmdDescE)

export const getItemPtTitle = item =>
  domSanitize((item || {}).ptTitle)

export const getItemPeriod = item => {
  const {period} = item || {}
  return isNumber(period)
    ? ''+period
    : domSanitize(period)
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
