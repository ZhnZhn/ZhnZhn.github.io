'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp, _initialiseProps;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _safeGet = require('../../utils/safeGet');

var _safeGet2 = _interopRequireDefault(_safeGet);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _HighchartWrapper = require('../zhn/HighchartWrapper');

var _HighchartWrapper2 = _interopRequireDefault(_HighchartWrapper);

var _Legend = require('../zhn/Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _AreaMore = require('./AreaMore');

var _AreaMore2 = _interopRequireDefault(_AreaMore);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _ChartToolBar = require('./ChartToolBar');

var _ChartToolBar2 = _interopRequireDefault(_ChartToolBar);

var _MiniCharts = require('./MiniCharts');

var _MiniCharts2 = _interopRequireDefault(_MiniCharts);

var _PanelDataInfo = require('./PanelDataInfo');

var _PanelDataInfo2 = _interopRequireDefault(_PanelDataInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  ROOT: 'chart-item'
};

var S = {
  TAB_DIV: {
    position: 'relative',
    height: '30px',
    backgroundColor: 'transparent',
    zIndex: 2
  },
  SHOW_HIDE: {
    marginLeft: '8px'
  },
  WRAPPER: {
    marginTop: '6px'
  },
  DATA_SOURCE: {
    position: 'absolute',
    left: '5px',
    bottom: '0px',
    color: '#909090',
    fontSize: '11px'
  }
};

var AreaChartItem = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(AreaChartItem, _Component);

  /*
  static propTypes = {
    caption: PropTypes.string,
    chartType: PropTypes.string,
    config: PropTypes.shape({
      zhConfig: PropTypes.shape({
        dataSource: PropTypes.string,
        itemCaption: PropTypes.string
      }),
      zhMiniConfigs: PropTypes.arrayOf(
        PropTypes.shape({
          btTitle: PropTypes.string,
          config: PropTypes.object
      }))
    }),
    onAddToWatch: PropTypes.func,
    onSetActive: PropTypes.func,
    onShowConfigDialog: PropTypes.func,
    onCloseItem: PropTypes.func,
    isAdminMode: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    crValueMoving: PropTypes.func
  }
  */

  function AreaChartItem(props) {
    (0, _classCallCheck3.default)(this, AreaChartItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AreaChartItem.__proto__ || Object.getPrototypeOf(AreaChartItem)).call(this));

    _initialiseProps.call(_this);

    _this._handleToggleOpen = _this._toggle.bind(_this, 'isOpen');
    _this._handleClickLegend = _this._toggle.bind(_this, 'isShowLegend');
    _this._handleToggleToolbar = _this._toggle.bind(_this, 'isShowToolbar');

    _this._moreModel = (0, _AreaMore2.default)(_this, {
      onToggle: _this._handleToggleToolbar,
      onToTop: props.onToTop
    });

    _this.is2H = false;
    _this._fnOnCheck = _this._handleCheckBox.bind(_this, true);
    _this._fnOnUnCheck = _this._handleCheckBox.bind(_this, false);

    var _props$config = props.config,
        config = _props$config === undefined ? {} : _props$config,
        _props$caption = props.caption,
        caption = _props$caption === undefined ? '' : _props$caption,
        _config$zhConfig = config.zhConfig,
        zhConfig = _config$zhConfig === undefined ? {} : _config$zhConfig,
        _zhConfig$dataSource = zhConfig.dataSource,
        dataSource = _zhConfig$dataSource === undefined ? '' : _zhConfig$dataSource,
        itemCaption = zhConfig.itemCaption,
        id = zhConfig.id,
        _itemCaption = itemCaption ? itemCaption : caption;

    _this._chartId = id;

    _this._dataSourceEl = _react2.default.createElement(
      'div',
      { style: S.DATA_SOURCE },
      dataSource
    );
    _this.state = {
      isOpen: true,
      isShowToolbar: true,
      isShowLegend: false,

      isShowChart: true,
      isShowInfo: false,

      itemCaption: _itemCaption,
      mfiConfigs: [],

      isShowAbs: true,
      miniTitles: []
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
      var _props = this.props,
          caption = _props.caption,
          _props$config2 = _props.config,
          config = _props$config2 === undefined ? {} : _props$config2,
          onCloseItem = _props.onCloseItem,
          isAdminMode = _props.isAdminMode,
          _config$zhConfig2 = config.zhConfig,
          zhConfig = _config$zhConfig2 === undefined ? {} : _config$zhConfig2,
          zhMiniConfigs = config.zhMiniConfigs,
          itemTime = zhConfig.itemTime,
          _state = this.state,
          isOpen = _state.isOpen,
          isShowChart = _state.isShowChart,
          isShowInfo = _state.isShowInfo,
          itemCaption = _state.itemCaption,
          mfiConfigs = _state.mfiConfigs,
          isShowAbs = _state.isShowAbs,
          miniTitles = _state.miniTitles;


      return _react2.default.createElement(
        'div',
        { className: CL.ROOT },
        _react2.default.createElement(_Header2.default, {
          isOpen: isOpen
          //chartType={chartType}
          , moreModel: this._moreModel,
          onCheck: this._fnOnCheck,
          onUnCheck: this._fnOnUnCheck,
          itemCaption: itemCaption,
          itemTitle: caption,
          itemTime: itemTime,
          onToggle: this._handleToggleOpen,
          valueMoving: config.valueMoving,
          onClose: onCloseItem,
          isAdminMode: isAdminMode,
          crValueMoving: this._crValueMoving
        }),
        _react2.default.createElement(
          _ShowHide2.default,
          { isShow: isOpen, style: S.SHOW_HIDE },
          isShowChart && this._createChartToolBar(config),
          _react2.default.createElement(_HighchartWrapper2.default, {
            ref: this._refChartComp,
            isShow: isShowChart,
            rootStyle: S.WRAPPER,
            config: config,
            isShowAbs: isShowAbs,
            absComp: this._dataSourceEl
          }),
          _react2.default.createElement(_PanelDataInfo2.default, {
            isShow: isShowInfo,
            info: config.info,
            zhInfo: config.zhConfig,
            onClickChart: this._handleClickChart
          }),
          this._renderLegend(config),
          _react2.default.createElement(_MiniCharts2.default, {
            configs: mfiConfigs,
            absComp: this._dataSourceEl,
            onLoaded: this._handleLoadedMiniChart,
            onWillUnLoaded: this._handleUnLoadedMiniChart
          }),
          _react2.default.createElement(_MiniCharts2.default, {
            configs: zhMiniConfigs,
            idPropName: 'btTitle',
            ids: miniTitles,
            absComp: this._dataSourceEl,
            onLoaded: this._handleLoadedMiniChart,
            onWillUnLoaded: this._handleUnLoadedMiniChart
          })
        )
      );
    }
  }, {
    key: 'reflowChart',
    value: function reflowChart(width) {
      var ChartFn = this.props.ChartFn,
          spacingLeft = ChartFn.arCalcDeltaYAxis(this.mainChart),
          zhDetailCharts = this.mainChart.options.zhDetailCharts;


      this.mainChart.setSize(width, undefined, true);
      if (Array.isArray(zhDetailCharts)) {
        zhDetailCharts.forEach(function (chart) {
          if (spacingLeft) {
            chart.update({ chart: { spacingLeft: spacingLeft } }, false);
          }
          chart.setSize(width, undefined, true);
        });
      }
    }
  }]);
  return AreaChartItem;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.setItemCaption = function (str) {
    _this2.setState({ itemCaption: str });
  };

  this.setDataSource = function (strDataSource) {
    _this2._dataSourceEl = _react2.default.createElement(
      'div',
      { style: S.DATA_SOURCE },
      strDataSource
    );
    _this2.forceUpdate();
  };

  this.getMainChart = function () {
    return _this2.mainChart;
  };

  this._handleLoadedMiniChart = function (metricChart) {
    _this2.mainChart.options.zhDetailCharts.push(metricChart);
  };

  this._handleUnLoadedMiniChart = function (objChart) {
    var charts = (0, _safeGet2.default)(_this2.mainChart, 'options.zhDetailCharts');
    if (Array.isArray(charts)) {
      _this2.mainChart.options.zhDetailCharts = charts.filter(function (chart) {
        return chart !== objChart;
      });
    }
  };

  this._toggle = function (propName) {
    _this2.setState(function (prevState) {
      return (0, _defineProperty3.default)({}, propName, !prevState[propName]);
    });
  };

  this._handleToggleSeria = function (item) {
    _this2.mainChart.options.zhToggleSeria(_this2.mainChart, item);
  };

  this._handleClick2H = function () {
    var height = _this2.is2H ? _this2.mainChart.options.chart.height / 2 : _this2.mainChart.options.chart.height * 2;
    _this2.setChartHeight(height);
    _this2.is2H = !_this2.is2H;
  };

  this._handleAddToWatch = function () {
    var _props2 = _this2.props,
        caption = _props2.caption,
        config = _props2.config,
        onAddToWatch = _props2.onAddToWatch;

    onAddToWatch({ caption: caption, config: config });
  };

  this._handleCopy = function () {
    _this2.props.onCopy(_this2.mainChart);
  };

  this._handlePasteTo = function () {
    _this2.props.onPasteToDialog({
      toChart: _this2.mainChart,
      fromChart: _this2.props.getCopyFromChart(),
      ChartFn: _this2.props.ChartFn
    });
  };

  this._handleClickInfo = function () {
    _this2.setState({
      isShowInfo: true,
      isShowChart: false,
      isShowLegend: false
    });
  };

  this._handleClickChart = function () {
    _this2.setState({
      isShowChart: true,
      isShowInfo: false
    });
  };

  this._handleCheckBox = function (isCheck, checkBox) {
    var _props3 = _this2.props,
        chartType = _props3.chartType,
        onSetActive = _props3.onSetActive;

    checkBox.chartType = chartType;
    onSetActive(isCheck, checkBox, _this2.mainChart);
  };

  this._addMfi = function (config, id) {
    _this2.setState(function (prevState) {
      prevState.mfiConfigs.push({ config: config, id: id });
      return prevState;
    });
  };

  this._removeMfi = function (id) {
    _this2.setState(function (prevState) {
      prevState.mfiConfigs = prevState.mfiConfigs.filter(function (c) {
        return c.id !== id;
      });
      return prevState;
    });
  };

  this._handleClickConfig = function () {
    var _props4 = _this2.props,
        caption = _props4.caption,
        onShowConfigDialog = _props4.onShowConfigDialog;

    onShowConfigDialog({
      caption: caption,
      chart: _this2.mainChart,
      setItemCaption: _this2.setItemCaption,
      setDataSource: _this2.setDataSource,
      onToggleToolbar: _this2._handleToggleToolbar
    });
  };

  this._crValueMoving = function (prev, dateTo) {
    return _this2.props.crValueMoving(_this2.mainChart, prev, dateTo);
  };

  this._handleMiniChart = function (btTitle) {
    var ChartFn = _this2.props.ChartFn;

    _this2.setState(function (prevState) {
      var _titles = prevState.miniTitles,
          _t = _titles.find(function (t) {
        return t === btTitle;
      });
      prevState.miniTitles = _t ? _titles.filter(function (t) {
        return t !== btTitle;
      }) : [btTitle].concat((0, _toConsumableArray3.default)(_titles));
      prevState.isShowAbs = prevState.miniTitles.length === 0 ? true : false;
      _this2.mainChart.update(ChartFn.arMetricOption(_this2.mainChart, prevState.isShowAbs));
      return prevState;
    });
  };

  this._createChartToolBar = function (config) {
    var isShowToolbar = _this2.state.isShowToolbar;

    return _react2.default.createElement(
      _ShowHide2.default,
      { isShow: isShowToolbar },
      _react2.default.createElement(_ChartToolBar2.default, {
        style: S.TAB_DIV,
        chartId: _this2._chartId,
        config: config,
        onMiniChart: _this2._handleMiniChart,
        getChart: _this2.getMainChart,
        onAddMfi: _this2._addMfi,
        onRemoveMfi: _this2._removeMfi,
        onClickLegend: _this2._handleClickLegend,
        onClick2H: _this2._handleClick2H,
        onAddToWatch: _this2._handleAddToWatch,
        onClickInfo: _this2._handleClickInfo,
        onClickConfig: _this2._handleClickConfig,
        onCopy: _this2._handleCopy,
        onPasteTo: _this2._handlePasteTo
      })
    );
  };

  this._renderLegend = function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var isShowLegend = _this2.state.isShowLegend,
        _config$zhConfig3 = config.zhConfig,
        zhConfig = _config$zhConfig3 === undefined ? {} : _config$zhConfig3,
        isWithLegend = zhConfig.isWithLegend,
        legend = zhConfig.legend;

    var _compLegend = isWithLegend ? _react2.default.createElement(
      _ShowHide2.default,
      { isShow: isShowLegend },
      _react2.default.createElement(_Legend2.default, {
        legend: legend,
        onClickItem: _this2._handleToggleSeria
      })
    ) : null;

    return _compLegend;
  };

  this._refChartComp = function (comp) {
    return _this2.chartComp = comp;
  };

  this.setChartHeight = function (height) {
    _this2.mainChart.setSize(undefined, height, true);
  };
}, _temp);
exports.default = AreaChartItem;
//# sourceMappingURL=AreaChartItem.js.map