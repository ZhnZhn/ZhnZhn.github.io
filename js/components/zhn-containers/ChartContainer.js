"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

var _ChartStore = _interopRequireDefault(require("../../flux/stores/ChartStore"));

var _ChartActions = require("../../flux/actions/ChartActions");

var _ComponentActions = require("../../flux/actions/ComponentActions");

var _ModalSlider = _interopRequireDefault(require("../zhn-modal-slider/ModalSlider"));

var _ModelMore = _interopRequireDefault(require("./ModelMore"));

var _BrowserCaption = _interopRequireDefault(require("../zhn/BrowserCaption"));

var _SvgHrzResize = _interopRequireDefault(require("../zhn/SvgHrzResize"));

var _ScrollPane = _interopRequireDefault(require("../zhn/ScrollPane"));

var _ItemFactory = _interopRequireDefault(require("../factories/ItemFactory"));

var TH_ID = 'CHART_CONTAINER';
var CL = {
  ROOT: "item-container",
  SCROLL: 'scroll-container-y scroll-items',
  SHOW: "show-popup",
  MENU_MORE: "popup-menu charts__menu-more"
};
var CHILD_MARGIN = 36,
    RESIZE_INIT_WIDTH = 635,
    RESIZE_MIN_WIDTH = 395,
    RESIZE_MAX_WIDTH = 1200,
    DELTA = 10;
var S = {
  /*
  transitionOption : {
    transitionName : "scaleY",
    transitionEnterTimeout : 400,
    transitionLeave : false
  },
  */
  INLINE: {
    display: 'inline-block'
  },
  NONE: {
    display: 'none'
  }
};
var COMP_ACTIONS = [_ChartActions.ChartActionTypes.SHOW_CHART, _ChartActions.ChartActionTypes.LOAD_STOCK_COMPLETED, _ChartActions.ChartActionTypes.CLOSE_CHART];

var _isInArray = function _isInArray(arr, value) {
  if (arr === void 0) {
    arr = [];
  }

  return Boolean(~arr.indexOf(value));
};

var _getWidth = function _getWidth(style) {
  return parseInt(style.width, 10) || RESIZE_INIT_WIDTH;
};

var _toStyleWidth = function _toStyleWidth(width) {
  return width + 'px';
};

var _isFn = function _isFn(fn) {
  return typeof fn === "function";
};

var ChartContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ChartContainer, _Component);

  function ChartContainer(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._isDataForContainer = function (data) {
      var chartType = _this.props.chartType;
      return data === chartType || data && data.chartType === chartType;
    };

    _this._onStore = function (actionType, data) {
      if (_this._isDataForContainer(data)) {
        if (_isInArray(COMP_ACTIONS, actionType)) {
          if (actionType !== _ChartActions.ChartActionTypes.CLOSE_CHART) {
            _this.spComp.scrollTop();
          }

          _this.setState(data);
        } else if (actionType === _ComponentActions.ComponentActionTypes.CLOSE_CHART_CONTAINER_2) {
          _this._hHide();
        }
      }
    };

    _this._toggleChb = function (isCheck, checkBox) {
      var _this$props = _this.props,
          onSetActive = _this$props.onSetActive,
          chartType = _this$props.chartType,
          browserType = _this$props.browserType;
      checkBox.chartType = chartType;
      checkBox.browserType = browserType;
      onSetActive(isCheck, checkBox);
    };

    _this._hHide = function () {
      var _this$props2 = _this.props,
          chartType = _this$props2.chartType,
          browserType = _this$props2.browserType,
          onCloseContainer = _this$props2.onCloseContainer;
      onCloseContainer(chartType, browserType);

      _this.setState({
        isShow: false
      });
    };

    _this._hResizeAfter = function (parentWidth) {
      var i = 0,
          max = _this.state.configs.length,
          _propName;

      for (; i < max; i++) {
        _propName = _this._crChartPropName(i);

        if (_this[_propName] && _isFn(_this[_propName].reflowChart)) {
          _this[_propName].reflowChart(parentWidth - _this.childMargin);
        }
      }
    };

    _this._onShowCaptions = function (parentWidth) {
      var i = 0,
          max = _this.state.configs.length,
          _propName;

      for (; i < max; i++) {
        _propName = _this._crChartPropName(i);

        if (_this[_propName] && _isFn(_this[_propName].showCaption)) {
          _this[_propName].showCaption();
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

    _this._crChartPropName = function (index) {
      return 'chart' + index;
    };

    _this._refChart = function (index, comp) {
      return _this[_this._crChartPropName(index)] = comp;
    };

    _this._renderCharts = function () {
      var _this$props3 = _this.props,
          chartType = _this$props3.chartType,
          browserType = _this$props3.browserType,
          onCloseItem = _this$props3.onCloseItem,
          _this$state$configs = _this.state.configs,
          configs = _this$state$configs === void 0 ? [] : _this$state$configs,
          _isAdminMode = _isFn(_ChartStore["default"].isAdminMode) ? _ChartStore["default"].isAdminMode.bind(_ChartStore["default"]) : false;

      return configs.map(function (config, index) {
        var _config$zhConfig = config.zhConfig,
            zhConfig = _config$zhConfig === void 0 ? {} : _config$zhConfig,
            id = zhConfig.id;
        return _ItemFactory["default"].createItem({
          store: _ChartStore["default"],
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
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
          _rootNode = _assertThisInitialize._rootNode,
          _ref = _rootNode || {},
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
          w = _getWidth(style) + DELTA;

      if (w < RESIZE_MAX_WIDTH) {
        style.width = _toStyleWidth(w);
      }
    };

    _this._minusToWidth = function () {
      var style = _this._getRootNodeStyle(),
          w = _getWidth(style) - DELTA;

      if (w > RESIZE_MIN_WIDTH) {
        style.width = _toStyleWidth(w);
      }
    };

    _this._fitToWidth = function () {
      _this._hResizeAfter(parseInt(_this._rootNode.style.width, 10));
    };

    _this._refRootNode = function (node) {
      return _this._rootNode = node;
    };

    _this._refSpComp = function (node) {
      return _this.spComp = node;
    };

    var _chartType = props.chartType,
        onRemoveAll = props.onRemoveAll;
    _this.childMargin = CHILD_MARGIN;
    _this._MODEL = (0, _ModelMore["default"])({
      chartType: _chartType,
      onMinWidth: _this._resizeTo.bind((0, _assertThisInitialized2["default"])(_this), RESIZE_MIN_WIDTH),
      onInitWidth: _this._resizeTo.bind((0, _assertThisInitialized2["default"])(_this), RESIZE_INIT_WIDTH),
      onPlusWidth: _this._plusToWidth,
      onMinusWidth: _this._minusToWidth,
      onFit: _this._fitToWidth,
      onShowCaptions: _this._onShowCaptions,
      onRemoveAll: onRemoveAll
    });
    _this._hSetActive = _this._toggleChb.bind((0, _assertThisInitialized2["default"])(_this), true);
    _this._hSetNotActive = _this._toggleChb.bind((0, _assertThisInitialized2["default"])(_this), false);
    _this.state = {
      isMore: false
    };
    return _this;
  }

  var _proto = ChartContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = _ChartStore["default"].listen(this._onStore);

    var _initState = _ChartStore["default"].getConfigs(this.props.chartType);

    if (_initState) {
      this.setState(_initState);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        theme = _this$props4.theme,
        caption = _this$props4.caption,
        TS = theme.getStyle(TH_ID),
        _this$state = this.state,
        isShow = _this$state.isShow,
        isMore = _this$state.isMore,
        _styleIsShow = isShow ? S.INLINE : S.NONE,
        _classIsShow = isShow ? CL.ROOT + " " + CL.SHOW : CL.ROOT;

    return _react["default"].createElement("div", {
      ref: this._refRootNode,
      className: _classIsShow,
      style: (0, _extends2["default"])({}, _styleIsShow, {}, TS.ROOT)
    }, _react["default"].createElement(_ModalSlider["default"], {
      isShow: isMore,
      className: CL.MENU_MORE,
      style: TS.EL_BORDER,
      model: this._MODEL,
      onClose: this._hToggleMore
    }), _react["default"].createElement(_BrowserCaption["default"], {
      onMore: this._showMore,
      onCheck: this._hSetActive,
      onUnCheck: this._hSetNotActive,
      caption: caption,
      onClose: this._hHide
    }, _react["default"].createElement(_SvgHrzResize["default"], {
      initWidth: RESIZE_INIT_WIDTH,
      minWidth: RESIZE_MIN_WIDTH,
      maxWidth: RESIZE_MAX_WIDTH,
      comp: this,
      onResizeAfter: this._hResizeAfter
    })), _react["default"].createElement(_ScrollPane["default"], {
      ref: this._refSpComp,
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