"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _ChartActions = require("../../flux/actions/ChartActions");

var _ComponentActions = require("../../flux/actions/ComponentActions");

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

var _has = _interopRequireDefault(require("../has"));

var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));

var _crModelMore = _interopRequireDefault(require("./crModelMore"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ModalCompareTo = _interopRequireDefault(require("./ModalCompareTo"));

var _ChartList = _interopRequireDefault(require("./ChartList"));

var _jsxRuntime = require("react/jsx-runtime");

var TH_ID = 'CHART_CONTAINER';
var CL_ROOT = "item-container",
    CL_SCROLL = 'scroll-container-y scroll-items',
    CL_SHOW_CONT = "show-cont",
    CL_MENU_MORE = "popup-menu charts__menu-more",
    CHILD_MARGIN = 36,
    INITIAL_WIDTH = 635,
    MIN_WIDTH_WITH_TAB_MINI = 470,
    MIN_WIDTH = 365,
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
},
    S_INLINE = {
  display: 'inline-block'
},
    S_NONE = {
  display: 'none'
};
var COMP_ACTIONS = [_ChartActions.CHAT_SHOW, _ChartActions.CHAT_LOAD_COMPLETED, _ChartActions.CHAT_CLOSE];

var _isFn = function _isFn(fn) {
  return typeof fn === "function";
};

var _isInArray = function _isInArray(arr, value) {
  if (arr === void 0) {
    arr = [];
  }

  return Boolean(~arr.indexOf(value));
};

var _crItemRefPropName = function _crItemRefPropName(index) {
  return 'chart' + index;
};

var _isContWidth = function _isContWidth(contWidth) {
  return contWidth && contWidth <= INITIAL_WIDTH;
};

var _crFnByNameArgs = function _crFnByNameArgs(ref, methodName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return function () {
    var _comp = ref.current;

    if (_comp) {
      _comp[methodName].apply(_comp, args);
    }
  };
};

var ChartContainer = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2.default)(ChartContainer, _Component);

  function ChartContainer(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;

    _this._initWidthProperties = function (props) {
      var contWidth = props.contWidth;
      _this._initialWidthStyle = _isContWidth(contWidth) ? {
        width: contWidth
      } : _has.default.initWidthStyle(INITIAL_WIDTH, MIN_WIDTH);
      _this._INITIAL_WIDTH = _this._initialWidthStyle.width;
      _this._MIN_WIDTH = _this._INITIAL_WIDTH > MIN_WIDTH_WITH_TAB_MINI ? MIN_WIDTH_WITH_TAB_MINI : MIN_WIDTH;
    };

    _this._initHandlers = function (props) {
      var _this$props = _this.props,
          onSortBy = _this$props.onSortBy,
          onRemoveAll = _this$props.onRemoveAll,
          _refResize = _this._refResize;
      _this._HANDLERS = {
        onMinWidth: _crFnByNameArgs(_refResize, 'toWidth', _this._MIN_WIDTH, true),
        onInitWidth: _crFnByNameArgs(_refResize, 'toWidth', _this._INITIAL_WIDTH, true),
        onPlusWidth: _crFnByNameArgs(_refResize, 'resizeBy', STEP),
        onMinusWidth: _crFnByNameArgs(_refResize, 'resizeBy', -STEP),
        onFit: _this._fitToWidth,
        onShowCaptions: _this._onShowCaptions,
        onSortBy: onSortBy,
        onRemoveAll: onRemoveAll,
        onCompareTo: _this._onCompareTo
      };
    };

    _this._isDataForContainer = function (data) {
      var chartType = _this.props.chartType;
      return data === chartType || data && data.chartType === chartType;
    };

    _this._onStore = function (actionType, data) {
      if (_this._isDataForContainer(data)) {
        if (_isInArray(COMP_ACTIONS, actionType)) {
          if (actionType !== _ChartActions.CHAT_CLOSE) {
            _this._refSpComp.current.scrollTop = 0; //this.spComp.scrollTop()
          }

          _this.setState(data);
        } else if (actionType === _ComponentActions.ComponentActionTypes.CLOSE_CHART_CONTAINER_2) {
          _this._hHide();
        }
      }
    };

    _this._toggleChb = function (isCheck, checkBox) {
      var _this$props2 = _this.props,
          onSetActive = _this$props2.onSetActive,
          chartType = _this$props2.chartType,
          browserType = _this$props2.browserType;
      checkBox.chartType = chartType;
      checkBox.browserType = browserType;
      onSetActive(isCheck, checkBox);
    };

    _this._hHide = function () {
      var _this$props3 = _this.props,
          chartType = _this$props3.chartType,
          browserType = _this$props3.browserType,
          onCloseContainer = _this$props3.onCloseContainer;
      onCloseContainer(chartType, browserType);

      _this.setState({
        isShow: false
      });
    };

    _this._getItemMax = function () {
      return _this.state.configs.length;
    };

    _this._hResizeAfter = function (parentWidth) {
      var max = _this._getItemMax();

      var i = 0,
          _refItem;

      for (; i < max; i++) {
        _refItem = _this[_crItemRefPropName(i)];

        if (_refItem && _isFn(_refItem.reflowChart)) {
          _refItem.reflowChart(parentWidth - _this.childMargin);
        }
      }
    };

    _this._compareTo = function (dateTo) {
      var _arrR = [],
          max = _this._getItemMax();

      var i = 0,
          _refItem;

      for (; i < max; i++) {
        _refItem = _this[_crItemRefPropName(i)];

        if (_refItem && _isFn(_refItem.compareTo)) {
          _arrR.push(_refItem.compareTo(dateTo));
        }
      }

      var _r = max - _arrR.filter(Boolean).length;

      if (max > 0 && _r === 0) {
        _this.props.updateMovingValues(_arrR);
      }

      return _r;
    };

    _this._onShowCaptions = function (parentWidth) {
      var max = _this._getItemMax();

      var i = 0,
          _refItem;

      for (; i < max; i++) {
        _refItem = _this[_crItemRefPropName(i)];

        if (_refItem && _isFn(_refItem.showCaption)) {
          _refItem.showCaption();
        }
      }
    };

    _this._showMore = function () {
      _this.setState({
        isMore: true
      });
    };

    _this._hToggleMore = function () {
      _this.setState(function (prevState) {
        return {
          isMore: !prevState.isMore
        };
      });
    };

    _this._refChart = function (index, comp) {
      return _this[_crItemRefPropName(index)] = comp;
    };

    _this._fitToWidth = function () {
      var _ref = _this._refRootNode.current || {},
          style = _ref.style,
          _ref2 = style || {},
          width = _ref2.width;

      if (width) {
        _this._hResizeAfter(parseInt(width, 10));
      }
    };

    _this._onCompareTo = function () {
      _this.setState({
        isCompareTo: true
      });
    };

    _this._closeCompareTo = function () {
      _this.setState({
        isCompareTo: false
      });
    };

    _this._refRootNode = /*#__PURE__*/(0, _react.createRef)();
    _this._refSpComp = /*#__PURE__*/(0, _react.createRef)();
    _this._refResize = /*#__PURE__*/(0, _react.createRef)();
    _this.childMargin = CHILD_MARGIN;

    _this._initWidthProperties(_props);

    _this._initHandlers(_props);

    _this._hSetActive = _this._toggleChb.bind((0, _assertThisInitialized2.default)(_this), true);
    _this._hSetNotActive = _this._toggleChb.bind((0, _assertThisInitialized2.default)(_this), false);
    _this.state = {
      isMore: false,
      isCompareTo: false
    };
    return _this;
  }

  var _proto = ChartContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props4 = this.props,
        store = _this$props4.store,
        chartType = _this$props4.chartType;
    this.unsubscribe = store.listen(this._onStore);

    var _initState = store.getConfigs(chartType);

    if (_initState) {
      this.setState(_initState);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        theme = _this$props5.theme,
        caption = _this$props5.caption,
        chartType = _this$props5.chartType,
        browserType = _this$props5.browserType,
        onCloseItem = _this$props5.onCloseItem,
        store = _this$props5.store,
        TS = theme.getStyle(TH_ID),
        _isAdminModeFn = _isFn(store.isAdminMode) ? store.isAdminMode.bind(store) : function () {
      return false;
    },
        _isAdminMode = (store.isAdminMode == null ? void 0 : store.isAdminMode()) || false,
        _modelMore = (0, _crModelMore.default)(_isAdminMode, this._HANDLERS),
        _this$state = this.state,
        isShow = _this$state.isShow,
        isMore = _this$state.isMore,
        isCompareTo = _this$state.isCompareTo,
        configs = _this$state.configs,
        _style = isShow ? S_INLINE : S_NONE,
        _className = (0, _crCn.default)(CL_ROOT, [isShow, CL_SHOW_CONT]);

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ref: this._refRootNode,
      className: _className,
      style: Object.assign({}, this._initialWidthStyle, _style, TS.ROOT),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ModalSlider, {
        isShow: isMore,
        className: CL_MENU_MORE,
        style: TS.EL_BORDER,
        model: _modelMore,
        onClose: this._hToggleMore
      }), _isAdminMode && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalCompareTo.default, {
        isShow: isCompareTo,
        onClose: this._closeCompareTo,
        onCompareTo: this._compareTo
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.BrowserCaption, {
        style: S_BR_CAPTION,
        onMore: this._showMore,
        onCheck: this._hSetActive,
        onUnCheck: this._hSetNotActive,
        caption: caption,
        captionStyle: S_CAPTION,
        svgMoreStyle: S_SVG_MORE,
        onClose: this._hHide,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.SvgHrzResize, {
          ref: this._refResize,
          initWidth: INITIAL_WIDTH,
          minWidth: this._MIN_WIDTH,
          maxWidth: MAX_WIDTH,
          step: STEP,
          nodeRef: this._refRootNode,
          onResizeAfter: this._hResizeAfter
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp.default.ScrollPane, {
        ref: this._refSpComp,
        className: CL_SCROLL,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartList.default, {
          refChartFn: this._refChart,
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

  return ChartContainer;
}(_react.Component);

ChartContainer.defaultProps = {
  onSetActive: function onSetActive() {}
};

var _default = (0, _withTheme.default)(ChartContainer);

exports.default = _default;
//# sourceMappingURL=ChartContainer.js.map