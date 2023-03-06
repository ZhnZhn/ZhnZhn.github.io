"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useBool = _interopRequireDefault(require("../hooks/useBool"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useListen = _interopRequireDefault(require("../hooks/useListen"));
var _useHmInstance = _interopRequireDefault(require("./useHmInstance"));
var _useInitialWidth = _interopRequireDefault(require("./useInitialWidth"));
var _useSetActiveCheckBox = _interopRequireDefault(require("./useSetActiveCheckBox"));
var _useChartContainerStyle = _interopRequireDefault(require("./useChartContainerStyle"));
var _ChartActions = require("../../flux/actions/ChartActions");
var _ComponentActions = require("../../flux/actions/ComponentActions");
var _crModelMore = _interopRequireDefault(require("./crModelMore"));
var _Comp = _interopRequireDefault(require("../Comp"));
var _ModalCompareTo = _interopRequireDefault(require("./ModalCompareTo"));
var _ChartList = _interopRequireDefault(require("./ChartList"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_SCROLL = 'scroll-container-y scroll-items',
  CL_MENU_MORE = "popup-menu charts__menu-more",
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
    top: 2
  },
  S_CAPTION = {
    position: 'relative',
    top: -1
  };
const CHAT_ACTIONS = [_ChartActions.CHAT_SHOW, _ChartActions.CHAT_LOAD_COMPLETED, _ChartActions.CHAT_CLOSE];
const _getObjectKeys = Object.keys;
const _isFn = fn => typeof fn === "function";
const _isInArray = function (arr, value) {
  if (arr === void 0) {
    arr = [];
  }
  return Boolean(~arr.indexOf(value));
};
const _crFnByNameArgs = function (ref, methodName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return () => {
    const _compInstance = ref.current;
    if (_compInstance) {
      _compInstance[methodName](...args);
    }
  };
};
const _isDataForContainer = (data, chartType) => data === chartType || data && data.chartType === chartType;
const _forEachItem = (refHm, onItem) => {
  const _hmInstances = refHm.current,
    _propNames = _getObjectKeys(_hmInstances);
  let _refInstance,
    _numberOfInstance = 0;
  _propNames.forEach(propName => {
    _refInstance = _hmInstances[propName];
    if (_refInstance) {
      _numberOfInstance += 1;
      onItem(_refInstance);
    }
  });
  return _numberOfInstance;
};
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
const DF_ONS_SET_ACTIVE = () => {};
const ChartContainer = _ref => {
  let {
    store,
    chartType,
    browserType,
    contWidth,
    caption,
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
    [_refHm, _refChartFn] = (0, _useHmInstance.default)(),
    [state, setState] = (0, _uiApi.useState)(() => ({
      isShow: false,
      configs: [],
      chartType
    })),
    {
      isShow,
      configs
    } = state,
    [isCompareTo, _onCompareTo, _closeCompareTo] = (0, _useBool.default)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    [isMore, _hToggleMore] = (0, _useToggle.default)(),
    _showMore = (0, _uiApi.useCallback)(() => {
      _hToggleMore(true);
    }, [])
    // _hToggleMore
    /*eslint-enable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */,
    _hHide = (0, _uiApi.useCallback)(() => {
      onCloseContainer();
      setState(prevState => ({
        ...prevState,
        isShow: false
      }));
    }, [])
    // onCloseContainer
    /*eslint-enable react-hooks/exhaustive-deps */,
    [_initialWidthStyle, _INITIAL_WIDTH, _MIN_WIDTH] = (0, _useInitialWidth.default)(contWidth)
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hResizeAfter = (0, _uiApi.useCallback)(parentWidth => {
      _forEachItem(_refHm, _fReflowChartByRef(parentWidth));
    }, [])
    // _refHm
    /*eslint-enable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */,
    _fitToWidth = (0, _uiApi.useCallback)(() => {
      const {
        width
      } = (0, _uiApi.getRefElementStyle)(_refRootElement) || {};
      if (width) {
        _hResizeAfter(parseInt(width, 10));
      }
    }, [])
    //_hResizeAfter
    /*eslint-enable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */,
    _onShowCaptions = (0, _uiApi.useCallback)(() => {
      _forEachItem(_refHm, _showCaptionByRef);
    }, [])
    // refHm
    /*eslint-enable react-hooks/exhaustive-deps */,
    _isAdminModeFn = _isFn(store.isAdminMode) ? store.isAdminMode.bind(store) : () => false,
    _isAdminMode = _isAdminModeFn()
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
    /*eslint-enable react-hooks/exhaustive-deps */

    /*eslint-disable react-hooks/exhaustive-deps */,
    _compareTo = (0, _uiApi.useCallback)(dateTo => {
      const _valueMoves = [],
        itemsLength = _forEachItem(_refHm, refItem => {
          if (_isFn(refItem.compareTo)) {
            _valueMoves.push(refItem.compareTo(dateTo));
          }
        }),
        _numberOfNotUpdatedValueMoves = itemsLength - _valueMoves.filter(Boolean).length;
      if (itemsLength > 0 && _numberOfNotUpdatedValueMoves === 0) {
        updateMovingValues(_valueMoves);
      }
      return _numberOfNotUpdatedValueMoves;
    }, [])
    // updateMovingValues
    /*eslint-enable react-hooks/exhaustive-deps */,
    [_hSetActive, _hSetNotActive] = (0, _useSetActiveCheckBox.default)(chartType, browserType, onSetActive);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    setState(prevState => ({
      ...prevState,
      ...store.getConfigs(chartType)
    }));
  }, []);
  // store, chartType
  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _useListen.default)((actionType, data) => {
    if (_isDataForContainer(data, chartType)) {
      if (_isInArray(CHAT_ACTIONS, actionType)) {
        if (actionType !== _ChartActions.CHAT_CLOSE) {
          _refSpComp.current.scrollTop = 0;
        }
        setState(prevState => ({
          ...prevState,
          ...data
        }));
      } else if (actionType === _ComponentActions.CAT_CLOSE_CHART_CONTAINER_2) {
        _hHide();
      }
    }
  });
  const [TS, _style, _className] = (0, _useChartContainerStyle.default)(isShow);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: _refRootElement,
    className: _className,
    style: {
      ..._initialWidthStyle,
      ..._style,
      ...TS.ROOT
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ModalSlider, {
      isShow: isMore,
      className: CL_MENU_MORE,
      style: TS.EL_BORDER,
      model: _modelMore,
      onClose: _hToggleMore
    }), _isAdminMode && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalCompareTo.default, {
      isShow: isCompareTo,
      onClose: _closeCompareTo,
      onCompareTo: _compareTo
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.BrowserCaption, {
      style: S_BR_CAPTION,
      onMore: _showMore,
      onCheck: _hSetActive,
      onUnCheck: _hSetNotActive,
      caption: caption,
      captionStyle: S_CAPTION,
      svgMoreStyle: S_SVG_MORE,
      onClose: _hHide,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.SvgHrzResize, {
        ref: _refResize,
        initWidth: _INITIAL_WIDTH,
        minWidth: _MIN_WIDTH,
        maxWidth: MAX_WIDTH,
        step: STEP,
        elementRef: _refRootElement,
        onResizeAfter: _hResizeAfter
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ScrollPane, {
      ref: _refSpComp,
      className: CL_SCROLL,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartList.default, {
        refChartFn: _refChartFn,
        isAdminMode: _isAdminModeFn,
        configs: configs,
        store: store,
        chartType: chartType,
        browserType: browserType,
        onCloseItem: onCloseItem
      })
    })]
  });
};
var _default = ChartContainer;
exports.default = _default;
//# sourceMappingURL=ChartContainer.js.map