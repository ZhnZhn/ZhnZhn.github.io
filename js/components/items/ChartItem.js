"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));

var _useProperty = _interopRequireDefault(require("../hooks/useProperty"));

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useBool = _interopRequireDefault(require("../hooks/useBool"));

var _useVm = _interopRequireDefault(require("./useVm"));

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

const _isAnimateReflow = _has.default.wideWidth(),
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

const ChartItem = (0, _memoEqual.default)( /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
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
    onToTop
  } = _ref;
  const [_refVm, compareTo] = (0, _useVm.default)(),
        [_hLoaded, getMainChart] = (0, _useProperty.default)(),
        [hasError, _hError] = (0, _useBool.default)(),
        [isShowChart, showChart, hideChart] = (0, _useBool.default)(true),
        isShowInfo = !isShowChart,
        [isOpen, toggleOpen] = (0, _useToggle.default)(true),
        [isShowLegend, toggleLegend] = (0, _useToggle.default)(),
        [isShowToolbar, toggleToolbar] = (0, _useToggle.default)(true),
        [itemCaption] = (0, _react.useState)(() => _itemCaption || caption || ''),
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
        [mfiConfigs, _addMfi, _removeMfi] = (0, _useMiniConfigs.default)(),
        [miniTitles, _hMiniChart] = (0, _useMiniTitles.default)(),
        isShowAbs = miniTitles.length === 0
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        [_hToggleSeria, _hClickInfo, _crValueMoving, _moreModel] = (0, _react.useMemo)(() => [item => {
    getMainChart().zhToggleSeria(item.index);
  }, () => {
    hideChart();
    toggleLegend(false);
  }, (prev, dateTo) => crValueMoving(getMainChart(), prev, dateTo), () => (0, _ChartItemMore.default)(toggleToolbar, onToTop, hideCaption)], []) // getMainChart
  // hideChart, toggleLegend
  // getMainChart, crValueMoving
  // toggleToolbar, onToTop, hideCaption

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        [isCaption, showCaption, hideCaption] = (0, _useCaption.default)(getMainChart, toggleToolbar),
        _zhMiniConfigs = (0, _react.useMemo)(() => _arrangeConfigsBy(zhMiniConfigs, miniTitles, MINI_CONFIGS_ID_PN), [zhMiniConfigs, miniTitles]);
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(() => {
    const mainChart = getMainChart();

    if (mainChart) {
      mainChart.zhUpdateSpacing(isShowAbs);
    }
  }, [isShowAbs]); // getMainChart

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useImperativeHandle)(ref, () => ({
    compareTo,
    hideCaption,
    showCaption,
    reflowChart: width => {
      const mainChart = getMainChart();

      if (mainChart) {
        mainChart.zhReflowCharts(_isAnimateReflow, width);
      }
    }
  }), []); // compareTo, hideCaption, showCaption, getMainChart

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
}));
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
  onToTop: PropTypes.func
}
*/

var _default = ChartItem;
exports.default = _default;
//# sourceMappingURL=ChartItem.js.map