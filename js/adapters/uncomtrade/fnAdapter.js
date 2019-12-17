"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _fnDescr = _interopRequireDefault(require("./fnDescr"));

var _fnHm = _interopRequireDefault(require("./fnHm"));

var _fnLegend = _interopRequireDefault(require("./fnLegend"));

var _conf = _interopRequireDefault(require("./conf"));

var fnAdapter = {
  crChartId: function crChartId(option) {
    var value = option.value,
        _option$rg = option.rg,
        rg = _option$rg === void 0 ? 2 : _option$rg,
        _option$measure = option.measure,
        measure = _option$measure === void 0 ? "A" : _option$measure;
    return value + '_' + rg + '_' + measure;
  },
  crSeriaOption: function crSeriaOption(id) {
    return {
      zhSeriaId: id
    };
  },
  crMarker: function crMarker(color) {
    return {
      fillColor: color,
      lineColor: color,
      lineWidth: 1,
      radius: 4,
      symbol: 'circle'
    };
  },
  crInfo: function crInfo(json) {
    return {
      description: _fnDescr["default"].toDescr(json),
      frequency: "Annual"
    };
  },
  crZhConfig: function crZhConfig(option) {
    var dataSource = option.dataSource,
        nativeHref = option.nativeHref,
        _id = this.crChartId(option);

    return {
      id: _id,
      key: _id,
      isWithoutAdd: true,
      isWithLegend: true,
      legend: [],
      dataSource: dataSource,
      linkFn: "UN_COMTRADE",
      item: nativeHref
    };
  },
  addSeriaTo: function addSeriaTo(_ref) {
    var config = _ref.config,
        hm = _ref.hm,
        name = _ref.name,
        i = _ref.i,
        color = _ref.color,
        seriaOption = _ref.seriaOption,
        _ref$isShow = _ref.isShow,
        isShow = _ref$isShow === void 0 ? false : _ref$isShow;

    var _config$zhConfig = config.zhConfig,
        key = _config$zhConfig.key,
        legend = _config$zhConfig.legend,
        _color = color || _ChartConfig["default"].getColor(i),
        _seriaColor = {
      color: _color,
      marker: this.crMarker(_color)
    },
        _seriaOption = seriaOption !== null ? isShow ? (0, _extends2["default"])({}, _conf["default"].SPLINE, {}, _seriaColor) : (0, _extends2["default"])({}, _conf["default"].SPLINE_NOT_VISIBLE, {}, _seriaColor) : null;

    _ChartConfig["default"].setSerieData(config, hm[name], i, name, _seriaOption, this.crSeriaOption(key + '_' + name));

    legend.push(_AdapterFn["default"].legendItem(i, _color, name, isShow));
  },
  addSeriesFromHmTo: function addSeriesFromHmTo(_ref2) {
    var _this = this;

    var config = _ref2.config,
        hm = _ref2.hm,
        fromIndex = _ref2.fromIndex;
    var i = fromIndex;

    _fnHm["default"].toSeriaNames(hm, _AdapterFn["default"].compareByValue).forEach(function (item) {
      var name = item.name,
          _isShow = i < _conf["default"].MAX_SHOW ? true : false;

      _this.addSeriaTo({
        config: config,
        hm: hm,
        name: name,
        i: i,
        isShow: _isShow
      });

      i++;
    });
  },
  addSeriasTo: function addSeriasTo(config, json, option) {
    var one = option.one,
        measure = option.measure,
        _json$dataset = json.dataset,
        dataset = _json$dataset === void 0 ? [] : _json$dataset,
        _ref3 = one !== _conf["default"].ALL ? _fnHm["default"].toHmCategories({
      dataset: dataset,
      pnValue: measure
    }) : _fnHm["default"].toHmCategories({
      dataset: dataset,
      pnValue: measure,
      pnCountry: 'rtTitle'
    }),
        hm = _ref3.hm,
        categories = _ref3.categories;

    if (hm[_conf["default"].WORLD] && one !== _conf["default"].ALL) {
      this.addSeriaTo({
        config: config,
        hm: hm,
        i: 0,
        name: _conf["default"].WORLD,
        color: _conf["default"].WORLD_COLOR,
        seriaOption: null,
        isShow: true
      });
      this.addSeriesFromHmTo({
        config: config,
        hm: hm,
        fromIndex: 1
      });
    } else {
      this.addSeriesFromHmTo({
        config: config,
        hm: hm,
        fromIndex: 0
      });
    }

    var legend = config.zhConfig.legend;
    config.zhConfig.legend = one !== _conf["default"].ALL ? _fnLegend["default"].toWorldLegend(legend, hm) : _fnLegend["default"].toAllLegend(legend, hm, measure);
    Object.assign(config.xAxis, {
      categories: categories
    });
  },
  crBaseConfig: function crBaseConfig(json, option) {
    var title = option.title,
        subtitle = option.subtitle;
    return (0, _ConfigBuilder["default"])().areaConfig().add('chart', _conf["default"].CHART).addCaption(title, subtitle).add('xAxis', _conf["default"].X_AXIS).add('yAxis', _conf["default"].Y_AXIS).addTooltip(_Tooltip["default"].categorySimple).add('info', this.crInfo(json)).add('zhConfig', this.crZhConfig(option)).toConfig();
  },
  toConfig: function toConfig(json, option) {
    var config = this.crBaseConfig(json, option);
    this.addSeriasTo(config, json, option);
    return config;
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map