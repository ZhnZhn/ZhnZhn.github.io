"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _useBool = require("../hooks/useBool");
var _fUseKey = require("../hooks/fUseKey");
var _useHmInstance = _interopRequireDefault(require("./useHmInstance"));
var _useInitialWidth = _interopRequireDefault(require("./useInitialWidth"));
var _useChartContainerMenuMore = _interopRequireDefault(require("./useChartContainerMenuMore"));
var _useSetActiveCheckBox = _interopRequireDefault(require("./useSetActiveCheckBox"));
var _useCompareTo = _interopRequireDefault(require("./useCompareTo"));
var _crChartContainerStyle = _interopRequireDefault(require("./crChartContainerStyle"));
var _itemStore = require("../../flux/stores/itemStore");
var _Comp = _interopRequireDefault(require("../Comp"));
var _ModalCompareTo = _interopRequireDefault(require("./ModalCompareTo"));
var _ChartList = _interopRequireDefault(require("./ChartList"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_SCROLL_ITEMS = (0, _styleFn.crScrollYCn)('scroll-items'),
  CL_MENU_MORE = "popup-menu charts__menu-more el-b"

  //, INITIAL_WIDTH = 635
  ,
  MAX_WIDTH = 1200,
  STEP = 10,
  S_BR_CAPTION = {
    paddingTop: 2,
    paddingLeft: 2
  },
  S_SVG_MORE = {
    position: 'relative',
    top: -1
  },
  S_CAPTION = {
    paddingTop: 7
  },
  S_SVG_RESIZE = {
    position: 'relative',
    top: -3
  };
const _isDataForContainer = (data, chartType) => data === chartType || data && data.chartType === chartType;
const _hasBtsResize = (refEl, initialWidth, caption) => {
  const _style = (0, _uiApi.getRefElementStyle)(refEl),
    _widthEl = _style ? parseInt(_style.width, 10) || initialWidth : initialWidth;
  return _widthEl > caption.length * 10 + 155;
};
const DF_ONS_SET_ACTIVE = () => {};
const ChartContainer = props => {
  const {
      chartType,
      browserType,
      contWidth,
      caption,
      isAdminMode,
      onCloseContainer,
      onCloseItem,
      onSetActive = DF_ONS_SET_ACTIVE,
      updateMovingValues
    } = props,
    _isAdminMode = isAdminMode(),
    _refSpComp = (0, _uiApi.useRef)(),
    [state, setState] = (0, _uiApi.useState)(() => ({
      configs: (0, _itemStore.getConfigs)(chartType)
    })),
    {
      configs
    } = state,
    [isShow, showChartContainer, hideChartContainer] = (0, _useBool.useBool)(true)

    /*eslint-disable react-hooks/exhaustive-deps */,
    _hHideChartContainer = (0, _uiApi.useCallback)(() => {
      onCloseContainer();
      hideChartContainer();
    }, [])
    // onCloseContainer, hideChartContainer
    /*eslint-enable react-hooks/exhaustive-deps */,
    _hKeyDown = (0, _fUseKey.useKeyEscape)(_hHideChartContainer),
    [isCompareTo, _showCompareTo, _hideCompareTo] = (0, _useBool.useBool)(),
    [isMenuMore, _showMenuMore, _hideMenuMore] = (0, _useBool.useBool)(),
    [_initialWidthStyle, _INITIAL_WIDTH, _MIN_WIDTH] = (0, _useInitialWidth.default)(contWidth),
    [_hmCharts, _refChartFn] = (0, _useHmInstance.default)(),
    [_refRootElement, _refResize, _modelMore, _hResizeAfter] = (0, _useChartContainerMenuMore.default)(_isAdminMode, props, _INITIAL_WIDTH, _MIN_WIDTH, STEP, _hmCharts, _showCompareTo),
    _compareTo = (0, _useCompareTo.default)(_hmCharts, updateMovingValues),
    [_hSetActive, _hSetNotActive] = (0, _useSetActiveCheckBox.default)(chartType, browserType, onSetActive);
  (0, _itemStore.useMsItemLoaded)(msItemLoaded => {
    if (msItemLoaded && _isDataForContainer(msItemLoaded, chartType)) {
      if (msItemLoaded.isShow) {
        ((0, _uiApi.getRefValue)(_refSpComp) || {}).scrollTop = 0;
        setState({
          configs: msItemLoaded.configs
        });
        showChartContainer();
      } else {
        _hHideChartContainer();
      }
    }
  });
  const [_style, _className] = (0, _crChartContainerStyle.default)(isShow);

  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ...(0, _a11yFn.crPresentationRole)(isShow),
    ref: _refRootElement,
    className: _className,
    style: {
      ..._initialWidthStyle,
      ..._style
    },
    onKeyDown: _hKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ModalSlider, {
      isShow: isMenuMore,
      className: CL_MENU_MORE,
      model: _modelMore,
      onClose: _hideMenuMore
    }), _isAdminMode && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalCompareTo.default, {
      isShow: isCompareTo,
      onClose: _hideCompareTo,
      onCompareTo: _compareTo
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.BrowserCaption, {
      style: S_BR_CAPTION,
      onMore: _showMenuMore,
      onCheck: _hSetActive,
      onUnCheck: _hSetNotActive,
      caption: caption,
      captionStyle: S_CAPTION,
      svgMoreStyle: S_SVG_MORE,
      onClose: _hHideChartContainer,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.SvgHrzResize, {
        refEl: _refResize,
        elementRef: _refRootElement,
        isBts: _hasBtsResize(_refRootElement, _INITIAL_WIDTH, caption),
        style: S_SVG_RESIZE,
        initWidth: _INITIAL_WIDTH,
        minWidth: _MIN_WIDTH,
        maxWidth: MAX_WIDTH,
        step: STEP,
        onResizeAfter: _hResizeAfter
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ScrollPane, {
      refEl: _refSpComp,
      className: CL_SCROLL_ITEMS,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartList.default, {
        refChartFn: _refChartFn,
        isAdminMode: isAdminMode,
        configs: configs,
        chartType: chartType,
        browserType: browserType,
        onCloseItem: onCloseItem
      })
    })]
  });
};
var _default = exports.default = ChartContainer;
//# sourceMappingURL=ChartContainer.js.map