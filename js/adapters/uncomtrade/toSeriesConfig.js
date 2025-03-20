"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _Chart = require("../../charts/Chart");
var _Tooltip = require("../../charts/Tooltip");
var _ChartTheme = require("../../charts/ChartTheme");
var _ChartConfigFn = require("../../charts/ChartConfigFn");
var _legendFn = require("../legendFn");
var _fnHm = require("./fnHm");
var _fnLegend = require("./fnLegend");
var _fnAdapter = require("./fnAdapter");
var _conf = require("./conf");
const _assign = Object.assign;
const _getObjectKeys = Object.keys;
const _crMarker = color => ({
  fillColor: color,
  lineColor: color,
  lineWidth: 1,
  radius: 4,
  symbol: 'circle'
});
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
    _color = color || (0, _ChartTheme.getSeriaColorByIndex)(i),
    _seriaColor = {
      color: _color,
      marker: _crMarker(_color)
    },
    _seriaOption = seriaOption !== null ? isShow ? {
      ..._conf.SPLINE,
      ..._seriaColor
    } : {
      ..._conf.SPLINE_NOT_VISIBLE,
      ..._seriaColor
    } : null;
  (0, _ChartConfigFn.setSeriaDataTo)(config, hm[name], i, name, _seriaOption);
  legend.push((0, _legendFn.legendItem)(i, _color, name, isShow));
};
const _addSeriesFromHmTo = _ref2 => {
  let {
    config,
    hm,
    fromIndex
  } = _ref2;
  let i = fromIndex;
  (0, _fnHm.toSeriaNames)(hm).forEach((item, itemIndex) => {
    if (itemIndex >= i) {
      const name = item.name;
      _addSeriaTo({
        config,
        hm,
        name,
        i,
        isShow: i < _conf.MAX_SHOW
      });
      i++;
    }
  });
};
const _compareByPeriod = (a, b) => (a || {}).period - (b || {}).period;
const _crHmNames = (hmData, hmTradePartners) => {
  return _getObjectKeys(hmData).reduce((_hm, tpKey) => {
    _hm[hmTradePartners[tpKey] || tpKey] = hmData[tpKey];
    return _hm;
  }, (0, _fnAdapter.crEmptyHmObject)());
};
const _addSeriasTo = (config, json, option) => {
  const {
      data
    } = json,
    {
      one,
      measure
    } = option,
    pnCountry = one === _conf.ALL ? 'reporterCode' : 'partnerCode',
    [hm, categories] = (0, _fnHm.toHmCategories)(data.sort(_compareByPeriod), pnCountry, measure),
    _hmTradePartners = (0, _fnAdapter.getHmTradePartners)(option.tradePartners),
    _hm = _crHmNames(hm, _hmTradePartners);
  if (_hm[_conf.WORLD_ITEM_NAME] && one !== _conf.ALL) {
    _addSeriaTo({
      config,
      hm: _hm,
      i: 0,
      name: _conf.WORLD_ITEM_NAME,
      color: _conf.WORLD_COLOR,
      seriaOption: null,
      isShow: true
    });
    _addSeriesFromHmTo({
      config,
      hm: _hm,
      fromIndex: 1
    });
  } else {
    _addSeriesFromHmTo({
      config,
      hm: _hm,
      fromIndex: 0
    });
  }
  const {
    legend
  } = config.zhConfig;
  config.zhConfig.legend = one === _conf.ALL ? (0, _fnLegend.toAllLegend)(legend, _hm, measure) : (0, _fnLegend.toWorldLegend)(legend, _hm);
  _assign(config.xAxis, {
    categories
  });
};
const _crSeriesConfig = (json, option) => {
  const {
    title,
    subtitle
  } = option;
  return (0, _pipe.default)((0, _configBuilderFn.crAreaConfig)(), (0, _configBuilderFn.fAdd)({
    chart: _conf.S_CHART,
    xAxis: _conf.X_AXIS,
    yAxis: _conf.Y_AXIS
  }), (0, _configBuilderFn.fAddCaption)(title, subtitle), (0, _configBuilderFn.fAddTooltip)(_Tooltip.tooltipCategorySimple), (0, _configBuilderFn.fAdd)({
    info: (0, _fnAdapter.crInfo)(json, option),
    zhConfig: (0, _fnAdapter.crZhConfig)(option, {
      isLegend: true
    })
  }), _configBuilderFn.toConfig);
};
const _toMls = yyyymm => {
  const _str = '' + yyyymm,
    _ym = _str.length === 4 ? _str : _str.slice(0, 4) + '-' + _str.slice(4, 6);
  return (0, _fnAdapter.ymdToUTC)(_ym);
};
const _transformToDatetime = config => {
  const {
      series
    } = config,
    {
      data
    } = series[0],
    _data = (data || []).map(p => [_toMls(p.c), p.y]);
  series[0].data = _data;
  series[0].type = 'spline';
  config.xAxis.categories = void 0;
  config.xAxis.type = 'datetime';
  config.tooltip = (0, _Chart.fTooltip)(_Tooltip.tooltipValueDmy);
  config.valueMoving = (0, _fnAdapter.valueMoving)(_data);
  config.zhConfig.isWithoutIndicator = false;
};
const toSeriesConfig = (json, option) => {
  const config = _crSeriesConfig(json, option);
  _addSeriasTo(config, json, option);
  if ((config.series || []).length === 1) {
    _transformToDatetime(config);
  }
  return config;
};
var _default = exports.default = toSeriesConfig;
//# sourceMappingURL=toSeriesConfig.js.map