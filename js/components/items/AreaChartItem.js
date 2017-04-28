'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _ChartToolBar = require('./ChartToolBar');

var _ChartToolBar2 = _interopRequireDefault(_ChartToolBar);

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
  wrapper: {
    marginTop: '6px'
  },
  dataSource: {
    position: 'absolute',
    left: '5px',
    bottom: '0px',
    color: '#909090',
    fontSize: '11px'
  }
};

var AreaChartItem = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(AreaChartItem, _Component);

  function AreaChartItem(props) {
    (0, _classCallCheck3.default)(this, AreaChartItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AreaChartItem.__proto__ || Object.getPrototypeOf(AreaChartItem)).call(this));

    _initialiseProps.call(_this);

    _this.is2H = false;
    _this._fnOnCheck = _this._handlerCheckBox.bind(_this, true);
    _this._fnOnUnCheck = _this._handlerCheckBox.bind(_this, false);

    var _props$config = props.config,
        config = _props$config === undefined ? {} : _props$config,
        _props$caption = props.caption,
        caption = _props$caption === undefined ? '' : _props$caption,
        zhConfig = config.zhConfig,
        _zhConfig$dataSource = zhConfig.dataSource,
        dataSource = _zhConfig$dataSource === undefined ? '' : _zhConfig$dataSource,
        itemCaption = zhConfig.itemCaption,
        _itemCaption = itemCaption ? itemCaption : caption;

    _this._dataSourceEl = _react2.default.createElement(
      'div',
      { style: styles.dataSource },
      dataSource
    );
    _this.state = {
      isOpen: true,
      isShowToolbar: true,
      isShowChart: true,
      isShowLegend: false,
      isShowInfo: false,

      isInitVolume: false, isShowVolume: false,
      isATHVolume: false, isShowATH: false,
      isInitHighLow: false, isShowHighLow: false,

      itemCaption: _itemCaption,
      chartsDescription: [],
      mfiConfigs: []
    };
    return _this;
  }

  (0, _createClass3.default)(AreaChartItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mainChart = this.chartComp.getChart();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          chartType = _props.chartType,
          caption = _props.caption,
          config = _props.config,
          onCloseItem = _props.onCloseItem,
          isAdminMode = _props.isAdminMode,
          itemTime = config.zhConfig.itemTime,
          _state = this.state,
          isOpen = _state.isOpen,
          isShowChart = _state.isShowChart,
          isShowInfo = _state.isShowInfo,
          itemCaption = _state.itemCaption,
          mfiConfigs = _state.mfiConfigs;


      return _react2.default.createElement(
        'div',
        { style: styles.rootDiv },
        _react2.default.createElement(_Header2.default, {
          isOpen: isOpen,
          chartType: chartType,
          onCheck: this._fnOnCheck,
          onUnCheck: this._fnOnUnCheck,
          itemCaption: itemCaption,
          itemTitle: caption,
          itemTime: itemTime,
          onToggle: this._handlerToggleOpen,
          valueMoving: config.valueMoving,
          onClose: onCloseItem,
          isAdminMode: isAdminMode,
          crValueMoving: this._crValueMoving
        }),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isOpen, style: styles.showHide },
          isShowChart && this._createChartToolBar(config),
          _react2.default.createElement(_HighchartWrapper2.default, {
            ref: function ref(comp) {
              return _this2.chartComp = comp;
            },
            isShow: isShowChart,
            rootStyle: styles.wrapper,
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
    }
  }, {
    key: 'reflowChart',
    value: function reflowChart(width) {
      this.mainChart.options.chart.width = width;
      this.mainChart.reflow();
      if (Array.isArray(this.mainChart.options.zhDetailCharts)) {
        this.mainChart.options.zhDetailCharts.forEach(function (chart) {
          //chart.reflow();
          chart.setSize(width, chart.options.chart.height, true);
        });
      }
    }
  }]);
  return AreaChartItem;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.setItemCaption = function (str) {
    _this3.setState({ itemCaption: str });
  };

  this.getMainChart = function () {
    return _this3.mainChart;
  };

  this._handlerLoadedMetricChart = function (metricChart) {
    _this3.mainChart.options.zhDetailCharts.push(metricChart);
  };

  this._handlerWillUnLoadedChart = function (objChart) {
    var charts = _this3.mainChart.options.zhDetailCharts;
    _this3.mainChart.options.zhDetailCharts = charts.filter(function (chart) {
      return chart !== objChart;
    });
  };

  this._handlerToggleOpen = function () {
    if (_this3.state.isOpen) {
      _this3.setState({ isOpen: false });
    } else {
      _this3.setState({ isOpen: true });
    }
  };

  this._handlerClickLegend = function () {
    _this3.setState({ isShowLegend: !_this3.state.isShowLegend });
  };

  this._handlerToggleSeria = function (item) {
    _this3.mainChart.options.zhToggleSeria(_this3.mainChart, item);
  };

  this._handlerClick2H = function () {
    var height = _this3.is2H ? _this3.mainChart.options.chart.height / 2 : _this3.mainChart.options.chart.height * 2;
    _this3.setChartHeight(height);
    _this3.is2H = !_this3.is2H;
  };

  this._handlerAddToWatch = function () {
    var _props2 = _this3.props,
        caption = _props2.caption,
        config = _props2.config,
        onAddToWatch = _props2.onAddToWatch;

    onAddToWatch({ caption: caption, config: config });
  };

  this._handlerClickInfo = function () {
    _this3.setState({
      isShowInfo: true, isShowChart: false, isShowLegend: false
    });
  };

  this._handlerClickVolume = function () {
    var _state2 = _this3.state,
        isInitVolume = _state2.isInitVolume,
        isShowVolume = _state2.isShowVolume;

    if (isInitVolume) {
      _this3.setState({ isShowVolume: !isShowVolume });
    } else {
      _this3.state.chartsDescription.push({ type: 'Volume' });
      _this3.setState({
        chartsDescription: _this3.state.chartsDescription,
        isShowVolume: true, isInitVolume: true
      });
    }
  };

  this._handlerClickATH = function () {
    var _state3 = _this3.state,
        isInitATH = _state3.isInitATH,
        isShowATH = _state3.isShowATH;

    if (isInitATH) {
      _this3.setState({ isShowATH: !isShowATH });
    } else {
      _this3.state.chartsDescription.push({ type: 'ATH' });
      _this3.setState({
        chartsDescription: _this3.state.chartsDescription,
        isShowATH: true, isInitATH: true
      });
    }
  };

  this._handlerClickHighLow = function () {
    var _state4 = _this3.state,
        isInitHighLow = _state4.isInitHighLow,
        isShowHighLow = _state4.isShowHighLow;

    if (isInitHighLow) {
      _this3.setState({ isShowHighLow: !isShowHighLow });
    } else {
      _this3.state.chartsDescription.push({ type: 'HighLow' });
      _this3.setState({
        chartsDescription: _this3.state.chartsDescription,
        isShowHighLow: true, isInitHighLow: true
      });
    }
  };

  this._handlerClickChart = function () {
    _this3.setState({ isShowChart: true, isShowInfo: false });
  };

  this._handlerCheckBox = function (isCheck, checkBox) {
    _this3.props.onSetActive(isCheck, checkBox, _this3.mainChart);
  };

  this._handlerAddSma = function (period) {
    return _this3.mainChart.options.zhFnAddSeriesSma(_this3.mainChart, period);
  };

  this._handleRemoveSeries = function (id) {
    return _this3.mainChart.options.zhFnRemoveSeries(_this3.mainChart, id);
  };

  this._handlerAddMfi = function (period, id) {
    var config = _this3.mainChart.options.zhFnGetMfiConfig(_this3.mainChart, period, id);
    _this3.state.mfiConfigs.push({ config: config, id: id });
    _this3.setState({ mfiConfigs: _this3.state.mfiConfigs });
  };

  this._handlerRemoveMfi = function (id) {
    _this3.state.mfiConfigs = _this3.state.mfiConfigs.filter(function (objConfig) {
      return objConfig.id !== id;
    });
    _this3.setState({ mfiConfigs: _this3.state.mfiConfigs });
  };

  this._handleClickConfig = function () {
    var _props3 = _this3.props,
        caption = _props3.caption,
        onShowConfigDialog = _props3.onShowConfigDialog;

    onShowConfigDialog({
      caption: caption,
      chart: _this3.mainChart,
      setItemCaption: _this3.setItemCaption,
      onToggleToolbar: _this3._handleToggleToolbar
    });
  };

  this._crValueMoving = function (prev, dateTo) {
    return _this3.props.crValueMoving(_this3.mainChart, prev, dateTo);
  };

  this._handleToggleToolbar = function (value) {
    _this3.setState(function (prevState) {
      return { isShowToolbar: !prevState.isShowToolbar };
    });
  };

  this._createChartToolBar = function (config) {
    var isShowToolbar = _this3.state.isShowToolbar;

    return _react2.default.createElement(
      _ShowHide2.default,
      { isShow: isShowToolbar },
      _react2.default.createElement(_ChartToolBar2.default, {
        style: styles.tabDiv,
        config: config,
        onAddSma: _this3._handlerAddSma,
        onRemoveSeries: _this3._handleRemoveSeries,
        onAddMfi: _this3._handlerAddMfi,
        onRemoveMfi: _this3._handlerRemoveMfi,
        onClickLegend: _this3._handlerClickLegend,
        onClick2H: _this3._handlerClick2H,
        onAddToWatch: _this3._handlerAddToWatch,
        onClickInfo: _this3._handlerClickInfo,
        onClickVolume: _this3._handlerClickVolume,
        onClickATH: _this3._handlerClickATH,
        onClickHighLow: _this3._handlerClickHighLow,
        onClickConfig: _this3._handleClickConfig
      })
    );
  };

  this._renderLegend = function (config) {
    var isShowLegend = _this3.state.isShowLegend;

    var _compLegend = config.zhConfig.isWithLegend ? _react2.default.createElement(
      _ShowHide2.default,
      { isShow: isShowLegend },
      _react2.default.createElement(_Legend2.default, {
        legend: config.zhConfig.legend,
        onClickItem: _this3._handlerToggleSeria
      })
    ) : undefined;

    return _compLegend;
  };

  this._renderMetricCharts = function () {
    var chartsDescription = _this3.state.chartsDescription;


    var _metricCharts = chartsDescription.map(function (descr, index) {
      var type = descr.type,
          _isShow = _this3.state['isShow' + type],
          _ref = 'chart' + type,
          _config = _this3.props.config['zh' + type + 'Config'];


      return _react2.default.createElement(
        _ShowHide2.default,
        { isShow: _isShow, key: index },
        _react2.default.createElement(_HighchartWrapper2.default, {
          ref: _ref,
          isShow: true,
          config: _config,
          onLoaded: _this3._handlerLoadedMetricChart
        })
      );
    });

    return _react2.default.createElement(
      'div',
      null,
      _metricCharts
    );
  };

  this._renderIndicatorCharts = function (arrConfigs) {
    var _indicatorCharts = arrConfigs.map(function (objConfig, index) {
      var config = objConfig.config,
          id = objConfig.id;

      return _react2.default.createElement(
        _ShowHide2.default,
        { isShow: true, key: id },
        _react2.default.createElement(_HighchartWrapper2.default, {
          isShow: true,
          config: config,
          onLoaded: _this3._handlerLoadedMetricChart,
          onWillUnLoaded: _this3._handlerWillUnLoadedChart
        })
      );
    });
    return _react2.default.createElement(
      'div',
      null,
      _indicatorCharts
    );
  };

  this.setChartHeight = function (height) {
    _this3.mainChart.options.chart.height = height;
    _this3.mainChart.reflow();
  };
}, _temp);
process.env.NODE_ENV !== "production" ? AreaChartItem.propTypes = {
  caption: _react.PropTypes.string,
  chartType: _react.PropTypes.string,
  config: _react.PropTypes.shape({
    zhConfig: _react.PropTypes.shape({
      dataSource: _react.PropTypes.string,
      itemCaption: _react.PropTypes.string
    })
  }),
  onAddToWatch: _react.PropTypes.func,
  onSetActive: _react.PropTypes.func,
  onShowConfigDialog: _react.PropTypes.func,
  onCloseItem: _react.PropTypes.func,
  isAdminMode: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.bool]),
  crValueMoving: _react.PropTypes.func
} : void 0;
exports.default = AreaChartItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\AreaChartItem.js.map