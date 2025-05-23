import Big from 'big.js';

import { toTd as _toTd } from '../charts/dateFormat';

export { bindTo } from '../utils/bindTo';
export { domSanitize } from '../utils/domSanitize';
export { isTokenInStr } from '../utils/isTokenInStr';
export {
  crRouter,
  crGetRoute
} from '../utils/crRouter';
export {
  isInArrStr
} from '../utils/arrFn';
import { joinByComma } from '../utils/arrFn';
import formatAllNumber from '../utils/formatAllNumber';
import {
  getC,
  getV,
  getVc
} from '../utils/getPropertyFn';

import { mlsToDmy } from '../utils/dateFn';
export {
  ymdToUTC,
  ymdhmsToUTC,
  getFromDate,
  getYmdhmUTC,
  getYear,
  getCurrentYear,
  getDaysFromYmd,
  mlsToDmy,
  monthIndex
} from '../utils/dateFn';
export { getByPropsFrom } from '../utils/getByPropsFrom';
export { toUpperCaseFirst } from '../utils/toUpperCaseFirst';

import {
  crValueMoving as _crVm,
  roundBy,
} from '../math/mathFn';
export {
  roundBy,
  isInRange
} from '../math/mathFn';

export {
  findMinY,
  findMaxY,
  filterTrimZero
} from '../math/seriaFn';

import { DT_EMPTY } from '../constants/DirectionType';
import {
  getPointDate,
  getPointValue
} from './getterPointFn';

export {
  isArr,
  isNumber
} from '../utils/isTypeFn';
import {
  isArr,
  isTypeNumber,
  isNumber,
  isStr
} from '../utils/isTypeFn';

export const isNumberOrNull = v => isNumber(v) || v === null

export const assign = Object.assign
export const FN_IDENTITY = v => v
export const FN_NOOP = () => {}

export const crDfItemKey = ({ _itemKey }) => _itemKey

const EMPTY = '';

const _fIsNumber = (
  pn
) => (p) => isTypeNumber(p[pn]) && isFinite(p[pn]);

const _crBigValueFrom = point => Big(getPointValue(point));
const _crDmyFrom = point => mlsToDmy(getPointDate(point));

export const toTd = (mls) => isNumber(mls)
  ? _toTd(mls)
  : ''

export const getCaption = getC
export const getValue = getV
export const getValueCaption = getVc

export const getValues = option => option.items.map(getV)
export const safeReplaceIn = (
  str,
  from,
  to
) => isStr(str) ? str.replace(from, to) : ''

export const numberFormat = formatAllNumber
export const isYNumber = _fIsNumber('y')

const DF_ERR_MESSAGE = 'No data available for request.'
export const crError = (
  errCaption='',
  message
) => ({
  errCaption,
  message: isStr(message) ? message : DF_ERR_MESSAGE
})
export const crErrorByMessage = message => crError('', message)

export const toTimeDate = (
  strDateOr
) => isStr(strDateOr) && strDateOr
  ? `${strDateOr.slice(11, 19)} ${strDateOr.slice(8, 10)}-${strDateOr.slice(5, 7)}-${strDateOr.slice(0, 4)}`
  : "";

const _getDataDf = json => (json || {}).data
export const fCheckResponse = (
  getData=_getDataDf,
  getErrMsg=FN_NOOP
) => json => {
  if ( !isArr(getData(json)) ) {
    throw crError('', getErrMsg(json));
  }
}

export const crShortItemCaption = (itemCaption) => {
  if (!isStr(itemCaption)) return "";
  const _startIndex = itemCaption.indexOf("(")
  , _endIndex = itemCaption.indexOf(")", _startIndex);
  return _startIndex !== -1 && _startIndex < _endIndex
    ? itemCaption.slice(_startIndex+1, _endIndex)
    : itemCaption;
}

const _crItemCaptionCurrencyRate = (
  option,
  toCurrency
) => {
  const _fromCurrency = crShortItemCaption(
    getCaption(option.items[0])
  );
  return `${_fromCurrency}/${toCurrency}`;
}

export const setItemCaptionTo = (
  option,
  itemCaption
) => {
  option.itemCaption = itemCaption
}

export const setItemCaptionCurrencyRateTo = (
  option,
  toCurrency
) => {
  setItemCaptionTo(option,
    _crItemCaptionCurrencyRate(option, toCurrency)
  )
}

