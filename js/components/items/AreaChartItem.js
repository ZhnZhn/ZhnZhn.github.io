'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgCheckBox = require('../zhn/SvgCheckBox');

var _SvgCheckBox2 = _interopRequireDefault(_SvgCheckBox);

var _ValueMovingBadge = require('../zhn/ValueMovingBadge');

var _ValueMovingBadge2 = _interopRequireDefault(_ValueMovingBadge);

var _SvgClose = require('../SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

var _ButtonTab = require('../zhn/ButtonTab');

var _ButtonTab2 = _interopRequireDefault(_ButtonTab);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _ZhHighchart = require('../ZhHighchart');

var _ZhHighchart2 = _interopRequireDefault(_ZhHighchart);

var _Legend = require('../zhn/Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _PanelIndicator = require('../zhn/PanelIndicator');

var _PanelIndicator2 = _interopRequireDefault(_PanelIndicator);

var _PanelDataInfo = require('../zhn/PanelDataInfo');

var _PanelDataInfo2 = _interopRequireDefault(_PanelDataInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    lineHeight: 1.5,
    marginBottom: '10px',
    marginRight: '25px',
    //marginRight: '10px',
    position: 'relative'
  },
  headerDiv: {
    backgroundColor: '#232F3B',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    paddingTop: '4px',
    paddingLeft: '10px',
    lineHeight: 1.5,
    //height: '25px',
    //width: '600px'
    width: '100%'
  },
  checkBoxStyle: {
    float: 'left',
    marginRight: '10px'
  },
  captionSpanOpen: {
    display: 'inline-block',
    color: 'rgba(164, 135, 212, 1)',
    cursor: 'pointer',
    width: '125px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    float: 'left'
  },
  captionSpanClose: {
    display: 'inline-block',
    color: 'gray',
    cursor: 'pointer',
    width: '125px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    float: 'left'
  },
  tabDiv: {
    position: 'relative',
    height: '30px',
    backgroundColor: 'transparent',
    zIndex: 2
  }
};

var AreaChartItem = _react2.default.createClass({
  displayName: 'AreaChartItem',
  getInitialState: function getInitialState() {
    this.is2H = false;
    this._fnOnCheck = this._handlerCheckBox.bind(null, true);
    this._fnOnUnCheck = this._handlerCheckBox.bind(null, false);
    return {
      isOpen: true,
      isShowChart: true,
      isShowIndicator: false,
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
    this.mainChart = this.refs.chart.getChart();
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
      this.setState({ isOpen: false, isShowIndicator: false });
    } else {
      this.setState({ isOpen: true });
    }
  },
  _handlerClickIndicator: function _handlerClickIndicator() {
    this.setState({ isShowIndicator: !this.state.isShowIndicator });
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
      isShowInfo: true, isShowChart: false,
      isShowLegend: false, isShowIndicator: false
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
    this.props.onSetActive(isCheck, checkBox, this.refs.chart.getChart());
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
  _createChartToolBar: function _createChartToolBar(config) {
    var _btIndicator = !config.zhConfig.isWithoutIndicator ? _react2.default.createElement(
      _ButtonTab2.default,
      {
        caption: 'Indicator',
        isShow: this.state.isShowIndicator,
        style: { left: '10px' },
        onClick: this._handlerClickIndicator
      },
      _react2.default.createElement('span', { className: 'arrow-down' })
    ) : undefined;

    var _btLegend = config.zhConfig.isWithLegend ? _react2.default.createElement(_ButtonTab2.default, {
      style: { left: '115px' },
      caption: 'Legend',
      isShow: this.state.isShowLegend,
      onClick: this._handlerClickLegend
    }) : undefined;

    var _bt2HChart = _react2.default.createElement(_ButtonTab2.default, {
      style: { left: '190px' },
      caption: 'x2H',
      isShow: this.is2H,
      onClick: this._handlerClick2H
    });

    var _btAdd = !config.zhConfig.isWithoutAdd ? _react2.default.createElement(_ButtonTab2.default, {
      style: { left: '240px' },
      caption: 'Add',
      isShow: false,
      onClick: this._handlerAddToWatch
    }) : undefined;

    var _btInfo = config.info ? _react2.default.createElement(_ButtonTab2.default, {
      caption: 'Info',
      isShow: this.state.isShowInfo,
      onClick: this._handlerClickInfo
    }) : undefined;

    var _btVolume = config.zhVolumeConfig ? _react2.default.createElement(_ButtonTab2.default, {
      style: { left: '350px' },
      caption: 'Volume',
      isShow: this.state.isShowVolume,
      onClick: this._handlerClickVolume
    }) : undefined;

    var _btATH = config.zhATHConfig ? _react2.default.createElement(_ButtonTab2.default, {
      style: { left: '425px' },
      caption: 'ATH',
      isShow: this.state.isShowATH,
      onClick: this._handlerClickATH
    }) : undefined;

    var _btHL = config.zhHighLowConfig ? _react2.default.createElement(_ButtonTab2.default, {
      style: { left: '480px' },
      caption: 'HL',
      isShow: this.state.isShowHighLow,
      onClick: this._handlerClickHighLow
    }) : undefined;

    return _react2.default.createElement(
      'div',
      { style: styles.tabDiv },
      _btIndicator,
      _btLegend,
      _bt2HChart,
      _btAdd,
      _btInfo,
      _btVolume,
      _btATH,
      _btHL
    );
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
        _react2.default.createElement(_ZhHighchart2.default, {
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
        _react2.default.createElement(_ZhHighchart2.default, {
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
    var _props2 = this.props,
        chartType = _props2.chartType,
        caption = _props2.caption,
        config = _props2.config,
        onCloseItem = _props2.onCloseItem,
        itemCaption = config.zhConfig.itemCaption,
        _itemCaption = itemCaption ? itemCaption : caption,
        _state4 = this.state,
        isOpen = _state4.isOpen,
        isShowChart = _state4.isShowChart,
        isShowInfo = _state4.isShowInfo,
        isShowIndicator = _state4.isShowIndicator,
        mfiConfigs = _state4.mfiConfigs,
        _styleCaption = isOpen ? styles.captionSpanOpen : styles.captionSpanClose;

    return _react2.default.createElement(
      'div',
      { style: styles.rootDiv },
      _react2.default.createElement(
        'div',
        { style: styles.headerDiv },
        _react2.default.createElement(_SvgCheckBox2.default, {
          rootStyle: styles.checkBoxStyle,
          chartType: chartType,
          onCheck: this._fnOnCheck,
          onUnCheck: this._fnOnUnCheck
        }),
        _react2.default.createElement(
          'span',
          {
            className: 'not-selected',
            title: caption,
            style: _styleCaption,
            onClick: this._handlerToggleOpen
          },
          _itemCaption
        ),
        _react2.default.createElement(_ValueMovingBadge2.default, {
          valueMoving: config.valueMoving
        }),
        _react2.default.createElement(_SvgClose2.default, { onClose: onCloseItem })
      ),
      _react2.default.createElement(
        _ShowHide2.default,
        { isShow: isOpen },
        isShowChart && this._createChartToolBar(config),
        _react2.default.createElement(_ZhHighchart2.default, {
          ref: 'chart',
          isShow: isShowChart,
          config: config
        }),
        _react2.default.createElement(_PanelIndicator2.default, {
          isShow: isShowIndicator,
          onAddSma: this._handlerAddSma,
          onRemoveSeries: this._handleRemoveSeries,
          isMfi: config.zhIsMfi,
          onAddMfi: this._handlerAddMfi,
          onRemoveMfi: this._handlerRemoveMfi
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
    this.mainChart.options.zhDetailCharts.forEach(function (chart) {
      //chart.reflow();
      chart.setSize(width, chart.options.chart.height, true);
    });
  },
  setChartHeight: function setChartHeight(height) {
    this.mainChart.options.chart.height = height;
    this.mainChart.reflow();
  }
});

exports.default = AreaChartItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\AreaChartItem.js.map