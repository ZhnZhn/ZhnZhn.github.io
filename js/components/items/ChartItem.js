"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useBool = _interopRequireDefault(require("../hooks/useBool"));

var _useVm = _interopRequireDefault(require("./useVm"));

var _useLoadChart = _interopRequireDefault(require("./useLoadChart"));

var _useSetCheckBox = _interopRequireDefault(require("./useSetCheckBox"));

var _useCaption = _interopRequireDefault(require("./useCaption"));

var _useMiniConfigs = _interopRequireDefault(require("./useMiniConfigs"));

var _useMiniTitles = _interopRequireDefault(require("./useMiniTitles"));

var _useMiniHandles = _interopRequireDefault(require("./useMiniHandles"));

var _useDataSourceEl = _interopRequireDefault(require("./useDataSourceEl"));

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
};

const _isArr = Array.isArray,
      _isNarrowWidth = !_has.default.wideWidth(),
      MINI_CONFIGS_ID_PN = "btTitle";

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

const _isNotShouldUpdate = () => true;

const ChartItem = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    caption,
    config,
    onCloseItem,
    isAdminMode,
    onAddToWatch,
    onZoom,
    onCopy,
    onPasteTo,
    chartType,
    onSetActive,
    onShowConfigDialog,
    crValueMoving,
    ChartFn,
    onToTop
  } = _ref;
  const [_refVm, compareTo] = (0, _useVm.default)(),
        [_hLoaded, getMainChart] = (0, _useLoadChart.default)(),
        [hasError, _hError] = (0, _useBool.default)(false),
        [isOpen, toggleOpen] = (0, _useToggle.default)(true),
        [isShowLegend, toggleLegend] = (0, _useToggle.default)(false),
        [isShowToolbar, toggleToolbar] = (0, _useToggle.default)(true),
        [onCheckItem, onUnCheckItem] = (0, _useSetCheckBox.default)(getMainChart, chartType, onSetActive),
        [loadMiniChart, unloadMiniChart] = (0, _useMiniHandles.default)(getMainChart);

  const {
    zhConfig,
    valueMoving,
    info,
    zhMiniConfigs
  } = config || {},
        {
    dataSource,
    itemCaption: _itemCaption,
    itemTime,
    legend
  } = zhConfig || {},
        [_dataSourceEl] = (0, _useDataSourceEl.default)(dataSource),
        [itemCaption] = (0, _react.useState)(() => _itemCaption || caption || ''),
        _hToggleSeria = (0, _react.useCallback)(item => {
    getMainChart().zhToggleSeria(item.index);
  }, [getMainChart]),
        [isShowChart, showChart, hideChart] = (0, _useBool.default)(true),
        isShowInfo = !isShowChart
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hClickInfo = (0, _react.useCallback)(() => {
    hideChart();
    toggleLegend(false);
  }, []) // hideChart, toggleLegend

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        [mfiConfigs, _addMfi, _removeMfi] = (0, _useMiniConfigs.default)(),
        [miniTitles, _hMiniChart] = (0, _useMiniTitles.default)(),
        isShowAbs = miniTitles.length === 0
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _crValueMoving = (0, _react.useCallback)((prev, dateTo) => crValueMoving(getMainChart(), prev, dateTo), []) // getMainChart, crValueMoving

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        [isCaption, showCaption, hideCaption] = (0, _useCaption.default)(getMainChart, toggleToolbar),
        _zhMiniConfigs = (0, _react.useMemo)(() => _arrangeConfigsBy(zhMiniConfigs, miniTitles, MINI_CONFIGS_ID_PN), [zhMiniConfigs, miniTitles])
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _moreModel = (0, _react.useMemo)(() => (0, _ChartItemMore.default)(toggleToolbar, onToTop, hideCaption), []); // toggleToolbar, onToTop, hideCaption

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(() => {
    const mainChart = getMainChart();

    if (mainChart) {
      mainChart.update(ChartFn.crMetricConfig(mainChart, isShowAbs));
    }
  }, [isShowAbs]); // getMainChart, ChartFn

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useImperativeHandle)(ref, () => ({
    compareTo,
    hideCaption,
    showCaption,
    reflowChart: width => {
      _reflowCharts(getMainChart(), width, ChartFn);
    }
  }), []); // compareTo, hideCaption, showCaption, getMainChart, ChartFn

  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_CHART_ITEM,
    children: [isCaption && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Header.default, {
      isOpen: isOpen,
      isAdminMode: isAdminMode,
      itemCaption: itemCaption,
      itemTime: itemTime,
      valueMoving: valueMoving,
      moreModel: _moreModel,
      onCheck: onCheckItem,
      onUnCheck: onUnCheckItem,
      onToggle: toggleOpen,
      onClose: onCloseItem,
      crValueMoving: _crValueMoving,
      refVm: _refVm
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
          getChart: getMainChart,
          onMiniChart: _hMiniChart,
          onAddMfi: _addMfi,
          onRemoveMfi: _removeMfi,
          onClickLegend: toggleLegend,
          onAddToWatch: onAddToWatch,
          onClickInfo: _hClickInfo,
          onCopy: onCopy,
          onPasteTo: onPasteTo,
          onZoom: onZoom
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ErrorBoundary, {
        FallbackComp: /*#__PURE__*/(0, _jsxRuntime.jsx)(MsgRenderErr, {
          isShow: isShowChart,
          msg: "chart"
        }),
        onError: _hError,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
          isShow: isShowChart,
          withoutAnimation: true,
          style: S_WRAPPER,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(HighchartWrapper, {
            config: config,
            isShowAbs: isShowAbs,
            absComp: _dataSourceEl,
            onLoaded: _hLoaded
          })
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PanelDataInfo.default, {
        isShow: isShowInfo,
        info: info,
        zhInfo: zhConfig,
        onClickChart: showChart
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartLegend.default, {
        isShow: isShowLegend,
        legend: legend,
        onClickItem: _hToggleSeria
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MiniCharts.default, {
        withoutAnimation: true,
        configs: mfiConfigs,
        absComp: _dataSourceEl,
        onLoaded: loadMiniChart,
        onWillUnLoaded: unloadMiniChart
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MiniCharts.default, {
        withoutAnimation: true,
        configs: _zhMiniConfigs,
        idPropName: MINI_CONFIGS_ID_PN,
        absComp: _dataSourceEl,
        onLoaded: loadMiniChart,
        onWillUnLoaded: unloadMiniChart
      })]
    })]
  });
}), _isNotShouldUpdate);
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
  onZoom: PropTypes.func,
  onCopy: PropTypes.func,
  onPasteTo: PropTypes.func,
  onToTop: PropTypes.func,
  ChartFn: PropTypes.shape({
    crMetricConfig: PropTypes.func,
    calcYAxisOffset: PropTypes.func
  })
}
*/

var _default = ChartItem;
exports.default = _default;
//# sourceMappingURL=ChartItem.js.map