export const crValueMoving = ({
  bNowValue=Big('0.0'),
  bPrevValue=Big('0.0'),
  dfR
}) => _crVm({
  nowValue: bNowValue,
  prevValue: bPrevValue,
  fnFormat: formatAllNumber,
  dfR
})

const _calcSumOfSlice = (
  data,
  sliceIndex,
  date
) => data.reduce((bSum, _seriesData) => {
  const point = _seriesData[_seriesData.length - sliceIndex];
  return date === _crDmyFrom(point)
    ? bSum.plus(''+getPointValue(point))
    : bSum
}, Big('0')).toString();

const _getRecentDataPoints = data => {
  const _length = data.length
  , _pointNow = data[_length - 1] || [EMPTY, 0]
  , _pointPrev = data[_length - 2] || _pointNow;
  return [
    _pointNow,
    _pointPrev
  ];
};

const _crBigValue = (
  nOrStr,
  dfR
) => Big(roundBy(nOrStr, dfR));

const _crSeriesDataRecentTuple = (
  data,
  dfR
) => {
  const [
    _pointNow,
    _pointPrev
  ] = _getRecentDataPoints(data[0] || [])
  , date = _crDmyFrom(_pointNow)
  , dateTo = _crDmyFrom(_pointPrev)
  , bNowValue = _crBigValue(_calcSumOfSlice(data, 1, date), dfR)
  , bPrevValue = _crBigValue(_calcSumOfSlice(data, 2, dateTo), dfR);
  return [
    bNowValue,
    bPrevValue,
    date,
    dateTo
  ];
}

const _crSeriaDataRecentTuple = (
  data
) => {
  const [
    _pointNow,
    _pointPrev
  ] = _getRecentDataPoints(data)
  , bNowValue = _crBigValueFrom(_pointNow)
  , bPrevValue = _crBigValueFrom(_pointPrev)
  , date = _crDmyFrom(_pointNow)
  , dateTo = _crDmyFrom(_pointPrev);
  return [
    bNowValue,
    bPrevValue,
    date,
    dateTo
  ];
};

export const valueMoving = (
  data,
  dfR
) => {
  if (!isArr(data)) {
    return {
      date: data,
      direction: DT_EMPTY
    };
  }

  const [
    bNowValue,
    bPrevValue,
    date,
    dateTo
  ] = isSeriesDataCase(data)
    ? _crSeriesDataRecentTuple(data, dfR)
    : _crSeriaDataRecentTuple(data);

  return {
    ...crValueMoving({ bNowValue, bPrevValue, dfR }),
    valueTo: formatAllNumber(bPrevValue),
    date,
    dateTo
  };
}

export const fCrValue = (
  option,
  crValueDf
) => {
  const _rt = option._rt;
  return isNumber(_rt)
    ? v => roundBy(v, _rt)
    : crValueDf || (v => v);
}

export const roundByOHLC = n => {
  if (n>-1 && n<1) { return n; }
  return roundBy(n, 2);
}

export const crZhConfig = ({
  _itemKey,
  itemCaption,
  dataSource
}, configOptions) => ({
  ...configOptions,
  id: _itemKey,
  key: _itemKey,
  itemCaption,
  dataSource
})

let _parser;
export const crXmlDocument = str => {
  if (!_parser) {
    _parser = new window.DOMParser();
  }
  return _parser.parseFromString(str, 'text/xml');
}

export const addToConfigInfo = (
  config,
  option
) => {
  config.info = {
     name: joinByComma(option.title, option.subtitle)
  }
}

export const crDfLink = (
  caption,
  href
) => ({
  linkFn: "DF",
  item: {
    caption,
    href
  }
})

export const addToConfigDfLink = (
  config,
  caption,
  href
) => {
  assign(config.zhConfig, crDfLink(caption, href))
}

export const fAddToConfigInfoAndDfLink = (
  title,
  crDfLink
) => (
  config,
  json,
  option
) => {
  addToConfigInfo(config, option)
  addToConfigDfLink(config,
    `${title} Data Portal`,
    crDfLink(option)
  )
  return config;
}

//FAOSTAT > List Splines
const SERIES_DATA_TYPE = "sd";
export const addSeriesDataTypeTo = (
  data
) => {
  data._type = SERIES_DATA_TYPE
  return data;
}
export const isSeriesDataCase = (
  data
) => (data || {})._type === SERIES_DATA_TYPE
