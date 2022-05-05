import AdapterFn from '../AdapterFn'
import { compareByDate } from '../compareByFn';
import { crError, crItemLink } from '../crFn';

const {
  getValue,
  ymdToUTC,
  joinBy
} = AdapterFn

const _crItemLink = crItemLink.bind(null, 'ONS Dataset Metadata');

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
}

const QUARTER_HM = {
  q1: "03",
  q2: "06",
  q3: "09",
  q4: "12"
}

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
  const [ _yyyy, _q='' ] = str && str.split('-') || []
  , _mm = QUARTER_HM[_q.trim().toLowerCase()];
  return _yyyy && _mm
    ? ymdToUTC(`${_yyyy}-${_mm}`)
    : NaN;
}

const _fCrToMls = observations => {
  const _item = observations[0] || {}
  , { href='' } = _getTimeObj(_item.dimensions)
  return href.indexOf('yyyy-qq') !== -1
    ? _yyyyQqToMls
    : _mmmYyToMls;
}

const _isNumber = n => typeof n === 'number'
 && (n-n===0);

const _crName = ({ unit_of_measure }, { title, subtitle }) =>
  joinBy(': ', subtitle, title, unit_of_measure);

const _crDescr = ({ links }) => {
  const { href } = (links || {}).dataset_metadata || {};
  return href ? _crItemLink(href) : '';
}

const _crInfo = (json, option) => ({
  name: _crName(json, option),
  description: _crDescr(json)
})


const fnAdapter = {
  getValue,
  crError,

  crData: (json) => {
    const _data = []
    , { observations } = json
    , _toMsl = _fCrToMls(observations);
    let i=0;
    for (;i<observations.length; i++){
      const item = observations[i]
      , { dimensions, observation } = item
      , { id } = _getTimeObj(dimensions)
      , _x = _toMsl(id)
      , _y = parseFloat(observation)
      if (_isNumber(_x) && _isNumber(_y)) {
        _data.push([_x, _y])
      }
    }
    return _data.sort(compareByDate);
  },
  addConfOption: (option, json) => ({
    info: _crInfo(json, option)
  })
}

export default fnAdapter
