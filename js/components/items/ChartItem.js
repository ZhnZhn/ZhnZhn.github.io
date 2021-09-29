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
  MsgRenderErr,
  HighchartWrapper
} = _Comp.default;
const CL_CHART_ITEM = 'chart-item';
const S = {
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

const _isFn = fn => typeof fn === 'function',
      _isArr = Array.isArray,
      _isNarrowWidth = !_has.default.wideWidth();

const _crMiniTitles = (miniTitles, btTitle) => {
  return miniTitles.indexOf(btTitle) === -1 ? [btTitle, ...miniTitles] : miniTitles.filter(t => t !== btTitle);
};

const _toggle = (comp, propName) => {
  comp.setState(prevState => ({
    [propName]: !prevState[propName]
  }));
};

const _callChartMethod = (comp, methodName, ...args) => {
  const _chart = comp.getMainChart();

  if (_chart) {
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
  constructor(props) {
    super(props);

    this.setItemCaption = str => {
      this.setState({
        itemCaption: str
      });
    };

    this.setDataSource = strDataSource => {
      this._dataSourceEl = /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: S.DATA_SOURCE,
        children: strDataSource
      });
      this.forceUpdate();
    };

    this._hLoaded = chart => this.mainChart = chart;

    this.getMainChart = () => this.mainChart;

    this._hToggleSeria = item => {
      this.mainChart.zhToggleSeria(item.index);
    };

    this._hZoom = () => {
      const {
        onZoom
      } = this.props;

      if (_isFn(onZoom)) {
        onZoom({
          chart: this.mainChart
        });
      }
    };

    this._hAddToWatch = () => {
      const {
        caption,
        config,
        onAddToWatch
      } = this.props;
      onAddToWatch({
        caption,
        config
      });
    };

    this._hCopy = () => {
      this.props.onCopy(this.mainChart);
    };

    this._hPasteTo = () => {
      this.props.onPasteToDialog({
        toChart: this.mainChart,
        fromChart: this.props.getCopyFromChart()
      });
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

    this._crChartToolBar = (config, withoutAnimation) => {
      const {
        hasError,
        isShowToolbar
      } = this.state;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
        isShow: isShowToolbar,
        withoutAnimation: withoutAnimation,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartToolBar.default, {
          hasError: hasError,
          style: S.TAB_DIV,
          config: config,
          onMiniChart: this._hMiniChart,
          getChart: this.getMainChart,
          onAddMfi: this._addMfi,
          onRemoveMfi: this._removeMfi,
          onClickLegend: this._hClickLegend,
          onClick2H: this._hClick2H,
          onAddToWatch: this._hAddToWatch,
          onClickInfo: this._hClickInfo,
          onClickConfig: this._hClickConfig,
          onCopy: this._hCopy,
          onPasteTo: this._hPasteTo,
          onMinMax: this._toggleMinMax,
          onZoom: this._hZoom
        })
      });
    };

    this._regCompVm = comp => {
      this._compVm = comp;
    };

    this._hToggleOpen = _toggle.bind(null, this, 'isOpen');
    this._hClickLegend = _toggle.bind(null, this, 'isShowLegend');
    this._hToggleToolbar = _toggle.bind(null, this, 'isShowToolbar');
    this._moreModel = (0, _ChartItemMore.default)(this, {
      onToggle: this._hToggleToolbar,
      onToTop: props.onToTop,
      onHideCaption: this.hideCaption
    });
    this._hClick2H = _callChartMethod.bind(null, this, 'zhToggle2H');
    this._toggleMinMax = _callChartMethod.bind(null, this, 'zhToggleMinMaxLines');
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
      style: S.DATA_SOURCE,
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

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }
  /*
  componentDidCatch(error, errMsg){
  }
  */


  render() {
    const {
      caption,
      config,
      onCloseItem,
      isAdminMode
    } = this.props,
          {
      valueMoving,
      info,
      zhConfig,
      zhMiniConfigs
    } = config || {},
          {
      itemTime,
      legend,
      withoutAnimation
    } = zhConfig || {},
          {
      hasError,
      isOpen,
      isShowChart,
      isShowInfo,
      isShowLegend,
      isShowAbs,
      isCaption,
      itemCaption,
      mfiConfigs,
      miniTitles
    } = this.state,
          _withoutAnimation = _isNarrowWidth || withoutAnimation;

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_CHART_ITEM,
      children: [isCaption && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
        isOpen: isOpen,
        isAdminMode: isAdminMode,
        itemCaption: itemCaption,
        itemTitle: caption,
        itemTime: itemTime,
        valueMoving: valueMoving,
        moreModel: this._moreModel,
        onCheck: this._fnOnCheck,
        onUnCheck: this._fnOnUnCheck,
        onToggle: this._hToggleOpen,
        onClose: onCloseItem,
        crValueMoving: this._crValueMoving,
        regCompVm: this._regCompVm
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(ShowHide, {
        isShow: isOpen,
        withoutAnimation: _withoutAnimation,
        style: S.SHOW_HIDE,
        children: [isShowChart && this._crChartToolBar(config, _withoutAnimation), hasError ? /*#__PURE__*/(0, _jsxRuntime.jsx)(MsgRenderErr, {
          isShow: isShowChart,
          msg: "chart"
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
          isShow: isShowChart,
          withoutAnimation: _withoutAnimation,
          style: S.WRAPPER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(HighchartWrapper, {
            config: config,
            isShowAbs: isShowAbs,
            absComp: this._dataSourceEl,
            onLoaded: this._hLoaded
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
          withoutAnimation: _withoutAnimation,
          configs: mfiConfigs,
          absComp: this._dataSourceEl,
          onLoaded: this._hLoadedMiniChart,
          onWillUnLoaded: this._hUnLoadedMiniChart
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MiniCharts.default, {
          withoutAnimation: _withoutAnimation,
          configs: zhMiniConfigs,
          idPropName: "btTitle",
          ids: miniTitles,
          absComp: this._dataSourceEl,
          onLoaded: this._hLoadedMiniChart,
          onWillUnLoaded: this._hUnLoadedMiniChart
        })]
      })]
    });
  }

  compareTo(dateTo) {
    if (this._compVm) {
      return this._compVm._updateDateTo(dateTo);
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