export {
  assign,
  getValue,
  crErrorByMessage
} from '../AdapterFn';

import {
  joinBy,
  joinByColon
} from '../../utils/arrFn';
import {
  isNumber
} from '../../utils/isTypeFn';

import {
  isTokenInStr,
  crZhConfig,
  ymdToUTC,
} from '../AdapterFn';
import {
  fCrItemLinkByCaption,
  crItemConf
} from '../crFn';
import {
  getPeriodAndValue,
  getTitle,
  getSubtitle,
  getIndexedAt
} from './fnSelector';

const CHART_URL = 'https://db.nomics.world'
, SUBT_MAX = 60;

export const getDocs = (
  json
) => ((json || {}).series || {}).docs || {};

const _crId = ({
  dfProvider,
  dfCode,
  seriaId
}) =>  joinBy('/', dfProvider, dfCode, seriaId);

const _crItemLink = fCrItemLinkByCaption('DBnomics Chart');
const _crUpdatedDate = json => {
  const _date = getIndexedAt(json).split('T')[0];
  return _date
    ? `<p>Updated by DBnomics on ${_date}</p>`
    : '';
};
const _crDescr = (json, option) => {
  const _id = _crId(option);
  return`<p>SeriaId: ${_id}</p>
   ${_crUpdatedDate(json)}
   ${_crItemLink(CHART_URL+'/'+_id)}`;
};

const _crZhConfig = (option) => {
  const {
    dataSource,
    _itemKey,
    dfProvider,
    dfCode,
    seriaId,
    title
  } = option;
  return {
    ...crZhConfig({
      itemCaption: title,
      _itemKey,
      dataSource
    }),
    itemConf: {
       _itemKey,
       ...crItemConf(option),
       dataSource,
       dfProvider,
       dfCode,
       seriaId
    }
  };
};

const _crInfo = (
  json,
  option
) => ({
  name: getSubtitle(json),
  description: _crDescr(json, option)
})

const _isQuarter = str => isTokenInStr(str, "Q");

const _isAnnualQuarter = (
  period
) => !_isQuarter(period[0]) && _isQuarter(period[1]);

const _crPoint = (date, y) => [ymdToUTC(date), y];

const _crAqPoint = (date, y) => _isQuarter(date)
  ? _crPoint(date, y)
  : [];


export const crTitle = (
  { title, subtitle },
  json
) => {
  const _subtitle = getSubtitle(json);
  return {
    title: getTitle(json),
    subtitle: _subtitle.length > SUBT_MAX
      ? joinByColon(title, subtitle)
      : _subtitle
  };
}

const _getRecentPoint = (
  arr
) => arr[arr.length-1] || [];

export const crData = (
  json,
  option
) => {
  const { fromDate } = option
  , _xFrom = fromDate
     ? ymdToUTC(fromDate)
     : 0
  , [
     period,
     value
  ] = getPeriodAndValue(json)
  , crPoint = _isAnnualQuarter(period)
     ? _crAqPoint
     : _crPoint;

  let _arrPoint;
  return period.reduce((_data, periodItem, index) => {
    _arrPoint = crPoint(periodItem, value[index]);
    if (_arrPoint[0] > _xFrom
      && isNumber(_arrPoint[1])
      && _arrPoint[0] !== _getRecentPoint(_data)[0]
    ) {
      _data.push(_arrPoint)
    }
    return _data;
  }, []);
}

export const crConfOption = (
  option,
  json
) => ({
  zhConfig: _crZhConfig(option),
  info: _crInfo(json, option)
})
