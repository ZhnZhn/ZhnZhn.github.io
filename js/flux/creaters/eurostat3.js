'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLoadOptions = function createLoadOptions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var loadId = props.loadId,
      dataSource = props.dataSource,
      dfProps = props.dfProps,
      _options$one = options.one,
      one = _options$one === undefined ? {} : _options$one,
      _options$group = options.group,
      group = _options$group === undefined ? {} : _options$group,
      _options$metric = options.metric,
      metric = _options$metric === undefined ? {} : _options$metric,
      _options$chartType = options.chartType,
      chartType = _options$chartType === undefined ? {} : _options$chartType,
      _options$date = options.date,
      date = _options$date === undefined ? {} : _options$date,
      _options$dateDefault = options.dateDefault,
      dateDefault = _options$dateDefault === undefined ? '' : _options$dateDefault,
      _one$caption = one.caption,
      oneC = _one$caption === undefined ? '' : _one$caption,
      oneV = one.value,
      _group$caption = group.caption,
      groupC = _group$caption === undefined ? '' : _group$caption,
      groupV = group.value,
      _metric$caption = metric.caption,
      metricC = _metric$caption === undefined ? '' : _metric$caption,
      metricV = metric.value,
      _chartType$value = chartType.value,
      chartTypeValue = _chartType$value === undefined ? 'AREA' : _chartType$value,
      _time = date.value || dateDefault;

  return (0, _extends3.default)({}, dfProps, {
    geo: oneV,
    group: groupV,
    metric: metricV,
    time: _time,
    loadId: loadId,
    itemCaption: oneC,
    title: oneC,
    subtitle: groupC + ':' + metricC,
    alertItemId: oneC + ':' + metricC,
    alertGeo: oneC,
    alertMetric: metricC,
    seriaType: chartTypeValue,
    dataSource: dataSource,
    items: [one, group, metric]
  });
};

exports.default = createLoadOptions;
//# sourceMappingURL=eurostat3.js.map