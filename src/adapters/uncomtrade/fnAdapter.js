export {
  isNumber,
  isPositiveNumber,
  ymdToUTC,
  valueMoving,
  roundBy
} from '../AdapterFn';

import {
  isArr,
  isNumber,
  isPositiveNumber,
  domSanitize,
  joinBy
} from '../AdapterFn';
import {
  isColumnOrBarCategory
} from '../CategoryFn';
export {
  sortDescByPnValue
} from '../compareByFn';

import formatNumber from '../../utils/formatNumber';
import { toDescr } from './fnDescr';
import { WORLD_CODE } from './conf';

const _sanitizeNumber = (v) => isNumber(v)
  ? ''+v
  : domSanitize(v);

export const crEmptyHmObject = () => Object.create(null)

export const isAggr = (v) => v === 'AG2'
export const isTotalByAll = (option) => option.two === 'TOTAL';

export const isAggrByTotalWorld = (
  option
) => isTotalByAll(option)
  && (!option.tp || option.tp === '0')
  && option.chart !== 'SPLINE'

export const isCategorySet = ({
  chType
}) => chType && isColumnOrBarCategory(chType.value)

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

const _fGetItemNumberPropValueByName = (
  propName
) => (item) => _sanitizeNumber((item || {})[propName]);

const _getItemPartnerCode = _fGetItemNumberPropValueByName('partnerCode')
const _getItemReporterCode = _fGetItemNumberPropValueByName('reporterCode')

export const getItemPeriod = _fGetItemNumberPropValueByName('period')


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

  if (!isArr(tradePartners)) {
    return crEmptyHmObject();
  }

  _hmTradePartner = tradePartners.reduce((hm, item) => {
    if (item && item.v && item.v.length < 4 && item.c) {
      hm[item.v] = domSanitize(item.c)
    }
    return hm;
  }, crEmptyHmObject());
  return _hmTradePartner;
}

const _getItemTradePartnerFromHm = (
  hmTradePartners,
  item
) => {
  const partnerCode = _getItemPartnerCode(item)
  return hmTradePartners[partnerCode] || partnerCode;
};
const _getItemTradeReporterFromHm = (
  hmTradePartners,
  item
) => {
  const reporterCode = _getItemReporterCode(item)
  return hmTradePartners[reporterCode] || reporterCode;
};

export const isAggrCalculatedCase = (
  reporterCode,
  tfType
) => reporterCode === '0' || tfType === 't1';

const _fCrCategoryDataPoint = (
  option,
  crDataPoint
) => {
  const _crCategory = isAggrCalculatedCase(option.one, option.tfType)
    ? _getItemTradeReporterFromHm
    : _getItemTradePartnerFromHm;
  return (
    value,
    hmTradePartners,
    item
  ) => crDataPoint(
    value,
    _crCategory(hmTradePartners, item),
    item
  );
};

export const crCategoryData = (
  json,
  option,
  crDataPoint
) => {
  const data = []
  , _hmTradePartners = getHmTradePartners(option.tradePartners)
  , _crDataPoint = _fCrCategoryDataPoint(option, crDataPoint)
  let totalOfWorld = 0
  , totalOfItems = 0;
  json.data.forEach(item => {
    const value = getItemTradeValue(item)
    , partnerCode = _getItemPartnerCode(item);
    if (option.one !== WORLD_CODE && partnerCode === WORLD_CODE && _isSameTradePartnerCode(item)) {
      totalOfWorld = value
    } else if (isPositiveNumber(value) && _isSameTradePartnerCode(item)) {
      totalOfItems += value
      data.push(_crDataPoint(
        value,
        _hmTradePartners,
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
}) => joinBy(" ",
  title, "in", period
)

export const crChartId = ({
  value,
  rg=2,
  measure,
  tp,
  freq,
  period,
  chart,
  time,
}) => joinBy("_",
  value, rg, measure, tp, freq, period, chart, time
)

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
