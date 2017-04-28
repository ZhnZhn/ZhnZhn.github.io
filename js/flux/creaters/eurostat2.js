'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _EuroStatFn = require('../../adapters/eurostat/EuroStatFn');

var _EuroStatFn2 = _interopRequireDefault(_EuroStatFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COUNTRY_CAPTION_DF = 'EU',
    AREA = 'AREA';

var createLoadOptions = function createLoadOptions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var loadId = props.loadId,
      group = props.group,
      one = options.one,
      _options$two = options.two,
      two = _options$two === undefined ? {} : _options$two,
      _options$chartType = options.chartType,
      chartType = _options$chartType === undefined ? {} : _options$chartType,
      date = options.date,
      dateDefault = options.dateDefault,
      _chartType$value = chartType.value,
      chartTypeValue = _chartType$value === undefined ? 'AREA' : _chartType$value,
      _countryValue = one ? one.value : COUNTRY_CAPTION_DF,
      _countryCaption = one ? one.caption : COUNTRY_CAPTION_DF;

  var _zhCompType = undefined,
      _time = undefined,
      _mapValue = two.mapValue,
      _mapSlice = two.mapSlice;

  if (chartType && chartType.value !== AREA) {
    _zhCompType = chartType.compType;
    _time = date ? date.value : dateDefault;

    if (!_mapValue) {
      _mapValue = _EuroStatFn2.default.createMapValue(props, two);
    }
    if (!_mapSlice) {
      _mapSlice = _EuroStatFn2.default.createMapSlice(props, two);
    }
  }

  return {
    geo: _countryValue,
    group: group,
    metric: two.value,
    loadId: loadId,
    itemCaption: _countryCaption,
    title: _countryCaption,
    subtitle: two.caption,
    alertItemId: _countryCaption + ':' + two.caption,
    alertGeo: _countryCaption,
    alertMetric: two.caption,
    seriaType: chartTypeValue,
    zhCompType: _zhCompType,
    mapValue: _mapValue,
    zhMapSlice: (0, _extends3.default)({}, _mapSlice, { time: _time }),
    time: _time
  };
};

exports.default = createLoadOptions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\creaters\eurostat2.js.map