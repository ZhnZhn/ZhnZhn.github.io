'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _purify = require('purify');

var _purify2 = _interopRequireDefault(_purify);

var _DateUtils = require('../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _Type = require('../constants/Type');

var _ChartConfig = require('../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuandlFn2 = {
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
    var _json$dataset = json.dataset,
        dataset = _json$dataset === undefined ? {} : _json$dataset,
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
        _description = _purify2.default.sanitize(description);

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
    //console.log('createZhConfig');
    //console.log(option);
    return {
      item: option.stock,
      title: option.title,
      subtitle: option.subtitle ? option.subtitle : '',
      id: option.value,
      key: option.key,
      columnName: option.columnName,
      dataColumn: option.dataColumn,
      itemCaption: option.itemCaption,
      fromDate: option.fromDate,
      seriaColumnNames: option.seriaColumnNames,
      linkFn: option.linkFn,
      limitRemaining: option.limitRemaining
    };
  },
  createPercent: function createPercent(_ref) {
    var _ref$bValue = _ref.bValue,
        bValue = _ref$bValue === undefined ? (0, _big2.default)('0.0') : _ref$bValue,
        _ref$bTotal = _ref.bTotal,
        bTotal = _ref$bTotal === undefined ? (0, _big2.default)('0.0') : _ref$bTotal;

    return !bTotal.eq((0, _big2.default)(0.0)) ? bValue.times(100).div(bTotal).abs().toFixed(2) : (0, _big2.default)(0.0);
  },
  createValueMoving: function createValueMoving(_ref2) {
    var _ref2$bNowValue = _ref2.bNowValue,
        bNowValue = _ref2$bNowValue === undefined ? (0, _big2.default)('0.0') : _ref2$bNowValue,
        _ref2$bPrevValue = _ref2.bPrevValue,
        bPrevValue = _ref2$bPrevValue === undefined ? (0, _big2.default)('0.0') : _ref2$bPrevValue;


    var _bDelta = bPrevValue.minus(bNowValue),
        _direction = void 0;
    if (_bDelta.gt(0.0)) {
      _direction = _Type.Direction.DOWN;
    } else if (!_bDelta.gte(0.0)) {
      _direction = _Type.Direction.UP;
    } else {
      _direction = _Type.Direction.EQUAL;
    }

    _bDelta = _bDelta.abs().round(4);

    var _bPercent = this.createPercent({ bValue: _bDelta, bTotal: bPrevValue });

    var _bNowValue = (0, _big2.default)(bNowValue).round(4);
    if (_bNowValue.gt('1000000')) {
      _bNowValue = bNowValue.toFixed(0);
      _bDelta = _bDelta.toFixed(0);
    }

    return {
      value: _ChartConfig2.default.fnNumberFormat(_bNowValue),
      delta: _ChartConfig2.default.fnNumberFormat(_bDelta),
      percent: _bPercent.toString() + '%',
      direction: _direction
    };
  },
  createValueMovingFromSeria: function createValueMovingFromSeria(seria) {
    var len = seria.length,
        bNowValue = len > 0 ? seria[len - 1][1] ? seria[len - 1][1] : '0.0' : '0.0',
        bPrevValue = len > 1 ? seria[len - 2][1] ? (0, _big2.default)(seria[len - 2][1]) : (0, _big2.default)(0.0) : (0, _big2.default)(0.0),
        date = len > 0 ? _DateUtils2.default.formatTo(seria[len - 1][0]) : '';

    return _extends({}, this.createValueMoving({ bNowValue: bNowValue, bPrevValue: bPrevValue }), { date: date });
  },
  getRecentDate: function getRecentDate() {
    var seria = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var json = arguments[1];
    var len = seria.length,
        _json$dataset2 = json.dataset,
        dataset = _json$dataset2 === undefined ? {} : _json$dataset2,
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

    var column_names = Array.isArray(obj) ? obj : obj.dataset.column_names ? obj.dataset.column_names : [],
        _columnName = columnName.toLowerCase();

    if (columnName && column_names) {
      for (var i = 0, max = column_names.length; i < max; i++) {
        if (column_names[i].toLowerCase() === _columnName) {
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
  },
  findMinY: function findMinY() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var minY = Number.POSITIVE_INFINITY;
    for (var i = 0, max = data.length; i < max; i++) {
      if (data[i][1] < minY) {
        minY = data[i][1];
      }
    }

    if (minY !== Number.POSITIVE_INFINITY) {
      return minY;
    } else {
      return undefined;
    }
  }
};

exports.default = QuandlFn2;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\QuandlFn2.js.map