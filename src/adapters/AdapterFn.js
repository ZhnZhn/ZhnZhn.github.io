export { getColorBlack } from '../components/styleFn';

import Big from 'big.js';

import { toTd as _toTd } from '../charts/dateFormat';

export { bindTo } from '../utils/bindTo';
export { isTokenInStr } from '../utils/isTokenInStr';
export {
  isInArrStr,
  joinBy
} from '../utils/arrFn';
import { joinBy } from '../utils/arrFn';
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
  isObj,
  isArr,
  isNaN,
  isTypeNumber,
  isNumber,
  isStr
} from '../utils/isTypeFn';
import {
  isArr,
  isNaN,
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

const _fToFloatOr = dfValue => str => {
  const _v = parseFloat(str);
  return isNaN(_v) ? dfValue : _v;
};

export const toTd = (mls) => isNumber(mls)
  ? _toTd(mls)
  : ''

export const getCaption = getC
export const getValue = getV
export const getValueCaption = getVc

export const numberFormat = formatAllNumber
export const isYNumber = _fIsNumber('y')
export const toFloatOrEmpty = _fToFloatOr('')

const DF_ERR_MESSAGE = 'No data available for request.'
export const crError = (
  errCaption='',
  message
) => ({
  errCaption,
  message: isStr(message) ? message : DF_ERR_MESSAGE
})
export const crErrorByMessage = message => crError('', message)

const _getDataDf = json => (json || {}).data
export const fCheckResponse = (
  getData=_getDataDf
) => json => {
  if ( !isArr(getData(json)) ) {
    throw crError();
  }
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

  const len = data.length
  , _pointNow = data[len-1] || [ EMPTY, 0 ]
  , bNowValue = _crBigValueFrom(_pointNow)
  , _pointPrev = data[len-2] || _pointNow
  , bPrevValue = _crBigValueFrom(_pointPrev)
  , date = _crDmyFrom(_pointNow)
  , dateTo = _crDmyFrom(_pointPrev);

  return  {
    ...crValueMoving({ bNowValue, bPrevValue, dfR }),
    valueTo: formatAllNumber(bPrevValue),
    date, dateTo
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
}) => ({
  id: _itemKey,
  key: _itemKey,
  itemCaption,
  dataSource
})

export const fCrLazyValue = crValue => {
  let value;
  return () => value === void 0
    ? (value = crValue())
    : value;
}

export const addToConfigInfo = (
  config,
  option
) => {
  config.info = {
     name: joinBy(", ", option.title, option.subtitle)
  }
}

export const addToConfigDfLink = (
  config,
  caption,
  href
) => {
  assign(config.zhConfig, {
    linkFn: "DF",
    item: {
      caption,
      href
    }
  })
}
