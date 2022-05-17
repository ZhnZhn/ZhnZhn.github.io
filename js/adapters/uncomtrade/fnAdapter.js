"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.toConfig = exports.crChartId = void 0;

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _compareByFn = require("../compareByFn");

var _legendFn = require("../legendFn");

var _fnDescr = require("./fnDescr");

var _fnHm = require("./fnHm");

var _fnLegend = require("./fnLegend");

var _conf = _interopRequireDefault(require("./conf"));

const _assign = Object.assign;

const _crInfo = (json, option) => ({
  frequency: "Annual",
  description: (0, _fnDescr.toDescr)(json, option)
});

const _crMarker = color => ({
  fillColor: color,
  lineColor: color,
  lineWidth: 1,
  radius: 4,
  symbol: 'circle'
});

const _crZhConfig = option => {
  const {
    dataSource
  } = option,
        _id = crChartId(option);

  return {
    id: _id,
    key: _id,
    legend: [],
    dataSource
  };
};

const _addSeriaTo = _ref => {
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
    marker: _crMarker(_color)
  },
        _seriaOption = seriaOption !== null ? isShow ? { ..._conf.default.SPLINE,
    ..._seriaColor
  } : { ..._conf.default.SPLINE_NOT_VISIBLE,
    ..._seriaColor
  } : null;

  _ChartConfig.default.setSerieData(config, hm[name], i, name, _seriaOption);

  legend.push((0, _legendFn.legendItem)(i, _color, name, isShow));
};

const _addSeriesFromHmTo = _ref2 => {
  let {
    config,
    hm,
    fromIndex
  } = _ref2;
  let i = fromIndex;
  (0, _fnHm.toSeriaNames)(hm, _compareByFn.compareByValue).forEach(item => {
    const name = item.name,
          _isShow = i < _conf.default.MAX_SHOW ? true : false;

    _addSeriaTo({
      config,
      hm,
      name,
      i,
      isShow: _isShow
    });

    i++;
  });
};

const _addSeriasTo = (config, json, option) => {
  const {
    one,
    measure
  } = option,
        {
    dataset = []
  } = json,
        pnCountry = one === _conf.default.ALL ? 'rtTitle' : void 0,
        {
    hm,
    categories
  } = (0, _fnHm.toHmCategories)({
    dataset,
    pnValue: measure,
    pnCountry
  });

  if (hm[_conf.default.WORLD] && one !== _conf.default.ALL) {
    _addSeriaTo({
      config,
      hm,
      i: 0,
      name: _conf.default.WORLD,
      color: _conf.default.WORLD_COLOR,
      seriaOption: null,
      isShow: true
    });

    _addSeriesFromHmTo({
      config,
      hm,
      fromIndex: 1
    });
  } else {
    _addSeriesFromHmTo({
      config,
      hm,
      fromIndex: 0
    });
  }

  const legend = config.zhConfig.legend;
  config.zhConfig.legend = one === _conf.default.ALL ? (0, _fnLegend.toAllLegend)(legend, hm, measure) : (0, _fnLegend.toWorldLegend)(legend, hm);

  _assign(config.xAxis, {
    categories
  });
};

const _crBaseConfig = (json, option) => {
  const {
    title,
    subtitle
  } = option;
  return (0, _ConfigBuilder.default)().areaConfig().add('chart', _conf.default.CHART).addCaption(title, subtitle).add('xAxis', _conf.default.X_AXIS).add('yAxis', _conf.default.Y_AXIS).addTooltip(_Tooltip.default.categorySimple).add('info', _crInfo(json, option)).add('zhConfig', _crZhConfig(option)).toConfig();
};

const crChartId = _ref3 => {
  let {
    value,
    rg = 2,
    measure = "A"
  } = _ref3;
  return value + '_' + rg + '_' + measure;
};

exports.crChartId = crChartId;

const toConfig = (json, option) => {
  const config = _crBaseConfig(json, option);

  _addSeriasTo(config, json, option);

  return config;
};

exports.toConfig = toConfig;
//# sourceMappingURL=fnAdapter.js.map