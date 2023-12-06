"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useBool = _interopRequireDefault(require("../hooks/useBool"));
var _useHmInstance = _interopRequireDefault(require("./useHmInstance"));
var _useInitialWidth = _interopRequireDefault(require("./useInitialWidth"));
var _useSetActiveCheckBox = _interopRequireDefault(require("./useSetActiveCheckBox"));
var _useCompareTo = _interopRequireDefault(require("./useCompareTo"));
var _crChartContainerStyle = _interopRequireDefault(require("./crChartContainerStyle"));
var _compStore = require("../../flux/stores/compStore");
var _itemStore = require("../../flux/stores/itemStore");
var _crModelMore = _interopRequireDefault(require("./crModelMore"));
var _forEachInstance = _interopRequireDefault(require("./forEachInstance"));
var _Comp = _interopRequireDefault(require("../Comp"));
var _ModalCompareTo = _interopRequireDefault(require("./ModalCompareTo"));
var _ChartList = _interopRequireDefault(require("./ChartList"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_SCROLL_ITEMS = (0, _styleFn.crScrollYCn)('scroll-items'),
  CL_MENU_MORE = "popup-menu charts__menu-more el-b",
  CHILD_MARGIN = 36
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
const _isFn = fn => typeof fn === "function";
const _crFnByNameArgs = function (ref, methodName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return () => {
    const _compInstance = (0, _uiApi.getRefValue)(ref);
    if (_compInstance) {
      _compInstance[methodName](...args);
    }
  };
};
const _isDataForContainer = (data, chartType) => data === chartType || data && data.chartType === chartType;
const _fReflowChartByRef = parentWidth => refItem => {
  if (_isFn(refItem.reflowChart)) {
    refItem.reflowChart(parentWidth - CHILD_MARGIN);
  }
};
const _showCaptionByRef = refItem => {
  if (_isFn(refItem.showCaption)) {
    refItem.showCaption();
  }
};
const _hasBtsResize = (refEl, initialWidth, caption) => {
  const _style = (0, _uiApi.getRefElementStyle)(refEl),
    _widthEl = _style ? parseInt(_style.width, 10) || initialWidth : initialWidth;
  return _widthEl > caption.length * 10 + 155;
};
const DF_ONS_SET_ACTIVE = () => {};
const ChartContainer = _ref => {
  let {
    chartType,
    browserType,
    contWidth,
    caption,
    isAdminMode,
    onSortBy,
    onRemoveAll,
    onCloseContainer,
    onCloseItem,
    onSetActive = DF_ONS_SET_ACTIVE,
    updateMovingValues
  } = _ref;
  const _refRootElement = (0, _uiApi.useRef)(),
    _refSpComp = (0, _uiApi.useRef)(),
    _refResize = (0, _uiApi.useRef)(),
    [_refHm, _refChartFn] = (0, _useHmInstance.default)()
    //{ isShow: false, configs: [], chartType }
    ,
    [state, setState] = (0, _uiApi.useState)(() => (0, _itemStore.getConfigs)(chartType)),
    {
      isShow,
      configs
    } = state,
    [isCompareTo, _onCompareTo, _closeCompareTo] = (0, _useBool.default)(),
    [isMenuMore, _showMenuMore, _hideMenuMore] = (0, _useBool.default)(),
    [_initialWidthStyle, _INITIAL_WIDTH, _MIN_WIDTH] = (0, _useInitialWidth.default)(contWidth)
    /*eslint-disable react-hooks/exhaustive-deps */,
    [_hHide, _hResizeAfter, _onShowCaptions] = (0, _uiApi.useMemo)(() => [() => {
      onCloseContainer();
      setState(prevState => ({
        ...prevState,
        isShow: false
      }));
    }, parentWidth => {
      (0, _forEachInstance.default)(_refHm, _fReflowChartByRef(parentWidth));
    }, () => {
      (0, _forEachInstance.default)(_refHm, _showCaptionByRef);
    }], [])
    // _hToggleMore, onCloseContainer
    // _refHm
    /*eslint-enable react-hooks/exhaustive-deps */,
    _fitToWidth = (0, _uiApi.useMemo)(() => () => {
      const {
        width
      } = (0, _uiApi.getRefElementStyle)(_refRootElement) || {};
      if (width) {
        _hResizeAfter(parseInt(width, 10));
      }
    }, [_hResizeAfter]),
    _isAdminMode = isAdminMode()
    /*eslint-disable react-hooks/exhaustive-deps */,
    _modelMore = (0, _uiApi.useMemo)(() => (0, _crModelMore.default)(_isAdminMode, {
      onMinWidth: _crFnByNameArgs(_refResize, 'toWidth', _MIN_WIDTH, true),
      onInitWidth: _crFnByNameArgs(_refResize, 'toWidth', _INITIAL_WIDTH, true),
      onPlusWidth: _crFnByNameArgs(_refResize, 'resizeBy', STEP),
      onMinusWidth: _crFnByNameArgs(_refResize, 'resizeBy', -STEP),
      onFit: _fitToWidth,
      onShowCaptions: _onShowCaptions,
      onSortBy,
      onRemoveAll,
      onCompareTo: _onCompareTo
    }), [_isAdminMode])
    // _INITIAL_WIDTH, _MIN_WIDTH
    // _fitToWidth, _onCompareTo, _onShowCaptions
    // onRemoveAll, onSortBy
    /*eslint-enable react-hooks/exhaustive-deps */,
    _compareTo = (0, _useCompareTo.default)(_refHm, updateMovingValues),
    [_hSetActive, _hSetNotActive] = (0, _useSetActiveCheckBox.default)(chartType, browserType, onSetActive);
  (0, _compStore.useMsChartCont)(msChartCont => {
    if (msChartCont && msChartCont.id === chartType) {
      _hHide();
    }
  });
  (0, _itemStore.useMsItemLoaded)(msItemLoaded => {
    if (msItemLoaded && _isDataForContainer(msItemLoaded, chartType)) {
      if (msItemLoaded.isShow) {
        ((0, _uiApi.getRefValue)(_refSpComp) || {}).scrollTop = 0;
      }
      setState(prevState => ({
        ...prevState,
        ...msItemLoaded
      }));
    }
  });
  const [_style, _className] = (0, _crChartContainerStyle.default)(isShow);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: _refRootElement,
    className: _className,
    style: {
      ..._initialWidthStyle,
      ..._style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ModalSlider, {
      isShow: isMenuMore,
      className: CL_MENU_MORE,
      model: _modelMore,
      onClose: _hideMenuMore
    }), _isAdminMode && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalCompareTo.default, {
      isShow: isCompareTo,
      onClose: _closeCompareTo,
      onCompareTo: _compareTo
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.BrowserCaption, {
      style: S_BR_CAPTION,
      onMore: _showMenuMore,
      onCheck: _hSetActive,
      onUnCheck: _hSetNotActive,
      caption: caption,
      captionStyle: S_CAPTION,
      svgMoreStyle: S_SVG_MORE,
      onClose: _hHide,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.SvgHrzResize, {
        ref: _refResize,
        isBts: _hasBtsResize(_refRootElement, _INITIAL_WIDTH, caption),
        style: S_SVG_RESIZE,
        initWidth: _INITIAL_WIDTH,
        minWidth: _MIN_WIDTH,
        maxWidth: MAX_WIDTH,
        step: STEP,
        elementRef: _refRootElement,
        onResizeAfter: _hResizeAfter
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ScrollPane, {
      ref: _refSpComp,
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