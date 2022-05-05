"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _AdapterFn = require("../AdapterFn");

var _compareByFn = require("../compareByFn");

var _legendFn = require("../legendFn");

var _fnDescr = _interopRequireDefault(require("./fnDescr"));

var _fnHm = _interopRequireDefault(require("./fnHm"));

var _fnLegend = _interopRequireDefault(require("./fnLegend"));

var _conf = _interopRequireDefault(require("./conf"));

const _assign = Object.assign;

const _crInfo = (json, option) => ({
  frequency: "Annual",
  description: _fnDescr.default.toDescr(json, option)
});

const fnAdapter = {
  roundBy: _AdapterFn.roundBy,
  crChartId: option => {
    const {
      value,
      rg = 2,
      measure = "A"
    } = option;
    return value + '_' + rg + '_' + measure;
  },
  crMarker: color => {
    return {
      fillColor: color,
      lineColor: color,
      lineWidth: 1,
      radius: 4,
      symbol: 'circle'
    };
  },

  crZhConfig(option) {
    const {
      dataSource
    } = option,
          _id = this.crChartId(option);

    return {
      id: _id,
      key: _id,
      legend: [],
      dataSource: dataSource
    };
  },

  addSeriaTo(_ref) {
    let {
      config,
      hm,
      name,
      i,
      color,
      seriaOption,
      isShow = false
    } = _ref;

    const {
      legend
    } = config.zhConfig,
          _color = color || _ChartConfig.default.getColor(i),
          _seriaColor = {
      color: _color,
      marker: this.crMarker(_color)
    },
          _seriaOption = seriaOption !== null ? isShow ? { ..._conf.default.SPLINE,
      ..._seriaColor
    } : { ..._conf.default.SPLINE_NOT_VISIBLE,
      ..._seriaColor
    } : null;

    _ChartConfig.default.setSerieData(config, hm[name], i, name, _seriaOption);

    legend.push((0, _legendFn.legendItem)(i, _color, name, isShow));
  },

  addSeriesFromHmTo(_ref2) {
    let {
      config,
      hm,
      fromIndex
    } = _ref2;
    let i = fromIndex;

    _fnHm.default.toSeriaNames(hm, _compareByFn.compareByValue).forEach(item => {
      const name = item.name,
            _isShow = i < _conf.default.MAX_SHOW ? true : false;

      this.addSeriaTo({
        config,
        hm,
        name,
        i,
        isShow: _isShow
      });
      i++;
    });
  },

  addSeriasTo(config, json, option) {
    const {
      one,
      measure
    } = option,
          {
      dataset = []
    } = json,
          {
      hm,
      categories
    } = one !== _conf.default.ALL ? _fnHm.default.toHmCategories({
      dataset,
      pnValue: measure
    }) : _fnHm.default.toHmCategories({
      dataset,
      pnValue: measure,
      pnCountry: 'rtTitle'
    });

    if (hm[_conf.default.WORLD] && one !== _conf.default.ALL) {
      this.addSeriaTo({
        config,
        hm,
        i: 0,
        name: _conf.default.WORLD,
        color: _conf.default.WORLD_COLOR,
        seriaOption: null,
        isShow: true
      });
      this.addSeriesFromHmTo({
        config,
        hm,
        fromIndex: 1
      });
    } else {
      this.addSeriesFromHmTo({
        config,
        hm,
        fromIndex: 0
      });
    }

    const legend = config.zhConfig.legend;
    config.zhConfig.legend = one !== _conf.default.ALL ? _fnLegend.default.toWorldLegend(legend, hm) : _fnLegend.default.toAllLegend(legend, hm, measure);

    _assign(config.xAxis, {
      categories
    });
  },

  crBaseConfig(json, option) {
    const {
      title,
      subtitle
    } = option;
    return (0, _ConfigBuilder.default)().areaConfig().add('chart', _conf.default.CHART).addCaption(title, subtitle).add('xAxis', _conf.default.X_AXIS).add('yAxis', _conf.default.Y_AXIS).addTooltip(_Tooltip.default.categorySimple).add('info', _crInfo(json, option)).add('zhConfig', this.crZhConfig(option)).toConfig();
  },

  toConfig(json, option) {
    const config = this.crBaseConfig(json, option);
    this.addSeriasTo(config, json, option);
    return config;
  }

};
var _default = fnAdapter;
exports.default = _default;
//# sourceMappingURL=fnAdapter.js.map