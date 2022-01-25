"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _has = _interopRequireDefault(require("../has"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ChartToolBar = _interopRequireDefault(require("../toolbars/ChartToolBar"));

var _ChartItemMore = _interopRequireDefault(require("./ChartItemMore"));

var _Header = _interopRequireDefault(require("./Header"));

var _ChartLegend = _interopRequireDefault(require("./ChartLegend"));

var _MiniCharts = _interopRequireDefault(require("./MiniCharts"));

var _PanelDataInfo = _interopRequireDefault(require("./PanelDataInfo"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const {
  ShowHide,
  ErrorBoundary,
  MsgRenderErr,
  HighchartWrapper
} = _Comp.default;
const CL_CHART_ITEM = 'chart-item',
      S_TAB_DIV = {
  position: 'relative',
  backgroundColor: 'transparent',
  height: 30
},
      S_SHOW_HIDE = {
  marginLeft: 8
},
      S_WRAPPER = {
  marginTop: 6
},
      S_DATA_SOURCE = {
  position: 'absolute',
  left: 5,
  bottom: 0,
  color: '#909090',
  fontSize: '11px'
};

const _isArr = Array.isArray,
      _isNarrowWidth = !_has.default.wideWidth(),
      MINI_CONFIGS_ID_PN = "btTitle";

const _crMiniTitles = (miniTitles, btTitle) => {
  return miniTitles.indexOf(btTitle) === -1 ? [btTitle, ...miniTitles] : miniTitles.filter(t => t !== btTitle);
};

const _arrangeConfigsBy = (configs, configIds, idPropName) => {
  const _hmConfigs = (configs || []).reduce((hm, config) => {
    hm[config[idPropName]] = config;
    return hm;
  }, {});

  return configIds.reduce((arrangedConfigs, id) => {
    arrangedConfigs.push(_hmConfigs[id]);
    return arrangedConfigs;
  }, []);
};

const _toggle = (comp, propName) => {
  comp.setState(prevState => ({
    [propName]: !prevState[propName]
  }));
};

const _callChartMethod = function (comp, methodName) {
  const _chart = comp.getMainChart();

  if (_chart) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    _chart[methodName](...args);
  }
};

const _reflowCharts = (mainChart, width, ChartFn) => {
  if (mainChart) {
    const _isAnimate = !_isNarrowWidth && mainChart.zhIsAnimation(),
          zhDetailCharts = mainChart.zhGetDetailCharts();

    mainChart.setSize(width, void 0, _isAnimate);

    if (_isArr(zhDetailCharts)) {
      const spacingLeft = ChartFn.calcYAxisOffset(mainChart);
      zhDetailCharts.forEach(chart => {
        if (spacingLeft) {
          chart.update({
            chart: {
              spacingLeft
            }
          }, false);
        }

        chart.setSize(width, void 0, _isAnimate);
      });
    }
  }
};

class ChartItem extends _react.Component {
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
    onCloseItem: PropTypes.func,
    isAdminMode: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    crValueMoving: PropTypes.func,
    onZoom: PropTypes.func
  }
  */
  constructor(props) {
    super(props);

    this._hError = () => {
      this.setState({
        hasError: true
      });
    };

    this.setItemCaption = str => {
      this.setState({
        itemCaption: str
      });
    };

    this.setDataSource = strDataSource => {
      this._dataSourceEl = /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: S_DATA_SOURCE,
        children: strDataSource
      });
      this.forceUpdate();
    };

    this._hLoaded = chart => this.mainChart = chart;

    this.getMainChart = () => this.mainChart;

    this._hToggleSeria = item => {
      this.mainChart.zhToggleSeria(item.index);
    };

    this._hClickInfo = () => {
      this.setState({
        isShowInfo: true,
        isShowChart: false,
        isShowLegend: false
      });
    };

    this._hClickChart = () => {
      this.setState({
        isShowChart: true,
        isShowInfo: false
      });
    };

    this._hCheckBox = (isCheck, checkBox) => {
      const {
        chartType,
        onSetActive
      } = this.props;
      checkBox.chartType = chartType;
      onSetActive(isCheck, checkBox, this.mainChart);
    };

    this._addMfi = (config, id) => {
      this.setState(prevState => {
        prevState.mfiConfigs.push({
          config,
          id
        });
        return prevState;
      });
    };

    this._removeMfi = id => {
      this.setState(prevState => {
        prevState.mfiConfigs = prevState.mfiConfigs.filter(c => c.id !== id);
        return prevState;
      });
    };

    this._hClickConfig = () => {
      const {
        caption,
        onShowConfigDialog
      } = this.props;
      onShowConfigDialog({
        caption,
        chart: this.mainChart,
        setItemCaption: this.setItemCaption,
        setDataSource: this.setDataSource,
        onToggleToolbar: this._hToggleToolbar
      });
    };

    this._crValueMoving = (prev, dateTo) => {
      return this.props.crValueMoving(this.mainChart, prev, dateTo);
    };

    this._hMiniChart = btTitle => {
      const miniTitles = _crMiniTitles(this.state.miniTitles, btTitle),
            isShowAbs = miniTitles.length === 0 ? true : false;

      this.setState({
        miniTitles,
        isShowAbs
      });
    };

    this._refVm = /*#__PURE__*/(0, _react.createRef)();
    this._hToggleOpen = _toggle.bind(null, this, 'isOpen');
    this._hClickLegend = _toggle.bind(null, this, 'isShowLegend');
    this._hToggleToolbar = _toggle.bind(null, this, 'isShowToolbar');
    this._moreModel = (0, _ChartItemMore.default)(this, {
      onToggle: this._hToggleToolbar,
      onToTop: props.onToTop,
      onHideCaption: this.hideCaption
    });
    this._hLoadedMiniChart = _callChartMethod.bind(null, this, 'zhAddDetailChart');
    this._hUnLoadedMiniChart = _callChartMethod.bind(null, this, 'zhRemoveDetailChart');
    this._fnOnCheck = this._hCheckBox.bind(this, true);
    this._fnOnUnCheck = this._hCheckBox.bind(this, false);

    const {
      config: _config,
      caption: _caption
    } = props,
          {
      zhConfig
    } = _config || {},
          {
      dataSource,
      itemCaption
    } = zhConfig || {},
          _itemCaption = itemCaption || _caption || '';

    this._dataSourceEl = /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_DATA_SOURCE,
      children: dataSource || ''
    });
    this.state = {
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
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      isShowAbs
    } = this.state,
          mainChart = this.mainChart;

    if (isShowAbs !== prevState.isShowAbs && mainChart) {
      mainChart.update(this.props.ChartFn.crMetricConfig(mainChart, isShowAbs));
    }
  }

  render() {
    const {
      config,
      onCloseItem,
      isAdminMode,
      onAddToWatch,
      onZoom,
      onCopy,
      onPasteTo
    } = this.props,
          {
      valueMoving,
      info,
      zhConfig,
      zhMiniConfigs
    } = config || {},
          {
      itemTime,
      legend
    } = zhConfig || {},
          {
      isOpen,
      isShowChart,
      isShowInfo,
      isShowLegend,
      isShowAbs,
      isCaption,
      itemCaption,
      mfiConfigs,
      miniTitles,
      hasError,
      isShowToolbar
    } = this.state,
          _zhMiniConfigs = _arrangeConfigsBy(zhMiniConfigs, miniTitles, MINI_CONFIGS_ID_PN);

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_CHART_ITEM,
      children: [isCaption && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
        isOpen: isOpen,
        isAdminMode: isAdminMode,
        itemCaption: itemCaption,
        itemTime: itemTime,
        valueMoving: valueMoving,
        moreModel: this._moreModel,
        onCheck: this._fnOnCheck,
        onUnCheck: this._fnOnUnCheck,
        onToggle: this._hToggleOpen,
        onClose: onCloseItem,
        crValueMoving: this._crValueMoving,
        refVm: this._refVm
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(ShowHide, {
        isShow: isOpen,
        withoutAnimation: true,
        style: S_SHOW_HIDE,
        children: [isShowChart && /*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
          isShow: isShowToolbar,
          withoutAnimation: true,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartToolBar.default, {
            style: S_TAB_DIV,
            hasError: hasError,
            config: config,
            getChart: this.getMainChart,
            onMiniChart: this._hMiniChart,
            onAddMfi: this._addMfi,
            onRemoveMfi: this._removeMfi,
            onClickLegend: this._hClickLegend,
            onAddToWatch: onAddToWatch,
            onClickInfo: this._hClickInfo,
            onClickConfig: this._hClickConfig,
            onCopy: onCopy,
            onPasteTo: onPasteTo,
            onZoom: onZoom
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ErrorBoundary, {
          FallbackComp: /*#__PURE__*/(0, _jsxRuntime.jsx)(MsgRenderErr, {
            isShow: isShowChart,
            msg: "chart"
          }),
          onError: this._hError,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
            isShow: isShowChart,
            withoutAnimation: true,
            style: S_WRAPPER,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(HighchartWrapper, {
              config: config,
              isShowAbs: isShowAbs,
              absComp: this._dataSourceEl,
              onLoaded: this._hLoaded
            })
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PanelDataInfo.default, {
          isShow: isShowInfo,
          info: info,
          zhInfo: zhConfig,
          onClickChart: this._hClickChart
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartLegend.default, {
          isShow: isShowLegend,
          legend: legend,
          onClickItem: this._hToggleSeria
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MiniCharts.default, {
          withoutAnimation: true,
          configs: mfiConfigs,
          absComp: this._dataSourceEl,
          onLoaded: this._hLoadedMiniChart,
          onWillUnLoaded: this._hUnLoadedMiniChart
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MiniCharts.default, {
          withoutAnimation: true,
          configs: _zhMiniConfigs,
          idPropName: MINI_CONFIGS_ID_PN,
          absComp: this._dataSourceEl,
          onLoaded: this._hLoadedMiniChart,
          onWillUnLoaded: this._hUnLoadedMiniChart
        })]
      })]
    });
  }

  compareTo(dateTo) {
    const {
      current
    } = this._refVm;

    if (current) {
      return current._updateDateTo(dateTo);
    }
  }

  hideCaption() {
    const _chart = this.mainChart;

    if (_chart) {
      _chart.zhHideCaption();

      this.setState({
        isShowToolbar: false,
        isCaption: false
      });
    }
  }

  showCaption() {
    const _chart = this.mainChart;

    if (!this.state.isCaption && _chart) {
      _chart.zhShowCaption();

      this.setState({
        isShowToolbar: true,
        isCaption: true
      });
    }
  }

  reflowChart(width) {
    _reflowCharts(this.mainChart, width, this.props.ChartFn);
  }

}

var _default = ChartItem;
exports.default = _default;
//# sourceMappingURL=ChartItem.js.map