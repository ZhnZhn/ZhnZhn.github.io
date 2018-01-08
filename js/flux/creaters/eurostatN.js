'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COUNTRY_CAPTION_DF = 'EU',
    AREA = 'AREA';

var createLoadOptions = function createLoadOptions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var loadId = props.loadId,
      group = props.group,
      dataSource = props.dataSource,
      dfProps = props.dfProps,
      items = options.items,
      _options$chartType = options.chartType,
      chartType = _options$chartType === undefined ? {} : _options$chartType,
      date = options.date,
      dateDefault = options.dateDefault,
      selectOptions = options.selectOptions,
      _chartType$value = chartType.value,
      chartTypeValue = _chartType$value === undefined ? 'AREA' : _chartType$value,
      _countryValue = items[0] ? items[0].value : COUNTRY_CAPTION_DF,
      _countryCaption = items[0] ? items[0].caption : COUNTRY_CAPTION_DF;

  var _zhCompType = undefined,
      _time = undefined;

  if (chartType && chartType.value !== AREA) {
    _zhCompType = chartType.compType;
    _time = date ? date.value : dateDefault;
  }

  return (0, _extends3.default)({}, dfProps, {
    geo: _countryValue,
    group: group,
    metric: items[1] ? items[1].value : undefined,
    loadId: loadId,
    itemCaption: _countryCaption,
    title: _countryCaption,
    subtitle: items[1] ? items[1].caption : undefined,
    alertGeo: _countryCaption,
    seriaType: chartTypeValue,
    zhCompType: _zhCompType,
    time: _time,
    dataSource: dataSource,
    items: items,
    selectOptions: selectOptions
  });
};

exports.default = createLoadOptions;
//# sourceMappingURL=eurostatN.js.map