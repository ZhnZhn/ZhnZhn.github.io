"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _formatAllNumber = _interopRequireDefault(require("../../utils/formatAllNumber"));

var _mathFn = _interopRequireDefault(require("../../math/mathFn"));

var _DateUtils = require("../../utils/DateUtils");

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

const {
  valueMoving
} = _AdapterFn.default;
const _isArr = Array.isArray;

const _isStr = str => typeof str === 'string';

const _isNumber = n => typeof n === 'number' && n - n === 0;

const _crItemCaption = _ref => {
  let {
    dfItemCaption,
    items,
    itemCaption
  } = _ref;
  return _isNumber(dfItemCaption) && _isArr(items) && items[dfItemCaption - 1] ? items[dfItemCaption - 1].caption || itemCaption : itemCaption;
};

const _isStrEqTo = (str, strTo) => _isStr(str) && str.toLowerCase() === strTo;

const _crLinkId = (database_code, dataset_code) => database_code && dataset_code ? database_code + "/" + dataset_code : void 0;

const QuandlFn = {
  valueMoving,
  getData: json => {
    const {
      dataset = {},
      datatable = {}
    } = json;
    return dataset.data || datatable.data || [];
  },
  getColumnNames: json => {
    const {
      dataset,
      datatable
    } = json;

    if (dataset) {
      return dataset.column_names || [];
    }

    if (datatable && _isArr(datatable.columns)) {
      return datatable.columns.map(c => c.name);
    }

    return [];
  },

  isPrevDateAfter(arr, checkedDate, predicate) {
    const length = arr.length;

    if (length === 0) {
      return true;
    }

    const prevDate = arr[length - 1].x;

    if (Math.abs((checkedDate.valueOf() - prevDate.valueOf()) / (24 * 60 * 60 * 1000)) < predicate) {
      return false;
    } else {
      return true;
    }
  },

  createDatasetInfo(_ref2) {
    let {
      dataset
    } = _ref2;

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
  },

  createZhConfig(option) {
    const {
      item,
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
          _dataSource = dataSource ? "Quandl: " + dataSource : 'Quandl',
          _itemCaption = _crItemCaption(option);

    return {
      item,
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
  },

  createPercent(_ref3) {
    let {
      bValue = (0, _big.default)('0.0'),
      bTotal = (0, _big.default)('0.0')
    } = _ref3;
    return _mathFn.default.calcPercent({
      bValue,
      bTotal
    });
  },

  createValueMoving(_ref4) {
    let {
      bNowValue = (0, _big.default)('0.0'),
      bPrevValue = (0, _big.default)('0.0')
    } = _ref4;
    return _mathFn.default.crValueMoving({
      nowValue: bNowValue,
      prevValue: bPrevValue,
      fnFormat: _formatAllNumber.default
    });
  },

  getRecentDate(seria, json) {
    if (seria === void 0) {
      seria = [];
    }

    const len = seria.length,
          {
      dataset = {}
    } = json,
          {
      frequency = ''
    } = dataset,
          mlsUTC = len > 0 && seria[len - 1][0] && _isNumber(seria[len - 1][0]) ? seria[len - 1][0] : '';
    return mlsUTC ? frequency.toLowerCase() === 'annual' ? new Date(mlsUTC).getUTCFullYear() : (0, _DateUtils.mlsToDmy)(mlsUTC) : '';
  },

  setTitleToConfig(config, option) {
    const {
      title,
      subtitle
    } = option || {};
    config.title.text = title || '';
    config.subtitle.text = subtitle ? subtitle + ":" : '';
  },

  findColumnIndex(obj, columnName) {
    if (columnName === void 0) {
      columnName = '';
    }

    const column_names = _isArr(obj) ? obj : QuandlFn.getColumnNames(obj),
          _columnName = columnName.toLowerCase();

    if (_columnName && column_names) {
      for (let i = 0, max = column_names.length; i < max; i++) {
        if (_isStrEqTo(column_names[i], _columnName)) {
          return i;
        }
      }
    }

    return void 0;
  },

  getDataColumnIndex(json, option) {
    const {
      columnName,
      dataColumn
    } = option,
          _dataColumn = QuandlFn.findColumnIndex(json, columnName);

    return _dataColumn || dataColumn || 1;
  }

};
var _default = QuandlFn;
exports.default = _default;
//# sourceMappingURL=QuandlFn.js.map