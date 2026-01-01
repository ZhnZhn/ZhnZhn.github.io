"use strict";

exports.__esModule = true;
exports.crData = exports.addConfOption = void 0;
var _arrFn = require("../../utils/arrFn");
var _isTypeFn = require("../../utils/isTypeFn");
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _crFn = require("../crFn");
const _crItemLink = (0, _crFn.fCrItemLinkByCaption)('ONS Dataset Metadata');
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
const _getTimeObj = dimensions => (dimensions || {}).Time || {};

//Jan-20
const _mmmYyToMls = str => {
  const _arr = str.split('-'),
    _m = MONTH_HM[_arr[0].trim()],
    _yStr = _arr[1].trim(),
    _yPrefix = _yStr < '30' ? '20' : '19';
  return (0, _AdapterFn.ymdToUTC)(`${_yPrefix}${_yStr}-${_m}`);
};

//2010-q1
const _yyyyQqToMls = str => {
  const [_yyyy, _q = ''] = str && str.split('-') || [],
    _mm = QUARTER_HM[_q.trim().toLowerCase()];
  return _yyyy && _mm ? (0, _AdapterFn.ymdToUTC)(`${_yyyy}-${_mm}`) : NaN;
};
const _fCrToMls = observations => {
  const _item = observations[0] || {},
    {
      href
    } = _getTimeObj(_item.dimensions);
  return (href || '').indexOf('yyyy-qq') !== -1 ? _yyyyQqToMls : _mmmYyToMls;
};
const _crName = (_ref, _ref2) => {
  let {
    unit_of_measure
  } = _ref;
  let {
    title,
    subtitle
  } = _ref2;
  return (0, _arrFn.joinByColon)(subtitle, title, unit_of_measure);
};
const _crDescr = _ref3 => {
  let {
    links
  } = _ref3;
  const {
    href
  } = (links || {}).dataset_metadata || {};
  return href ? _crItemLink(href) : '';
};
const _crInfo = (json, option) => ({
  name: _crName(json, option),
  description: _crDescr(json)
});
const crData = json => {
  const {
      observations
    } = json,
    _toMsl = _fCrToMls(observations);
  return observations.reduce((_data, item) => {
    const {
        dimensions,
        observation
      } = item,
      {
        id
      } = _getTimeObj(dimensions),
      _x = _toMsl(id),
      _y = parseFloat(observation);
    if ((0, _isTypeFn.isNumber)(_x) && (0, _isTypeFn.isNumber)(_y)) {
      _data.push([_x, _y]);
    }
    return _data;
  }, []).sort(_compareByFn.compareByDate);
};
exports.crData = crData;
const addConfOption = (option, json) => ({
  info: _crInfo(json, option)
});
exports.addConfOption = addConfOption;
//# sourceMappingURL=fnAdapter.js.map