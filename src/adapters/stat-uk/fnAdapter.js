import { joinByColon } from '../../utils/arrFn';
import {
  isNumber,
  ymdToUTC
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import { fCrItemLinkByCaption } from '../crFn';

const _crItemLink = fCrItemLinkByCaption('ONS Dataset Metadata');

const MONTH_HM = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12'
};

const QUARTER_HM = {
  q1: "03",
  q2: "06",
  q3: "09",
  q4: "12"
};

const _getTimeObj = dimensions => (dimensions || {})
  .Time || {};

//Jan-20
const _mmmYyToMls = str => {
  const _arr = str.split('-')
  , _m = MONTH_HM[_arr[0].trim()]
  , _yStr = _arr[1].trim()
  , _yPrefix = _yStr < '30' ? '20' : '19';
  return ymdToUTC(`${_yPrefix}${_yStr}-${_m}`);
}

//2010-q1
const _yyyyQqToMls = str => {
  const [
    _yyyy,
    _q=''
  ] = str && str.split('-') || []
  , _mm = QUARTER_HM[_q.trim().toLowerCase()];
  return _yyyy && _mm
    ? ymdToUTC(`${_yyyy}-${_mm}`)
    : NaN;
}

const _fCrToMls = observations => {
  const _item = observations[0] || {}
  , { href } = _getTimeObj(_item.dimensions)
  return (href || '').indexOf('yyyy-qq') !== -1
    ? _yyyyQqToMls
    : _mmmYyToMls;
}

const _crName = (
 { unit_of_measure }, {
   title,
   subtitle
}) => joinByColon(subtitle, title, unit_of_measure);

const _crDescr = ({
  links
}) => {
  const {
    href
  } = (links || {}).dataset_metadata || {};
  return href ? _crItemLink(href) : '';
}

const _crInfo = (
  json,
  option
) => ({
  name: _crName(json, option),
  description: _crDescr(json)
})


export const crData = (
  json
) => {
  const { observations } = json
  , _toMsl = _fCrToMls(observations);
  return observations.reduce((_data, item) => {
     const { dimensions, observation } = item
     , { id } = _getTimeObj(dimensions)
     , _x = _toMsl(id)
     , _y = parseFloat(observation);
     if (isNumber(_x) && isNumber(_y)) {
       _data.push([_x, _y])
     }
     return _data;
  }, []).sort(compareByDate);
}

export const addConfOption = (
  option,
  json
) => ({
  info: _crInfo(json, option)
})
