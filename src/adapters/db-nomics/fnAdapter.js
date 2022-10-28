export {
  getValue
} from '../AdapterFn';
export {
  crError
} from '../crFn';

import {
  isNumber,
  joinBy,
  ymdToUTC,
} from '../AdapterFn';
import {
  crItemLink,
  crItemConf
} from '../crFn';
import {
  getPeriodAndValue,
  getTitle,
  getSubtitle,
  getIndexedAt
} from './fnSelector';

export const _assign = Object.assign

const CHART_URL = 'https://db.nomics.world'
, SUBT_MAX = 60;

const _crId = ({
  dfProvider,
  dfCode,
  seriaId
}) =>  joinBy('/', dfProvider, dfCode, seriaId);

const _crItemLink = crItemLink
  .bind(null, 'DB Nomics Chart');
const _crUpdatedDate = json => {
  const _date = getIndexedAt(json).split('T')[0];
  return _date
    ? `<p>Updated by DB Nomics on ${_date}</p>`
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
  } = option
  , _id = _itemKey;
  return {
    id: _id, key: _id,
    itemCaption: title,
    dataSource,
    itemConf: {
       _itemKey: _id,
       ...crItemConf(option),
       dataSource,
       dfProvider, dfCode, seriaId
    }
  }
};
const _crInfo = (json, option) => ({
  name: getSubtitle(json),
  description: _crDescr(json, option)
})


const _isQuarter = str => (""+str).indexOf("Q") !== -1;

const _isAnnualQuarter = period =>
  !_isQuarter(period[0]) && _isQuarter(period[1]);

const _crPoint = (date, y) => ([ymdToUTC(date), y]);

const _crAqPoint = (date, y) => _isQuarter(date)
  ? _crPoint(date, y)
  : [];


export const crTitle = (
  { title, subtitle },
  json
) => {
  const _ = getSubtitle(json)
  , _subtitle = _.length > SUBT_MAX
       ? joinBy(': ', title, subtitle)
       : _;
  return {
    title: getTitle(json),
    subtitle: _subtitle
  };
}

export const crData = (json, option) => {
  const { fromDate } = option
  , data = []
  , _xFrom = fromDate ? ymdToUTC(fromDate) : 0
  , { period, value } = getPeriodAndValue(json)
  , crPoint = _isAnnualQuarter(period)
     ? _crAqPoint
     : _crPoint
  , _len = period.length;
  let _arrPoint;
  for (let i=0; i<_len; i++){
    _arrPoint = crPoint(period[i], value[i]);
    if (_arrPoint[0] > _xFrom && isNumber(_arrPoint[1])) {
      data.push(_arrPoint)
    }
  }
  return data;
}

export const crConfOption = (
  option,
  json
) => ({
  zhConfig: _crZhConfig(option),
  info: _crInfo(json, option)
})
