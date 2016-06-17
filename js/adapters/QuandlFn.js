'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fnSetTitleToConfig = exports.fnCreateValueMovingFromSeria = exports.fnCreateValueMoving = exports.fnCreatePercent = exports.fnCreateZhConfig = exports.fnCreateDatasetInfo = undefined;

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _Type = require('../constants/Type');

var _ChartConfig = require('../constants/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnCreateDatasetInfo = exports.fnCreateDatasetInfo = function fnCreateDatasetInfo(json) {
  var dataset = json.dataset;
  return {
    name: dataset.name,
    description: dataset.description,
    newest_available_date: dataset.newest_available_date,
    oldest_available_date: dataset.oldest_available_date,
    frequency: dataset.frequency
  };
};

var fnCreateZhConfig = exports.fnCreateZhConfig = function fnCreateZhConfig(option) {
  return {
    id: option.value,
    dataColumn: option.dataColumn,
    itemCaption: option.itemCaption
  };
};

var fnCreatePercent = exports.fnCreatePercent = function fnCreatePercent(_ref) {
  var _ref$bValue = _ref.bValue;
  var bValue = _ref$bValue === undefined ? (0, _big2.default)('0.0') : _ref$bValue;
  var _ref$bTotal = _ref.bTotal;
  var bTotal = _ref$bTotal === undefined ? (0, _big2.default)('0.0') : _ref$bTotal;

  return !bTotal.eq((0, _big2.default)(0.0)) ? bValue.times(100).div(bTotal).abs().toFixed(2) : (0, _big2.default)(0.0);
};

var fnCreateValueMoving = exports.fnCreateValueMoving = function fnCreateValueMoving(_ref2) {
  var _ref2$bNowValue = _ref2.bNowValue;
  var bNowValue = _ref2$bNowValue === undefined ? (0, _big2.default)('0.0') : _ref2$bNowValue;
  var _ref2$bPrevValue = _ref2.bPrevValue;
  var bPrevValue = _ref2$bPrevValue === undefined ? (0, _big2.default)('0.0') : _ref2$bPrevValue;


  var _bDelta = bPrevValue.minus(bNowValue),
      _bPercent = fnCreatePercent({ bValue: _bDelta, bTotal: bPrevValue });

  var _direction = void 0;
  if (_bDelta.gt(0.0)) {
    _direction = _Type.Direction.DOWN;
  } else if (!_bDelta.gte(0.0)) {
    _direction = _Type.Direction.UP;
  } else {
    _direction = _Type.Direction.EQUAL;
  }

  return {
    value: _ChartConfig2.default.fnNumberFormat(bNowValue),
    delta: _ChartConfig2.default.fnNumberFormat(_bDelta.abs().toString()),
    percent: _bPercent.toString() + '%',
    direction: _direction
  };
};

var fnCreateValueMovingFromSeria = exports.fnCreateValueMovingFromSeria = function fnCreateValueMovingFromSeria(seria) {
  var len = seria.length,
      bNowValue = len > 0 ? seria[len - 1][1] ? seria[len - 1][1] : '0.0' : '0.0',
      bPrevValue = len > 1 ? seria[len - 2][1] ? (0, _big2.default)(seria[len - 2][1]) : (0, _big2.default)(0.0) : (0, _big2.default)(0.0);

  return fnCreateValueMoving({ bNowValue: bNowValue, bPrevValue: bPrevValue });
};

var fnSetTitleToConfig = exports.fnSetTitleToConfig = function fnSetTitleToConfig() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var title = option.title;
  var subtitle = option.subtitle;

  config.title.text = title ? title : '';
  config.subtitle.text = subtitle ? subtitle + ':' : '';
};
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\QuandlFn.js.map