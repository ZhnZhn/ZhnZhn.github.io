'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
      chartType = options.chartType,
      date = options.date,
      dateDefault = options.dateDefault,
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
    zhCompType: _zhCompType,
    mapValue: _mapValue,
    zhMapSlice: _extends({}, _mapSlice, { time: _time }),
    time: _time
  };
};

exports.default = createLoadOptions;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\creaters\eurostat2.js.map