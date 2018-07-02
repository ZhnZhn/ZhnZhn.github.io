'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DF_CAPTION = 'EU',
    AREA = 'AREA';

var createLoadOptions = function createLoadOptions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var loadId = props.loadId,
      dataSource = props.dataSource,
      dfProps = props.dfProps,
      one = options.one,
      _options$two = options.two,
      two = _options$two === undefined ? {} : _options$two,
      _options$chartType = options.chartType,
      chartType = _options$chartType === undefined ? {} : _options$chartType,
      date = options.date,
      dateDefault = options.dateDefault,
      selectOptions = options.selectOptions,
      _chartType$value = chartType.value,
      _seriaType = _chartType$value === undefined ? AREA : _chartType$value,
      _oneV = one ? one.value : DF_CAPTION,
      _oneC = one ? one.caption : dfProps.dfSliceTitle || DF_CAPTION;

  var _zhCompType = void 0,
      _time = void 0;
  if (_seriaType !== AREA) {
    _zhCompType = chartType.compType;
    _time = date ? date.value : dateDefault;
  }

  return (0, _extends3.default)({}, dfProps, {
    itemMap: two,
    geo: _oneV,
    metric: two.value,
    loadId: loadId,
    itemCaption: _oneC,
    title: _oneC,
    subtitle: two.caption,
    alertItemId: _oneC + ':' + two.caption,
    alertGeo: _oneC,
    alertMetric: two.caption,
    seriaType: _seriaType,
    zhCompType: _zhCompType,
    time: _time,
    dataSource: dataSource,
    items: [one, two],
    selectOptions: selectOptions
  });
};

exports.default = createLoadOptions;
//# sourceMappingURL=eurostat2.js.map