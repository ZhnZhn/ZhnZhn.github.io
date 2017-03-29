'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _ChartToolbar = require('./ChartToolbar');

var _ChartToolbar2 = _interopRequireDefault(_ChartToolbar);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _HighchartWrapper = require('../zhn/HighchartWrapper');

var _HighchartWrapper2 = _interopRequireDefault(_HighchartWrapper);

var _Legend = require('../zhn/Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _PanelDataInfo = require('../zhn/PanelDataInfo');

var _PanelDataInfo2 = _interopRequireDefault(_PanelDataInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    lineHeight: 1.5,
    marginBottom: '10px',
    marginRight: '25px',
    //marginLeft: '8px',
    position: 'relative'
  },
  tabDiv: {
    position: 'relative',
    height: '30px',
    backgroundColor: 'transparent',
    zIndex: 2
  },
  showHide: {
    marginLeft: '8px'
  },
  dataSource: {
    position: 'absolute',
    left: '5px',
    bottom: '0px',
    color: '#909090',
    fontSize: '11px'
  }
};

var AreaChartItem = _react2.default.createClass({
  displayName: 'AreaChartItem',
  getInitialState: function getInitialState() {
    this.is2H = false;
    this._fnOnCheck = this._handlerCheckBox.bind(this, true);
    this._fnOnUnCheck = this._handlerCheckBox.bind(this, false);

    var _props$config = this.props.config,
        config = _props$config === undefined ? {} : _props$config,
        zhConfig = config.zhConfig,
        _zhConfig$dataSource = zhConfig.dataSource,
        dataSource = _zhConfig$dataSource === undefined ? '' : _zhConfig$dataSource;

    this._dataSourceEl = _react2.default.createElement(
      'div',
      { style: styles.dataSource },
      dataSource
    );

    return {
      isOpen: true,
      isShowChart: true,
      isShowLegend: false,
      isShowInfo: false,

      isInitVolume: false, isShowVolume: false,
      isATHVolume: false, isShowATH: false,
      isInitHighLow: false, isShowHighLow: false,

      chartsDescription: [],
      mfiConfigs: []
    };
  },
  componentDidMount: function componentDidMount() {
    this.mainChart = this.chartComp.getChart();
  },
  _handlerLoadedMetricChart: function _handlerLoadedMetricChart(metricChart) {
    this.mainChart.options.zhDetailCharts.push(metricChart);
  },
  _handlerWillUnLoadedChart: function _handlerWillUnLoadedChart(objChart) {
    var charts = this.mainChart.options.zhDetailCharts;
    this.mainChart.options.zhDetailCharts = charts.filter(function (chart) {
      return chart !== objChart;
    });
  },
  _handlerToggleOpen: function _handlerToggleOpen() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
  },
  _handlerClickLegend: function _handlerClickLegend() {
    this.setState({ isShowLegend: !this.state.isShowLegend });
  },
  _handlerToggleSeria: function _handlerToggleSeria(item) {
    this.mainChart.options.zhToggleSeria(this.mainChart, item);
  },
  _handlerClick2H: function _handlerClick2H() {
    var height = this.is2H ? this.mainChart.options.chart.height / 2 : this.mainChart.options.chart.height * 2;
    this.setChartHeight(height);
    this.is2H = !this.is2H;
  },
  _handlerAddToWatch: function _handlerAddToWatch() {
    var _props = this.props,
        caption = _props.caption,
        config = _props.config,
        onAddToWatch = _props.onAddToWatch;

    onAddToWatch({ caption: caption, config: config });
  },
  _handlerClickInfo: function _handlerClickInfo() {
    this.setState({
      isShowInfo: true, isShowChart: false, isShowLegend: false
    });
  },
  _handlerClickVolume: function _handlerClickVolume() {
    var _state = this.state,
        isInitVolume = _state.isInitVolume,
        isShowVolume = _state.isShowVolume;

    if (isInitVolume) {
      this.setState({ isShowVolume: !isShowVolume });
    } else {
      this.state.chartsDescription.push({ type: 'Volume' });
      this.setState({
        chartsDescription: this.state.chartsDescription,
        isShowVolume: true, isInitVolume: true
      });
    }
  },
  _handlerClickATH: function _handlerClickATH() {
    var _state2 = this.state,
        isInitATH = _state2.isInitATH,
        isShowATH = _state2.isShowATH;

    if (isInitATH) {
      this.setState({ isShowATH: !isShowATH });
    } else {
      this.state.chartsDescription.push({ type: 'ATH' });
      this.setState({
        chartsDescription: this.state.chartsDescription,
        isShowATH: true, isInitATH: true
      });
    }
  },
  _handlerClickHighLow: function _handlerClickHighLow() {
    var _state3 = this.state,
        isInitHighLow = _state3.isInitHighLow,
        isShowHighLow = _state3.isShowHighLow;

    if (isInitHighLow) {
      this.setState({ isShowHighLow: !isShowHighLow });
    } else {
      this.state.chartsDescription.push({ type: 'HighLow' });
      this.setState({
        chartsDescription: this.state.chartsDescription,
        isShowHighLow: true, isInitHighLow: true
      });
    }
  },
  _handlerClickChart: function _handlerClickChart() {
    this.setState({ isShowChart: true, isShowInfo: false });
  },
  _handlerCheckBox: function _handlerCheckBox(isCheck, checkBox) {
    //this.props.onSetActive(isCheck, checkBox, this.refs.chart.getChart());
    this.props.onSetActive(isCheck, checkBox, this.mainChart);
  },
  _handlerAddSma: function _handlerAddSma(period) {
    return this.mainChart.options.zhFnAddSeriesSma(this.mainChart, period);
  },
  _handleRemoveSeries: function _handleRemoveSeries(id) {
    return this.mainChart.options.zhFnRemoveSeries(this.mainChart, id);
  },
  _handlerAddMfi: function _handlerAddMfi(period, id) {
    var config = this.mainChart.options.zhFnGetMfiConfig(this.mainChart, period, id);
    this.state.mfiConfigs.push({ config: config, id: id });
    this.setState({ mfiConfigs: this.state.mfiConfigs });
  },
  _handlerRemoveMfi: function _handlerRemoveMfi(id) {
    this.state.mfiConfigs = this.state.mfiConfigs.filter(function (objConfig) {
      return objConfig.id !== id;
    });
    this.setState({ mfiConfigs: this.state.mfiConfigs });
  },
  _handleClickConfig: function _handleClickConfig() {
    var _props2 = this.props,
        caption = _props2.caption,
        onShowConfigDialog = _props2.onShowConfigDialog;

    onShowConfigDialog({ caption: caption, chart: this.mainChart });
  },
  _createChartToolBar: function _createChartToolBar(config) {
    return _react2.default.createElement(_ChartToolbar2.default, {
      style: styles.tabDiv,
      config: config,
      onAddSma: this._handlerAddSma,
      onRemoveSeries: this._handleRemoveSeries,
      onAddMfi: this._handlerAddMfi,
      onRemoveMfi: this._handlerRemoveMfi,
      onClickLegend: this._handlerClickLegend,
      onClick2H: this._handlerClick2H,
      onAddToWatch: this._handlerAddToWatch,
      onClickInfo: this._handlerClickInfo,
      onClickVolume: this._handlerClickVolume,
      onClickATH: this._handlerClickATH,
      onClickHighLow: this._handlerClickHighLow,
      onClickConfig: this._handleClickConfig
    });
  },
  _renderLegend: function _renderLegend(config) {
    var isShowLegend = this.state.isShowLegend;

    var _compLegend = config.zhConfig.isWithLegend ? _react2.default.createElement(
      _ShowHide2.default,
      { isShow: isShowLegend },
      _react2.default.createElement(_Legend2.default, {
        legend: config.zhConfig.legend,
        onClickItem: this._handlerToggleSeria
      })
    ) : undefined;

    return _compLegend;
  },
  _renderMetricCharts: function _renderMetricCharts() {
    var _this = this;

    var chartsDescription = this.state.chartsDescription;


    var _metricCharts = chartsDescription.map(function (descr, index) {
      var type = descr.type,
          _isShow = _this.state['isShow' + type],
          _ref = 'chart' + type,
          _config = _this.props.config['zh' + type + 'Config'];


      return _react2.default.createElement(
        _ShowHide2.default,
        { isShow: _isShow, key: index },
        _react2.default.createElement(_HighchartWrapper2.default, {
          ref: _ref,
          isShow: true,
          config: _config,
          onLoaded: _this._handlerLoadedMetricChart
        })
      );
    });

    return _react2.default.createElement(
      'div',
      null,
      _metricCharts
    );
  },
  _renderIndicatorCharts: function _renderIndicatorCharts(arrConfigs) {
    var _this2 = this;

    var _indicatorCharts = arrConfigs.map(function (objConfig, index) {
      var config = objConfig.config,
          id = objConfig.id;

      return _react2.default.createElement(
        _ShowHide2.default,
        { isShow: true, key: id },
        _react2.default.createElement(_HighchartWrapper2.default, {
          isShow: true,
          config: config,
          onLoaded: _this2._handlerLoadedMetricChart,
          onWillUnLoaded: _this2._handlerWillUnLoadedChart
        })
      );
    });
    return _react2.default.createElement(
      'div',
      null,
      _indicatorCharts
    );
  },
  render: function render() {
    var _this3 = this;

    var _props3 = this.props,
        chartType = _props3.chartType,
        caption = _props3.caption,
        config = _props3.config,
        onCloseItem = _props3.onCloseItem,
        _config$zhConfig = config.zhConfig,
        itemCaption = _config$zhConfig.itemCaption,
        itemTime = _config$zhConfig.itemTime,
        _itemCaption = itemCaption ? itemCaption : caption,
        _state4 = this.state,
        isOpen = _state4.isOpen,
        isShowChart = _state4.isShowChart,
        isShowInfo = _state4.isShowInfo,
        mfiConfigs = _state4.mfiConfigs;

    return _react2.default.createElement(
      'div',
      { style: styles.rootDiv },
      _react2.default.createElement(_Header2.default, {
        isOpen: isOpen,
        chartType: chartType,
        onCheck: this._fnOnCheck,
        onUnCheck: this._fnOnUnCheck,
        itemCaption: _itemCaption,
        itemTitle: caption,
        itemTime: itemTime,
        onToggle: this._handlerToggleOpen,
        valueMoving: config.valueMoving,
        onClose: onCloseItem
      }),
      _react2.default.createElement(
        _ShowHide2.default,
        { isShow: isOpen, style: styles.showHide },
        isShowChart && this._createChartToolBar(config),
        _react2.default.createElement(_HighchartWrapper2.default, {
          ref: function ref(comp) {
            return _this3.chartComp = comp;
          },
          isShow: isShowChart,
          config: config,
          absComp: this._dataSourceEl
        }),
        _react2.default.createElement(_PanelDataInfo2.default, {
          isShow: isShowInfo,
          info: config.info,
          zhInfo: config.zhConfig,
          onClickChart: this._handlerClickChart
        }),
        this._renderLegend(config),
        this._renderIndicatorCharts(mfiConfigs),
        this._renderMetricCharts()
      )
    );
  },
  reflowChart: function reflowChart(width) {
    this.mainChart.options.chart.width = width;
    this.mainChart.reflow();
    if (Array.isArray(this.mainChart.options.zhDetailCharts)) {
      this.mainChart.options.zhDetailCharts.forEach(function (chart) {
        //chart.reflow();
        chart.setSize(width, chart.options.chart.height, true);
      });
    }
  },
  setChartHeight: function setChartHeight(height) {
    this.mainChart.options.chart.height = height;
    this.mainChart.reflow();
  }
});

exports.default = AreaChartItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\AreaChartItem.js.map