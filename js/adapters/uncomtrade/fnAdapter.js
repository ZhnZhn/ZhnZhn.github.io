"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.toConfig = exports.crChartId = void 0;

var _AdapterFn = require("../AdapterFn");

var _ChartTheme = require("../../charts/ChartTheme");

var _ChartConfigFn = require("../../charts/ChartConfigFn");

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _Chart = require("../../charts/Chart");

var _Tooltip = require("../../charts/Tooltip");

var _compareByFn = require("../compareByFn");

var _legendFn = require("../legendFn");

var _fnDescr = require("./fnDescr");

var _fnHm = require("./fnHm");

var _fnLegend = require("./fnLegend");

var _conf = require("./conf");

const _assign = Object.assign;

const crChartId = _ref => {
  let {
    value,
    rg = 2,
    measure,
    tp,
    freq
  } = _ref;
  return [value, rg, measure, tp, freq].filter(Boolean).join("_");
};

exports.crChartId = crChartId;

const _crInfo = (json, option) => ({
  frequency: option.freq === 'M' ? 'Monthly' : 'Annual',
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
    isWithoutIndicator: true,
    dataSource
  };
};

const _addSeriaTo = _ref2 => {
  let {
    config,
    hm,
    name,
    i,
    color,
    seriaOption,
    isShow = false
  } = _ref2;

  const {
    legend
  } = config.zhConfig,
        _color = color || (0, _ChartTheme.getSeriaColorByIndex)(i),
        _seriaColor = {
    color: _color,
    marker: _crMarker(_color)
  },
        _seriaOption = seriaOption !== null ? isShow ? { ..._conf.SPLINE,
    ..._seriaColor
  } : { ..._conf.SPLINE_NOT_VISIBLE,
    ..._seriaColor
  } : null;

  (0, _ChartConfigFn.setSeriaDataTo)(config, hm[name], i, name, _seriaOption);
  legend.push((0, _legendFn.legendItem)(i, _color, name, isShow));
};

const _addSeriesFromHmTo = _ref3 => {
  let {
    config,
    hm,
    fromIndex
  } = _ref3;
  let i = fromIndex;
  (0, _fnHm.toSeriaNames)(hm, _compareByFn.compareByValue).forEach(item => {
    const name = item.name;

    _addSeriaTo({
      config,
      hm,
      name,
      i,
      isShow: i < _conf.MAX_SHOW
    });

    i++;
  });
};

const _compareByPeriod = (a, b) => (a || {}).period - (b || {}).period;

const _addSeriasTo = (config, json, option) => {
  const {
    one,
    measure
  } = option,
        {
    dataset
  } = json,
        pnCountry = one === _conf.ALL ? 'rtTitle' : void 0,
        {
    hm,
    categories
  } = (0, _fnHm.toHmCategories)({
    dataset: dataset.sort(_compareByPeriod),
    pnValue: measure,
    pnCountry
  });

  if (hm[_conf.WORLD] && one !== _conf.ALL) {
    _addSeriaTo({
      config,
      hm,
      i: 0,
      name: _conf.WORLD,
      color: _conf.WORLD_COLOR,
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
  config.zhConfig.legend = one === _conf.ALL ? (0, _fnLegend.toAllLegend)(legend, hm, measure) : (0, _fnLegend.toWorldLegend)(legend, hm);

  _assign(config.xAxis, {
    categories
  });
};

const _crBaseConfig = (json, option) => {
  const {
    title,
    subtitle
  } = option;
  return (0, _ConfigBuilder.default)().areaConfig().add('chart', _conf.S_CHART).addCaption(title, subtitle).add('xAxis', _conf.X_AXIS).add('yAxis', _conf.Y_AXIS).addTooltip(_Tooltip.tooltipCategorySimple).add('info', _crInfo(json, option)).add('zhConfig', _crZhConfig(option)).toConfig();
};

const _toMls = yyyymm => {
  const _str = '' + yyyymm,
        _ym = _str.length === 4 ? _str : _str.substring(0, 4) + '-' + _str.substring(4);

  return (0, _AdapterFn.ymdToUTC)(_ym);
};

const _transformToDatetime = config => {
  const {
    series
  } = config,
        {
    data
  } = series[0],
        _data = (data || []).map(p => [_toMls(p.x), p.y]);

  series[0].data = _data;
  series[0].type = 'spline';
  config.xAxis.categories = void 0;
  config.xAxis.type = 'datetime';
  config.tooltip = (0, _Chart.fTooltip)(_Tooltip.tooltipValueDmy);
  config.valueMoving = (0, _AdapterFn.valueMoving)(_data);
  config.zhConfig.isWithoutIndicator = false;
};

const toConfig = (json, option) => {
  const config = _crBaseConfig(json, option);

  _addSeriasTo(config, json, option);

  if ((config.series || []).length === 1) {
    _transformToDatetime(config);
  }

  return config;
};

exports.toConfig = toConfig;
//# sourceMappingURL=fnAdapter.js.map