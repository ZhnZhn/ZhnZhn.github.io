"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.valueMoving = exports.sortDescByPnY = exports.setTitleToConfig = exports.isPrevDateAfter = exports.getRecentDate = exports.getDataColumnIndex = exports.getData = exports.getColumnNames = exports.findColumnIndex = exports.crZhConfig = exports.crValueMoving = exports.crPercent = exports.crDatasetInfo = void 0;
var _AdapterFn = require("../AdapterFn");
exports.valueMoving = _AdapterFn.valueMoving;
var _compareByFn = require("../compareByFn");
exports.sortDescByPnY = _compareByFn.sortDescByPnY;
var _big = _interopRequireDefault(require("big.js"));
var _formatAllNumber = _interopRequireDefault(require("../../utils/formatAllNumber"));
var _mathFn = require("../../math/mathFn");
const _isStr = str => typeof str === 'string';
const _crItemCaption = _ref => {
  let {
    dfItemCaption,
    items,
    itemCaption
  } = _ref;
  return (0, _AdapterFn.isNumber)(dfItemCaption) && (0, _AdapterFn.isArr)(items) && items[dfItemCaption - 1] ? items[dfItemCaption - 1].caption || itemCaption : itemCaption;
};
const _isStrEqTo = (str, strTo) => _isStr(str) && str.toLowerCase() === strTo;
const _crLinkId = (database_code, dataset_code) => database_code && dataset_code ? database_code + "/" + dataset_code : void 0;
const _getData = obj => obj.data || [];
const getData = _ref2 => {
  let {
    dataset,
    datatable
  } = _ref2;
  if (dataset) {
    return _getData(dataset);
  }
  if (datatable) {
    return _getData(datatable).map(arrItem => [arrItem[arrItem.length - 2], arrItem[arrItem.length - 1]]);
  }
  return [];
};
exports.getData = getData;
const getColumnNames = _ref3 => {
  let {
    dataset,
    datatable
  } = _ref3;
  return dataset ? dataset.column_names || [] : datatable && (0, _AdapterFn.isArr)(datatable.columns) ? datatable.columns.map(c => c.name) : [];
};
exports.getColumnNames = getColumnNames;
const isPrevDateAfter = (arr, checkedDate, predicate) => {
  const length = arr.length;
  if (length === 0) {
    return true;
  }
  const prevDate = arr[length - 1].x;
  return !(Math.abs((checkedDate.valueOf() - prevDate.valueOf()) / (24 * 60 * 60 * 1000)) < predicate);
};
exports.isPrevDateAfter = isPrevDateAfter;
const crDatasetInfo = _ref4 => {
  let {
    dataset
  } = _ref4;
  const {
      name,
      description,
      newest_available_date,
      oldest_available_date,
      frequency,
      database_code,
      dataset_code
    } = dataset || {},
    linkId = _crLinkId(database_code, dataset_code);
  return {
    name,
    toDate: newest_available_date,
    fromDate: oldest_available_date,
    frequency,
    linkId,
    description
  };
};
exports.crDatasetInfo = crDatasetInfo;
const DATA_SOURCE = 'Nasdaq Data Link';
const crZhConfig = option => {
  const {
      item,
      items,
      title,
      subtitle = '',
      value: id,
      key,
      columnName,
      dataColumn,
      fromDate,
      seriaColumnNames,
      linkFn,
      dataSource
    } = option,
    _dataSource = (0, _AdapterFn.joinBy)(' ', DATA_SOURCE, dataSource),
    _itemCaption = _crItemCaption(option);
  return {
    item: (0, _AdapterFn.isArr)(items) ? items[0] : item,
    title,
    subtitle,
    id,
    key,
    linkFn,
    itemConf: {
      _itemKey: id,
      columnName,
      dataColumn,
      fromDate,
      seriaColumnNames
    },
    itemCaption: _itemCaption,
    dataSource: _dataSource
  };
};
exports.crZhConfig = crZhConfig;
const crPercent = exports.crPercent = _mathFn.calcPercent;
const crValueMoving = _ref5 => {
  let {
    bNowValue = (0, _big.default)('0.0'),
    bPrevValue = (0, _big.default)('0.0')
  } = _ref5;
  return (0, _mathFn.crValueMoving)({
    nowValue: bNowValue,
    prevValue: bPrevValue,
    fnFormat: _formatAllNumber.default
  });
};
exports.crValueMoving = crValueMoving;
const getRecentDate = (seria, json) => {
  const len = (seria || []).length,
    {
      dataset
    } = json,
    {
      frequency = ''
    } = dataset || {},
    mlsUTC = len > 0 && seria[len - 1][0] && (0, _AdapterFn.isNumber)(seria[len - 1][0]) ? seria[len - 1][0] : '';
  return mlsUTC ? frequency.toLowerCase() === 'annual' ? new Date(mlsUTC).getUTCFullYear() : (0, _AdapterFn.mlsToDmy)(mlsUTC) : '';
};
exports.getRecentDate = getRecentDate;
const setTitleToConfig = (config, option) => {
  const {
    title,
    subtitle
  } = option || {};
  config.title.text = title || '';
  config.subtitle.text = subtitle ? subtitle + ":" : '';
};
exports.setTitleToConfig = setTitleToConfig;
const findColumnIndex = function (obj, columnName) {
  if (columnName === void 0) {
    columnName = '';
  }
  const column_names = (0, _AdapterFn.isArr)(obj) ? obj : getColumnNames(obj),
    _columnName = columnName.toLowerCase();
  if (_columnName && column_names) {
    for (let i = 0, max = column_names.length; i < max; i++) {
      if (_isStrEqTo(column_names[i], _columnName)) {
        return i;
      }
    }
  }
  return;
};
exports.findColumnIndex = findColumnIndex;
const getDataColumnIndex = (json, option) => {
  const {
      columnName,
      dataColumn
    } = option,
    _dataColumn = findColumnIndex(json, columnName);
  return _dataColumn || dataColumn || 1;
};
exports.getDataColumnIndex = getDataColumnIndex;
//# sourceMappingURL=NdlFn.js.map