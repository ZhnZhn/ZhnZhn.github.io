"use strict";

exports.__esModule = true;
exports.toInfo = exports.toDataPoints = exports.isSeriesReq = exports.isQueryAllowed = exports.crZhConfig = exports.crValueMoving = exports.crTitle = exports.crSubtitle = exports.crCategoryTitle = void 0;
var _fnDescr = require("./fnDescr");
exports.toInfo = _fnDescr.toInfo;
var _isTypeFn = require("../../utils/isTypeFn");
var _arrFn = require("../../utils/arrFn");
var _AdapterFn = require("../AdapterFn");
const BLANK = ' ',
  MM_DD = '-12-31',
  DF_TITLE = 'More about data on tab Info in Description',
  _createObject = () => Object.create(null);
const _crUnit = json => {
  const {
      data
    } = json,
    item = data[data.length - 1] || {},
    _unit = item.Unit === void 0 ? _fnDescr.DATASET_EMPTY : item.Unit || BLANK;
  return (0, _AdapterFn.toUpperCaseFirst)(_unit);
};
const _crPoint = _ref => {
  let {
    Year,
    Months,
    Value
  } = _ref;
  const m = Months ? (0, _AdapterFn.monthIndex)(Months) + 1 : 0,
    Tail = m !== 0 ? `-${m}` : MM_DD;
  return {
    x: (0, _AdapterFn.ymdToUTC)('' + Year + Tail),
    y: parseFloat(Value)
  };
};
const _crHm = (data, prName) => data.reduce((hm, item) => {
  const _itemKey = item[prName];
  if (!hm[_itemKey]) {
    hm[_itemKey] = [];
    hm[_itemKey].seriaName = _itemKey;
  }
  hm[_itemKey].push(_crPoint(item));
  return hm;
}, _createObject());
const _compareByY = (a, b) => b.y - a.y;
const _crRefLegend = hm => (0, _isTypeFn.getObjectKeys)(hm).map(propName => {
  const _arr = hm[propName];
  return {
    ..._arr[_arr.length - 1],
    listPn: propName
  };
}).filter(_AdapterFn.isYNumber).sort(_compareByY);
const _hmToPoints = (hm, arr) => arr.map(item => hm[item.listPn]);
const _getNotEmptySeriaIndex = _data => {
  for (let i = 0; i < _data.length; i++) {
    const _seria = _data[_data.length - 1 - i];
    for (let j = 0; j < _seria.length; j++) {
      if (_seria[j].y !== 0) return _data.length - 1 - i;
    }
  }
};
const _crSeriesData = (data, prName) => {
  const _hm = _crHm(data, prName),
    _legend = _crRefLegend(_hm),
    _data = _hmToPoints(_hm, _legend),
    _notEmptyIndex = _getNotEmptySeriaIndex(_data);
  return (0, _AdapterFn.addSeriesDataTypeTo)(_data.slice(0, _notEmptyIndex + 1));
};
const _compareByX = (a, b) => a.x - b.x;
const _crSeriaData = (data, option) => (0, _isTypeFn.isArr)(data) ? data.map(_crPoint).filter(p => (0, _isTypeFn.isNumber)(p.y)).sort(_compareByX) : [];
const _isItemList = item => (0, _AdapterFn.getValue)(item).indexOf('>') !== -1;
const _getSeriesPropName = _ref2 => {
  let {
    items
  } = _ref2;
  return _isItemList(items[0]) ? 'Area' : _isItemList(items[1]) ? 'Item' : void 0;
};
const _isListForList = _ref3 => {
  let {
    items
  } = _ref3;
  return _isItemList(items[0]) && _isItemList(items[1]);
};
const crTitle = (json, option) => {
  const {
    title,
    dfTitle,
    dfSubtitle,
    subtitle
  } = option;
  if (dfSubtitle) {
    return `${subtitle} ${_crUnit(json)}: ${title}`;
  }
  if (title) {
    return (0, _arrFn.joinByColon)(dfTitle, title);
  }
  const {
      data
    } = json,
    p = data[data.length - 1];
  return (0, _isTypeFn.isObj)(p) ? (0, _arrFn.joinByBlank)(p.Area, p.Item, p.Element) : DF_TITLE;
};
exports.crTitle = crTitle;
const crSubtitle = (json, option) => option.dfSubtitle || `${option.subtitle}: ${_crUnit(json)}`;
exports.crSubtitle = crSubtitle;
const toDataPoints = (json, option) => {
  const _prName = _getSeriesPropName(option),
    _itemCode = (0, _AdapterFn.getValue)(option.items[1]),
    _data = json.data.filter(item => {
      const _itemCodeFao = (item['Item Code (FAO)'] || '').trim();
      return _itemCodeFao ? _itemCodeFao === _itemCode : true;
    });
  return _prName ? _crSeriesData(_data, _prName) : _crSeriaData(_data, option);
};
exports.toDataPoints = toDataPoints;
const crZhConfig = _ref4 => {
  let {
    itemCaption
  } = _ref4;
  return {
    isWithoutSma: true,
    dataSource: "FAOSTAT",
    itemCaption
  };
};
exports.crZhConfig = crZhConfig;
const crValueMoving = points => (0, _isTypeFn.isArr)(points) && !(0, _isTypeFn.isArr)(points[0]) ? (0, _AdapterFn.valueMoving)(points) : void 0;
exports.crValueMoving = crValueMoving;
const isSeriesReq = exports.isSeriesReq = _getSeriesPropName;
const isQueryAllowed = exports.isQueryAllowed = _isListForList;
const crCategoryTitle = (title, json) => {
  const _unit = (json.data[0] || {}).Unit;
  return (0, _arrFn.joinByComma)(title, (0, _isTypeFn.isStr)(_unit) ? _unit.length > 2 ? _unit : _unit.toUpperCase() : '');
};
exports.crCategoryTitle = crCategoryTitle;
//# sourceMappingURL=fnAdapter.js.map