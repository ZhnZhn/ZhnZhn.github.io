"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _ChartActions = require("../../flux/actions/ChartActions");

var _ComponentActions = require("../../flux/actions/ComponentActions");

var _ItemFactory = _interopRequireDefault(require("../factories/ItemFactory"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

var _has = _interopRequireDefault(require("../has"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ModelMore = _interopRequireDefault(require("./ModelMore"));

var _ModalCompareTo = _interopRequireDefault(require("./ModalCompareTo"));

var TH_ID = 'CHART_CONTAINER';
var CL = {
  ROOT: "item-container",
  SCROLL: 'scroll-container-y scroll-items',
  SHOW: "show-popup",
  MENU_MORE: "popup-menu charts__menu-more"
};
var CHILD_MARGIN = 36,
    INITIAL_WIDTH = 635,
    MIN_WIDTH_WITH_TAB_MINI = 470,
    MIN_WIDTH = 370,
    MAX_WIDTH = 1200,
    DELTA = 10;
var S = {
  BR_CAPTION: {
    paddingLeft: 4
  },
  INLINE: {
    display: 'inline-block'
  },
  NONE: {
    display: 'none'
  }
};
var COMP_ACTIONS = [_ChartActions.ChartActionTypes.SHOW_CHART, _ChartActions.ChartActionTypes.LOAD_STOCK_COMPLETED, _ChartActions.ChartActionTypes.CLOSE_CHART];

var _isFn = function _isFn(fn) {
  return typeof fn === "function";
};

var _isBool = function _isBool(bool) {
  return typeof bool === 'boolean';
};

var _isInArray = function _isInArray(arr, value) {
  if (arr === void 0) {
    arr = [];
  }

  return Boolean(~arr.indexOf(value));
};

var _getWidth = function _getWidth(style) {
  return parseInt(style.width, 10) || INITIAL_WIDTH;
};

var _toStyleWidth = function _toStyleWidth(width) {
  return width + 'px';
};

var _crItemRefPropName = function _crItemRefPropName(index) {
  return 'chart' + index;
};

var _isContWidth = function _isContWidth(contWidth) {
  return contWidth && contWidth <= INITIAL_WIDTH;
};

var ChartContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ChartContainer, _Component);

  function ChartContainer(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;

    _this._initWidthProperties = function (props) {
      var contWidth = props.contWidth;
      _this._initialWidthStyle = _isContWidth(contWidth) ? {
        width: contWidth
      } : _has["default"].initWidthStyle(INITIAL_WIDTH, MIN_WIDTH);
      _this._INITIAL_WIDTH = _this._initialWidthStyle.width;
      _this._MIN_WIDTH = _this._INITIAL_WIDTH > MIN_WIDTH_WITH_TAB_MINI ? MIN_WIDTH_WITH_TAB_MINI : MIN_WIDTH;
    };

    _this._crModelMore = function (isAdminMode) {
      var _this$props = _this.props,
          store = _this$props.store,
          onRemoveAll = _this$props.onRemoveAll,
          onSortBy = _this$props.onSortBy;
      _this._isAdminMode = _isBool(isAdminMode) ? isAdminMode : store.isAdminMode();
      return (0, _ModelMore["default"])({
        onMinWidth: _this._resizeTo.bind((0, _assertThisInitialized2["default"])(_this), _this._MIN_WIDTH),
        onInitWidth: _this._resizeTo.bind((0, _assertThisInitialized2["default"])(_this), _this._INITIAL_WIDTH),
        onPlusWidth: _this._plusToWidth,
        onMinusWidth: _this._minusToWidth,
        onFit: _this._fitToWidth,
        onShowCaptions: _this._onShowCaptions,
        onSortBy: onSortBy,
        onRemoveAll: onRemoveAll,
        isAdminMode: _this._isAdminMode,
        onCompareTo: _this._onCompareTo
      });
    };

    _this._isDataForContainer = function (data) {
      var chartType = _this.props.chartType;
      return data === chartType || data && data.chartType === chartType;
    };

    _this._onStore = function (actionType, data) {
      if (_this._isDataForContainer(data)) {
        if (_isInArray(COMP_ACTIONS, actionType)) {
          if (actionType !== _ChartActions.ChartActionTypes.CLOSE_CHART) {
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

    _this._renderCharts = function () {
      var _this$props4 = _this.props,
          chartType = _this$props4.chartType,
          browserType = _this$props4.browserType,
          onCloseItem = _this$props4.onCloseItem,
          store = _this$props4.store,
          _this$state$configs = _this.state.configs,
          configs = _this$state$configs === void 0 ? [] : _this$state$configs,
          _isAdminMode = _isFn(store.isAdminMode) ? store.isAdminMode.bind(store) : false;

      return configs.map(function (config, index) {
        var _config$zhConfig = config.zhConfig,
            zhConfig = _config$zhConfig === void 0 ? {} : _config$zhConfig,
            id = zhConfig.id;
        return _ItemFactory["default"].createItem({
          store: store,
          config: config,
          index: index,
          option: {
            chartType: chartType
          },
          props: {
            ref: _this._refChart.bind(null, index),
            onCloseItem: onCloseItem.bind(null, chartType, browserType, id),
            isAdminMode: _isAdminMode
          }
        });
      });
    };

    _this._getRootNodeStyle = function () {
      var _ref = _this._refRootNode.current || {},
          _ref$style = _ref.style,
          style = _ref$style === void 0 ? {} : _ref$style;

      return style;
    };

    _this._resizeTo = function (width) {
      _this._getRootNodeStyle().width = _toStyleWidth(width);

      _this._hResizeAfter(width);
    };

    _this._plusToWidth = function () {
      var style = _this._getRootNodeStyle(),
          w = _getWidth(style) + DELTA,
          _width = w < MAX_WIDTH ? w : MAX_WIDTH;

      style.width = _toStyleWidth(_width);
    };

    _this._minusToWidth = function () {
      var style = _this._getRootNodeStyle(),
          w = _getWidth(style) - DELTA,
          _width = w > _this._MIN_WIDTH ? w : _this._MIN_WIDTH;

      style.width = _toStyleWidth(_width);
    };

    _this._fitToWidth = function () {
      var _this$_getRootNodeSty = _this._getRootNodeStyle(),
          width = _this$_getRootNodeSty.width;

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

    _this._getModelMore = function () {
      var store = _this.props.store,
          _isAdminMode = (store.isAdminMode == null ? void 0 : store.isAdminMode()) || false;

      return _this._isAdminMode === _isAdminMode ? _this._MODEL : _this._MODEL = _this._crModelMore(_isAdminMode);
    };

    _this.childMargin = CHILD_MARGIN;

    _this._initWidthProperties(_props);

    _this._MODEL = _this._crModelMore();
    _this._hSetActive = _this._toggleChb.bind((0, _assertThisInitialized2["default"])(_this), true);
    _this._hSetNotActive = _this._toggleChb.bind((0, _assertThisInitialized2["default"])(_this), false);
    _this._refRootNode = _react["default"].createRef();
    _this._refSpComp = _react["default"].createRef();
    _this.state = {
      isMore: false,
      isCompareTo: false
    };
    return _this;
  }

  var _proto = ChartContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var store = this.props.store;
    this.unsubscribe = store.listen(this._onStore);

    var _initState = store.getConfigs(this.props.chartType);

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
        TS = theme.getStyle(TH_ID),
        _this$state = this.state,
        isShow = _this$state.isShow,
        isMore = _this$state.isMore,
        isCompareTo = _this$state.isCompareTo,
        _styleIsShow = isShow ? S.INLINE : S.NONE,
        _classIsShow = isShow ? CL.ROOT + " " + CL.SHOW : CL.ROOT,
        _modelMore = this._getModelMore();

    return _react["default"].createElement("div", {
      ref: this._refRootNode,
      className: _classIsShow,
      style: (0, _extends2["default"])({}, this._initialWidthStyle, {}, _styleIsShow, {}, TS.ROOT)
    }, _react["default"].createElement(_Comp["default"].ModalSlider, {
      isShow: isMore,
      className: CL.MENU_MORE,
      style: TS.EL_BORDER,
      model: _modelMore,
      onClose: this._hToggleMore
    }), this._isAdminMode && _react["default"].createElement(_ModalCompareTo["default"], {
      isShow: isCompareTo,
      onClose: this._closeCompareTo,
      onCompareTo: this._compareTo
    }), _react["default"].createElement(_Comp["default"].BrowserCaption, {
      style: S.BR_CAPTION,
      onMore: this._showMore,
      onCheck: this._hSetActive,
      onUnCheck: this._hSetNotActive,
      caption: caption,
      onClose: this._hHide
    }, _react["default"].createElement(_Comp["default"].SvgHrzResize, {
      initWidth: INITIAL_WIDTH,
      minWidth: this._MIN_WIDTH,
      maxWidth: MAX_WIDTH,
      comp: this,
      onResizeAfter: this._hResizeAfter
    })), _react["default"].createElement(_Comp["default"].ScrollPane, {
      innerRef: this._refSpComp,
      className: CL.SCROLL
    }, _react["default"].createElement("div", null, this._renderCharts())));
  };

  return ChartContainer;
}(_react.Component);

ChartContainer.defaultProps = {
  onSetActive: function onSetActive() {}
};

var _default = (0, _withTheme["default"])(ChartContainer);

exports["default"] = _default;
//# sourceMappingURL=ChartContainer.js.map