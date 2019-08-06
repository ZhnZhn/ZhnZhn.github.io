'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crTitle = _fnAdapter2.default.crTitle,
    crChartId = _fnAdapter2.default.crChartId,
    crData = _fnAdapter2.default.crData,
    crConfigOption = _fnAdapter2.default.crConfigOption,
    toSeriesData = _fnAdapter2.default.toSeriesData;


var BarchartAdapter = {
  toConfig: function toConfig(json, option) {
    var chartId = crChartId(option),
        _crTitle = crTitle(option),
        title = _crTitle.title,
        subtitle = _crTitle.subtitle,
        dataOption = crData(json, option),
        data = dataOption.data,
        dataMfi = dataOption.dataMfi,
        config = (0, _ConfigBuilder2.default)().stockConfig(chartId, dataOption).addCaption(title, subtitle).add((0, _extends3.default)({}, crConfigOption({
      chartId: chartId, option: option, data: data
    }))).addZhPoints(dataMfi).toConfig();


    return { config: config };
  },
  toSeries: function toSeries() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var option = arguments[1];
    var parentId = option.parentId,
        _id = parentId + '_' + crChartId(option),
        _toSeriesData = toSeriesData(json.results, {
      isAllSeries: false,
      pnDate: 'tradingDay'
    }),
        data = _toSeriesData.data;

    return (0, _ConfigBuilder2.default)().initSeria().addPoints(_id, data).toSeria();
  }
};

exports.default = BarchartAdapter;
//# sourceMappingURL=BarchartAdapter.js.map