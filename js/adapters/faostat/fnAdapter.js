"use strict";

exports.__esModule = true;
exports.toInfo = exports.toDataPoints = exports.isSeriesReq = exports.isQueryAllowed = exports.findMinY = exports.crZhConfig = exports.crValueMoving = exports.crTitle = exports.crSubtitle = exports.crSeriaData = exports.crError = exports.crDfItemKey = void 0;
var _fnDescr = require("./fnDescr");
exports.toInfo = _fnDescr.toInfo;
var _AdapterFn = require("../AdapterFn");
exports.getValue = _AdapterFn.getValue;
exports.findMinY = _AdapterFn.findMinY;
exports.crDfItemKey = _AdapterFn.crDfItemKey;
exports.crError = _AdapterFn.crError;
const BLANK = ' ',
  MM_DD = '-12-31',
  DF_TITLE = 'More about data on tab Info in Description',
  _isArr = Array.isArray;
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
const _crHm = (data, prName) => {
  const hm = Object.create(null);
  data.forEach(item => {
    const _itemKey = item[prName];
    if (!hm[_itemKey]) {
      hm[_itemKey] = [];
      hm[_itemKey].seriaName = _itemKey;
    }
    hm[_itemKey].push(_crPoint(item));
  });
  return hm;
};
const _compareByY = (a, b) => b.y - a.y;
const _crRefLegend = hm => {
  const legend = [];
  let propName;
  for (propName in hm) {
    const _arr = hm[propName];
    legend.push({
      ..._arr[_arr.length - 1],
      listPn: propName
    });
  }
  return legend.filter(_AdapterFn.isYNumber).sort(_compareByY);
};
const _hmToPoints = (hm, arr) => arr.map(item => hm[item.listPn]);
const _crSeriesData = (data, prName) => {
  const _hm = _crHm(data, prName),
    _legend = _crRefLegend(_hm);
  return _hmToPoints(_hm, _legend);
};
const _compareByX = (a, b) => a.x - b.x;
const _crSeriaData = (data, option) => _isArr(data) ? data.map(_crPoint).filter(p => (0, _AdapterFn.isNumber)(p.y)).sort(_compareByX) : [];
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
    return dfTitle ? `${dfTitle}: ${title}` : title;
  }
  const {
      data
    } = json,
    p = data[data.length - 1];
  if (p && typeof p === 'object') {
    const {
      Area = '',
      Item = '',
      Element = ''
    } = p;
    return `${Area} ${Item} ${Element}`;
  } else {
    return DF_TITLE;
  }
};
exports.crTitle = crTitle;
const crSubtitle = (json, option) => option.dfSubtitle || `${option.subtitle}: ${_crUnit(json)}`;
exports.crSubtitle = crSubtitle;
const crSeriaData = exports.crSeriaData = _crSeriaData;
const toDataPoints = (json, option) => {
  const _prName = _getSeriesPropName(option),
    _itemCode = (0, _AdapterFn.getValue)(option.items[1]),
    _data = (json.data || []).filter(item => {
      const _itemCodeFao = (item['Item Code (FAO)'] || '').trim();
      return _itemCodeFao ? _itemCodeFao === _itemCode : true;
    });
  return _prName ? _crSeriesData(_data, _prName) : _crSeriaData(_data, option);
};
exports.toDataPoints = toDataPoints;
const crZhConfig = (id, _ref4) => {
  let {
    dfDomain,
    itemCaption
  } = _ref4;
  return {
    id: id,
    key: id,
    isWithoutSma: true,
    dataSource: "FAOSTAT",
    linkFn: "FAO_STAT",
    item: dfDomain,
    itemCaption: itemCaption
  };
};
exports.crZhConfig = crZhConfig;
const crValueMoving = points => (0, _AdapterFn.isArr)(points) && !(0, _AdapterFn.isArr)(points[0]) ? (0, _AdapterFn.valueMoving)(points) : void 0;
exports.crValueMoving = crValueMoving;
const isSeriesReq = exports.isSeriesReq = _getSeriesPropName;
const isQueryAllowed = exports.isQueryAllowed = _isListForList;
//# sourceMappingURL=fnAdapter.js.map