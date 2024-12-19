"use strict";

exports.__esModule = true;
exports.valueMoving = exports.getItemIndexTuple = exports.getData = exports.crZhConfig = exports.crValueMoving = void 0;
var _AdapterFn = require("../AdapterFn");
exports.valueMoving = _AdapterFn.valueMoving;
exports.crValueMoving = _AdapterFn.crValueMoving;
var _CategoryFn = require("../CategoryFn");
const _crItemCaption = _ref => {
  let {
    dfItemCaption,
    items,
    itemCaption
  } = _ref;
  return (0, _AdapterFn.isNumber)(dfItemCaption) && (0, _AdapterFn.isArr)(items) && items[dfItemCaption - 1] ? items[dfItemCaption - 1].caption || itemCaption : itemCaption;
};
const _getData = obj => obj.data || [];
const getItemIndexTuple = columns => {
  let dateIndex = 0,
    valueIndex = 1;
  const _columns = (0, _AdapterFn.isArr)(columns) ? columns : [];
  for (let i = 0; i < _columns.length; i++) {
    const {
      name
    } = columns[i] || {};
    if (name === "date") {
      dateIndex = i;
    }
    if (name === "value") {
      valueIndex = i;
    }
  }
  return [dateIndex, valueIndex];
};
exports.getItemIndexTuple = getItemIndexTuple;
const getData = function (_ref2, _temp) {
  let {
    datatable
  } = _ref2;
  let {
    dfCi,
    seriaType
  } = _temp === void 0 ? {} : _temp;
  if (datatable) {
    const [dateIndex, valueIndex] = getItemIndexTuple(datatable.columns),
      _dateIndex = (0, _CategoryFn.isCategory)(seriaType) && (0, _AdapterFn.isNumber)(dfCi) ? dfCi : dateIndex;
    return _getData(datatable).map(arrItem => [arrItem[_dateIndex], parseFloat(arrItem[valueIndex])]);
  }
  return [];
};
exports.getData = getData;
const crZhConfig = option => {
  const {
      item,
      items,
      title,
      subtitle = "",
      key,
      fromDate,
      dataSource
    } = option,
    _itemCaption = _crItemCaption(option),
    _item = (0, _AdapterFn.isArr)(items) ? items[0] : item || {};
  return {
    item: _item,
    title,
    subtitle,
    id: key,
    key,
    itemConf: {
      _itemKey: key,
      fromDate
    },
    itemCaption: _itemCaption,
    dataSource
  };
};
exports.crZhConfig = crZhConfig;
//# sourceMappingURL=NdlFn.js.map