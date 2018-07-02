'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _dompurify = require('dompurify');

var _dompurify2 = _interopRequireDefault(_dompurify);

var _mathFn = require('../../math/mathFn');

var _mathFn2 = _interopRequireDefault(_mathFn);

var _DateUtils = require('../../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _Type = require('../../constants/Type');

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuandlFn2 = {
  getData: function getData(json) {
    var _json$dataset = json.dataset,
        dataset = _json$dataset === undefined ? {} : _json$dataset,
        _json$datatable = json.datatable,
        datatable = _json$datatable === undefined ? {} : _json$datatable;

    return dataset.data || datatable.data || [];
  },

  getColumnNames: function getColumnNames(json) {
    var dataset = json.dataset,
        datatable = json.datatable;

    if (dataset) {
      return dataset.column_names || [];
    }
    if (datatable && Array.isArray(datatable.columns)) {
      return datatable.columns.map(function (c) {
        return c.name;
      });
    }
    return [];
  },

  isPrevDateAfter: function isPrevDateAfter(arr, checkedDate, predicate) {
    var length = arr.length;
    if (length === 0) {
      return true;
    }
    var prevDate = arr[length - 1].x;
    if (Math.abs((checkedDate.valueOf() - prevDate.valueOf()) / (24 * 60 * 60 * 1000)) < predicate) {
      return false;
    } else {
      return true;
    }
  },
  createDatasetInfo: function createDatasetInfo(json) {
    var _json$dataset2 = json.dataset,
        dataset = _json$dataset2 === undefined ? {} : _json$dataset2,
        _dataset$name = dataset.name,
        name = _dataset$name === undefined ? '' : _dataset$name,
        _dataset$description = dataset.description,
        description = _dataset$description === undefined ? '' : _dataset$description,
        _dataset$newest_avail = dataset.newest_available_date,
        newest_available_date = _dataset$newest_avail === undefined ? '' : _dataset$newest_avail,
        _dataset$oldest_avail = dataset.oldest_available_date,
        oldest_available_date = _dataset$oldest_avail === undefined ? '' : _dataset$oldest_avail,
        _dataset$frequency = dataset.frequency,
        frequency = _dataset$frequency === undefined ? '' : _dataset$frequency,
        _dataset$database_cod = dataset.database_code,
        database_code = _dataset$database_cod === undefined ? '' : _dataset$database_cod,
        _dataset$dataset_code = dataset.dataset_code,
        dataset_code = _dataset$dataset_code === undefined ? '' : _dataset$dataset_code,
        _description = _dompurify2.default.sanitize(description);

    return {
      name: name,
      newest_available_date: newest_available_date,
      oldest_available_date: oldest_available_date,
      frequency: frequency,
      database_code: database_code, dataset_code: dataset_code,
      description: _description
    };
  },
  createZhConfig: function createZhConfig(option) {
    var item = option.item,
        title = option.title,
        _option$subtitle = option.subtitle,
        subtitle = _option$subtitle === undefined ? '' : _option$subtitle,
        id = option.value,
        key = option.key,
        columnName = option.columnName,
        dataColumn = option.dataColumn,
        itemCaption = option.itemCaption,
        fromDate = option.fromDate,
        seriaColumnNames = option.seriaColumnNames,
        linkFn = option.linkFn,
        dataSource = option.dataSource,
        _dataSource = dataSource ? 'Quandl: ' + dataSource : 'Quandl';

    return {
      item: item,
      title: title, subtitle: subtitle,
      id: id, key: key,
      columnName: columnName, dataColumn: dataColumn, itemCaption: itemCaption,
      fromDate: fromDate, seriaColumnNames: seriaColumnNames,
      linkFn: linkFn,
      dataSource: _dataSource
    };
  },
  createPercent: function createPercent(_ref) {
    var _ref$bValue = _ref.bValue,
        bValue = _ref$bValue === undefined ? (0, _big2.default)('0.0') : _ref$bValue,
        _ref$bTotal = _ref.bTotal,
        bTotal = _ref$bTotal === undefined ? (0, _big2.default)('0.0') : _ref$bTotal;

    return _mathFn2.default.calcPercent({ bValue: bValue, bTotal: bTotal });
  },
  createValueMoving: function createValueMoving(_ref2) {
    var _ref2$bNowValue = _ref2.bNowValue,
        bNowValue = _ref2$bNowValue === undefined ? (0, _big2.default)('0.0') : _ref2$bNowValue,
        _ref2$bPrevValue = _ref2.bPrevValue,
        bPrevValue = _ref2$bPrevValue === undefined ? (0, _big2.default)('0.0') : _ref2$bPrevValue;

    return _mathFn2.default.crValueMoving({
      nowValue: bNowValue,
      prevValue: bPrevValue,
      Direction: _Type.Direction,
      fnFormat: _ChartConfig2.default.fnNumberFormat
    });
  },
  getRecentDate: function getRecentDate() {
    var seria = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var json = arguments[1];
    var len = seria.length,
        _json$dataset3 = json.dataset,
        dataset = _json$dataset3 === undefined ? {} : _json$dataset3,
        _dataset$frequency2 = dataset.frequency,
        frequency = _dataset$frequency2 === undefined ? '' : _dataset$frequency2,
        millisUTC = len > 0 && seria[len - 1][0] && typeof seria[len - 1][0] === 'number' ? seria[len - 1][0] : '',
        d = millisUTC ? frequency.toLowerCase() === 'annual' ? new Date(millisUTC).getUTCFullYear() : _DateUtils2.default.formatTo(millisUTC) : '';

    return d;
  },
  setTitleToConfig: function setTitleToConfig() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var title = option.title,
        subtitle = option.subtitle;

    config.title.text = title ? title : '';
    config.subtitle.text = subtitle ? subtitle + ':' : '';
  },
  findColumnIndex: function findColumnIndex(obj) {
    var columnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var column_names = Array.isArray(obj) ? obj : QuandlFn2.getColumnNames(obj)
    /*
    : obj.dataset.column_names
         ? obj.dataset.column_names
         : []
     */
    ,
        _columnName = columnName.toLowerCase();

    if (columnName && column_names) {
      for (var i = 0, max = column_names.length; i < max; i++) {
        if (typeof column_names[i] === 'string' && column_names[i].toLowerCase() === _columnName) {
          return i;
        }
      }
    }
    return undefined;
  },
  getDataColumnIndex: function getDataColumnIndex(json, option) {
    var columnName = option.columnName,
        dataColumn = option.dataColumn,
        _dataColumn = this.findColumnIndex(json, columnName),
        _columnIndex = _dataColumn ? _dataColumn : dataColumn ? dataColumn : 1;

    return _columnIndex;
  }
};

exports.default = QuandlFn2;
//# sourceMappingURL=QuandlFn2.js.map