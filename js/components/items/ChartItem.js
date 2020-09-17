"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _has = _interopRequireDefault(require("../has"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ChartToolBar = _interopRequireDefault(require("../toolbars/ChartToolBar"));

var _ChartItemMore = _interopRequireDefault(require("./ChartItemMore"));

var _Header = _interopRequireDefault(require("./Header"));

var _ChartLegend = _interopRequireDefault(require("./ChartLegend"));

var _MiniCharts = _interopRequireDefault(require("./MiniCharts"));

var _PanelDataInfo = _interopRequireDefault(require("./PanelDataInfo"));

//import PropTypes from "prop-types";
var ShowHide = _Comp["default"].ShowHide,
    MsgRenderErr = _Comp["default"].MsgRenderErr,
    HighchartWrapper = _Comp["default"].HighchartWrapper;
var CL = {
  ROOT: 'chart-item'
};
var S = {
  TAB_DIV: {
    position: 'relative',
    backgroundColor: 'transparent',
    zIndex: 2,
    height: 30
  },
  SHOW_HIDE: {
    marginLeft: 8
  },
  WRAPPER: {
    marginTop: 6
  },
  DATA_SOURCE: {
    position: 'absolute',
    left: 5,
    bottom: 0,
    color: '#909090',
    fontSize: '11px'
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _isNarrowWidth = !_has["default"].wideWidth();

var ChartItem = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ChartItem, _Component);

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
    crValueMoving: PropTypes.func,
    onZoom: PropTypes.func
  }
  */
  function ChartItem(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.hideCaption = function () {
      if (_this.mainChart) {
        _this.mainChart.zhHideCaption();

        _this.setState({
          isShowToolbar: false,
          isCaption: false
        });
      }
    };

    _this.showCaption = function () {
      if (!_this.state.isCaption && _this.mainChart) {
        _this.mainChart.zhShowCaption();

        _this.setState({
          isShowToolbar: true,
          isCaption: true
        });
      }
    };

    _this.setItemCaption = function (str) {
      _this.setState({
        itemCaption: str
      });
    };

    _this.setDataSource = function (strDataSource) {
      _this._dataSourceEl = /*#__PURE__*/_react["default"].createElement("div", {
        style: S.DATA_SOURCE
      }, strDataSource);

      _this.forceUpdate();
    };

    _this._hLoaded = function (chart) {
      return _this.mainChart = chart;
    };

    _this.getMainChart = function () {
      return _this.mainChart;
    };

    _this._handleLoadedMiniChart = function (metricChart) {
      if (_this.mainChart) {
        _this.mainChart.zhAddDetailChart(metricChart);
      }
    };

    _this._handleUnLoadedMiniChart = function (objChart) {
      if (_this.mainChart) {
        _this.mainChart.zhRemoveDetailChart(objChart);
      }
    };

    _this._toggle = function (propName) {
      _this.setState(function (prevState) {
        var _ref;

        return _ref = {}, _ref[propName] = !prevState[propName], _ref;
      });
    };

    _this._handleToggleSeria = function (item) {
      _this.mainChart.zhToggleSeria(item.index);
    };

    _this._handleClick2H = function () {
      _this.mainChart.zhToggle2H();
    };

    _this._handleZoom = function () {
      var onZoom = _this.props.onZoom;

      if (_isFn(onZoom)) {
        onZoom({
          chart: _this.mainChart
        });
      }
    };

    _this._handleAddToWatch = function () {
      var _this$props = _this.props,
          caption = _this$props.caption,
          config = _this$props.config,
          onAddToWatch = _this$props.onAddToWatch;
      onAddToWatch({
        caption: caption,
        config: config
      });
    };

    _this._handleCopy = function () {
      _this.props.onCopy(_this.mainChart);
    };

    _this._handlePasteTo = function () {
      _this.props.onPasteToDialog({
        toChart: _this.mainChart,
        fromChart: _this.props.getCopyFromChart()
      });
    };

    _this._toggleMinMax = function () {
      _this.mainChart.zhToggleMinMaxLines();
    };

    _this._handleClickInfo = function () {
      _this.setState({
        isShowInfo: true,
        isShowChart: false,
        isShowLegend: false
      });
    };

    _this._handleClickChart = function () {
      _this.setState({
        isShowChart: true,
        isShowInfo: false
      });
    };

    _this._handleCheckBox = function (isCheck, checkBox) {
      var _this$props2 = _this.props,
          chartType = _this$props2.chartType,
          onSetActive = _this$props2.onSetActive;
      checkBox.chartType = chartType;
      onSetActive(isCheck, checkBox, _this.mainChart);
    };

    _this._addMfi = function (config, id) {
      _this.setState(function (prevState) {
        prevState.mfiConfigs.push({
          config: config,
          id: id
        });
        return prevState;
      });
    };

    _this._removeMfi = function (id) {
      _this.setState(function (prevState) {
        prevState.mfiConfigs = prevState.mfiConfigs.filter(function (c) {
          return c.id !== id;
        });
        return prevState;
      });
    };

    _this._handleClickConfig = function () {
      var _this$props3 = _this.props,
          caption = _this$props3.caption,
          onShowConfigDialog = _this$props3.onShowConfigDialog;
      onShowConfigDialog({
        caption: caption,
        chart: _this.mainChart,
        setItemCaption: _this.setItemCaption,
        setDataSource: _this.setDataSource,
        onToggleToolbar: _this._handleToggleToolbar
      });
    };

    _this._crValueMoving = function (prev, dateTo) {
      return _this.props.crValueMoving(_this.mainChart, prev, dateTo);
    };

    _this._regCompVm = function (comp) {
      _this._compVm = comp;
    };

    _this._handleMiniChart = function (btTitle) {
      var ChartFn = _this.props.ChartFn;

      _this.setState(function (prevState) {
        var _titles = prevState.miniTitles,
            _t = _titles.find(function (t) {
          return t === btTitle;
        });

        prevState.miniTitles = _t ? _titles.filter(function (t) {
          return t !== btTitle;
        }) : [btTitle].concat(_titles);
        prevState.isShowAbs = prevState.miniTitles.length === 0 ? true : false;

        _this.mainChart.update(ChartFn.arMetricOption(_this.mainChart, prevState.isShowAbs));

        return prevState;
      });
    };

    _this._createChartToolBar = function (config, withoutAnimation) {
      var _this$state = _this.state,
          hasError = _this$state.hasError,
          isShowToolbar = _this$state.isShowToolbar;
      return /*#__PURE__*/_react["default"].createElement(ShowHide, {
        isShow: isShowToolbar,
        withoutAnimation: withoutAnimation
      }, /*#__PURE__*/_react["default"].createElement(_ChartToolBar["default"], {
        hasError: hasError,
        style: S.TAB_DIV,
        config: config,
        onMiniChart: _this._handleMiniChart,
        getChart: _this.getMainChart,
        onAddMfi: _this._addMfi,
        onRemoveMfi: _this._removeMfi,
        onClickLegend: _this._handleClickLegend,
        onClick2H: _this._handleClick2H,
        onAddToWatch: _this._handleAddToWatch,
        onClickInfo: _this._handleClickInfo,
        onClickConfig: _this._handleClickConfig,
        onCopy: _this._handleCopy,
        onPasteTo: _this._handlePasteTo,
        onMinMax: _this._toggleMinMax,
        onZoom: _this._handleZoom
      }));
    };

    _this._handleToggleOpen = _this._toggle.bind((0, _assertThisInitialized2["default"])(_this), 'isOpen');
    _this._handleClickLegend = _this._toggle.bind((0, _assertThisInitialized2["default"])(_this), 'isShowLegend');
    _this._handleToggleToolbar = _this._toggle.bind((0, _assertThisInitialized2["default"])(_this), 'isShowToolbar');
    _this._moreModel = (0, _ChartItemMore["default"])((0, _assertThisInitialized2["default"])(_this), {
      onToggle: _this._handleToggleToolbar,
      onToTop: props.onToTop,
      onHideCaption: _this.hideCaption
    });
    _this._fnOnCheck = _this._handleCheckBox.bind((0, _assertThisInitialized2["default"])(_this), true);
    _this._fnOnUnCheck = _this._handleCheckBox.bind((0, _assertThisInitialized2["default"])(_this), false);

    var _props$config = props.config,
        _config = _props$config === void 0 ? {} : _props$config,
        _props$caption = props.caption,
        _caption = _props$caption === void 0 ? '' : _props$caption,
        _config$zhConfig = _config.zhConfig,
        zhConfig = _config$zhConfig === void 0 ? {} : _config$zhConfig,
        _zhConfig$dataSource = zhConfig.dataSource,
        dataSource = _zhConfig$dataSource === void 0 ? '' : _zhConfig$dataSource,
        itemCaption = zhConfig.itemCaption,
        _itemCaption = itemCaption || _caption;

    _this._dataSourceEl = /*#__PURE__*/_react["default"].createElement("div", {
      style: S.DATA_SOURCE
    }, dataSource);
    _this.state = {
      hasError: false,
      isOpen: true,
      isShowToolbar: true,
      isShowLegend: false,
      isShowChart: true,
      isShowInfo: false,
      itemCaption: _itemCaption,
      mfiConfigs: [],
      isShowAbs: true,
      miniTitles: [],
      isCaption: true
    };
    return _this;
  }

  var _proto = ChartItem.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      return false;
    }

    return true;
  };

  ChartItem.getDerivedStateFromError = function getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }
  /*
  componentDidCatch(error, errMsg){
  }
  */
  ;

  _proto.compareTo = function compareTo(dateTo) {
    if (this._compVm) {
      return this._compVm._updateDateTo(dateTo);
    }
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        caption = _this$props4.caption,
        _this$props4$config = _this$props4.config,
        config = _this$props4$config === void 0 ? {} : _this$props4$config,
        onCloseItem = _this$props4.onCloseItem,
        isAdminMode = _this$props4.isAdminMode,
        _config$zhConfig2 = config.zhConfig,
        zhConfig = _config$zhConfig2 === void 0 ? {} : _config$zhConfig2,
        zhMiniConfigs = config.zhMiniConfigs,
        itemTime = zhConfig.itemTime,
        legend = zhConfig.legend,
        withoutAnimation = zhConfig.withoutAnimation,
        _this$state2 = this.state,
        hasError = _this$state2.hasError,
        isOpen = _this$state2.isOpen,
        isShowChart = _this$state2.isShowChart,
        isShowInfo = _this$state2.isShowInfo,
        isShowLegend = _this$state2.isShowLegend,
        itemCaption = _this$state2.itemCaption,
        mfiConfigs = _this$state2.mfiConfigs,
        isShowAbs = _this$state2.isShowAbs,
        miniTitles = _this$state2.miniTitles,
        isCaption = _this$state2.isCaption,
        _withoutAnimation = _isNarrowWidth || withoutAnimation;

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: CL.ROOT
    }, isCaption && /*#__PURE__*/_react["default"].createElement(_Header["default"], {
      isOpen: isOpen,
      moreModel: this._moreModel,
      onCheck: this._fnOnCheck,
      onUnCheck: this._fnOnUnCheck,
      itemCaption: itemCaption,
      itemTitle: caption,
      itemTime: itemTime,
      onToggle: this._handleToggleOpen,
      valueMoving: config.valueMoving,
      onClose: onCloseItem,
      isAdminMode: isAdminMode,
      crValueMoving: this._crValueMoving,
      regCompVm: this._regCompVm
    }), /*#__PURE__*/_react["default"].createElement(ShowHide, {
      isShow: isOpen,
      withoutAnimation: _withoutAnimation,
      style: S.SHOW_HIDE
    }, isShowChart && this._createChartToolBar(config, _withoutAnimation), hasError ? /*#__PURE__*/_react["default"].createElement(MsgRenderErr, {
      isShow: isShowChart,
      msg: "chart"
    }) : /*#__PURE__*/_react["default"].createElement(HighchartWrapper, {
      isShow: isShowChart,
      style: S.WRAPPER,
      config: config,
      isShowAbs: isShowAbs,
      absComp: this._dataSourceEl,
      onLoaded: this._hLoaded
    }), /*#__PURE__*/_react["default"].createElement(_PanelDataInfo["default"], {
      isShow: isShowInfo,
      info: config.info,
      zhInfo: config.zhConfig,
      onClickChart: this._handleClickChart
    }), /*#__PURE__*/_react["default"].createElement(_ChartLegend["default"], {
      isShow: isShowLegend,
      legend: legend,
      onClickItem: this._handleToggleSeria
    }), /*#__PURE__*/_react["default"].createElement(_MiniCharts["default"], {
      withoutAnimation: _withoutAnimation,
      configs: mfiConfigs,
      absComp: this._dataSourceEl,
      onLoaded: this._handleLoadedMiniChart,
      onWillUnLoaded: this._handleUnLoadedMiniChart
    }), /*#__PURE__*/_react["default"].createElement(_MiniCharts["default"], {
      withoutAnimation: _withoutAnimation,
      configs: zhMiniConfigs,
      idPropName: "btTitle",
      ids: miniTitles,
      absComp: this._dataSourceEl,
      onLoaded: this._handleLoadedMiniChart,
      onWillUnLoaded: this._handleUnLoadedMiniChart
    })));
  };

  _proto.reflowChart = function reflowChart(width) {
    if (this.mainChart) {
      var _isAnimate = !_isNarrowWidth && this.mainChart.zhIsAnimation(),
          zhDetailCharts = this.mainChart.zhGetDetailCharts();

      this.mainChart.setSize(width, undefined, _isAnimate);

      if (Array.isArray(zhDetailCharts)) {
        var ChartFn = this.props.ChartFn,
            spacingLeft = ChartFn.arCalcDeltaYAxis(this.mainChart);
        zhDetailCharts.forEach(function (chart) {
          if (spacingLeft) {
            chart.update({
              chart: {
                spacingLeft: spacingLeft
              }
            }, false);
          }

          chart.setSize(width, undefined, _isAnimate);
        });
      }
    }
  };

  return ChartItem;
}(_react.Component);

var _default = ChartItem;
exports["default"] = _default;
//# sourceMappingURL=ChartItem.js.map