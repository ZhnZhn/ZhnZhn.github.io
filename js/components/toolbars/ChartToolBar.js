"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _ButtonTab = _interopRequireDefault(require("../zhn/ButtonTab"));

var _ModalMenuIndicator = _interopRequireDefault(require("./ModalMenuIndicator"));

var _ModalMenuFn = _interopRequireDefault(require("./ModalMenuFn"));

var _ModalMenuMini = _interopRequireDefault(require("./ModalMenuMini"));

//import PropTypes from "prop-types";
var CL_SCROLL = "with-scroll-x";
var S = {
  BT_IND: {
    left: 2
  },
  M_IND: {
    top: 60,
    left: 6
  },
  BT_LEGEND: {
    left: 112
  },
  BT_FN: {
    left: 190
  },
  M_FN: {
    top: 60,
    left: 150
  },
  BT_ADD: {
    left: 250
  },
  BT_MINI: {
    left: 354,
    width: 68
  },
  M_MINI: {
    top: 60,
    left: 294
  },
  RIGHT_GAP: {
    position: 'relative',
    left: 430,
    width: 30,
    height: 10,
    backgroundColor: 'transparent'
  }
};
var SCR = {
  FN: {
    X: 180,
    D: 40
  },
  MINI: {
    X: 344,
    D: 100
  }
};
var INDICATOR_TAB_TYPES = ['area', 'spline', 'line'];

var _isIndicatorTab = function _isIndicatorTab(_ref, isWithoutIndicator) {
  var series = _ref.series;
  return !isWithoutIndicator && Array.isArray(series) && series[0] && INDICATOR_TAB_TYPES.indexOf(series[0].type) !== -1;
};

var _isScrolling = function _isScrolling(evt, CONFIG) {
  return evt.clientX !== 0 && evt.clientX === evt.pageX && evt.clientX < CONFIG.X;
};

var _crModalMenuStyle = function _crModalMenuStyle(evt, CONFIG) {
  return _isScrolling(evt, CONFIG) ? {
    left: evt.clientX - CONFIG.D
  } : void 0;
};

var ChartToolbar =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ChartToolbar, _Component);

  function ChartToolbar() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      isShowInd: false,
      isShowFn: false,
      isShowMini: false
    };

    _this._hShowInd = function () {
      _this.setState({
        isShowInd: true
      });
    };

    _this._hCloseInd = function () {
      _this.setState({
        isShowInd: false
      });
    };

    _this._hShowFn = function (evt) {
      _this.setState({
        isShowFn: true,
        fnStyle: _crModalMenuStyle(evt, SCR.FN)
      });
    };

    _this._hCloseFn = function () {
      _this.setState({
        isShowFn: false
      });
    };

    _this._hShowMini = function (evt) {
      _this.setState({
        isShowMini: true,
        miniStyle: _crModalMenuStyle(evt, SCR.MINI)
      });
    };

    _this._hCloseMini = function () {
      _this.setState({
        isShowMini: false
      });
    };

    return _this;
  }

  var _proto = ChartToolbar.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        _this$props$config = _this$props.config,
        config = _this$props$config === void 0 ? {} : _this$props$config,
        chartId = _this$props.chartId,
        onMiniChart = _this$props.onMiniChart,
        getChart = _this$props.getChart,
        onAddMfi = _this$props.onAddMfi,
        onRemoveMfi = _this$props.onRemoveMfi,
        onClickLegend = _this$props.onClickLegend,
        onClick2H = _this$props.onClick2H,
        onAddToWatch = _this$props.onAddToWatch,
        onCopy = _this$props.onCopy,
        onPasteTo = _this$props.onPasteTo,
        onMinMax = _this$props.onMinMax,
        onZoom = _this$props.onZoom,
        onClickInfo = _this$props.onClickInfo,
        _config$zhConfig = config.zhConfig,
        zhConfig = _config$zhConfig === void 0 ? {} : _config$zhConfig,
        info = config.info,
        zhMiniConfigs = config.zhMiniConfigs,
        isWithoutIndicator = zhConfig.isWithoutIndicator,
        isWithoutAdd = zhConfig.isWithoutAdd,
        legend = zhConfig.legend,
        _this$state = this.state,
        isShowInd = _this$state.isShowInd,
        isShowFn = _this$state.isShowFn,
        fnStyle = _this$state.fnStyle,
        isShowMini = _this$state.isShowMini,
        miniStyle = _this$state.miniStyle,
        _arrModalMenu = [];
    var _btTabIndicator = null;

    if (_isIndicatorTab(config, isWithoutIndicator)) {
      _btTabIndicator = _react["default"].createElement(_ButtonTab["default"], {
        style: S.BT_IND,
        caption: "Indicator",
        isMenu: true,
        onClick: this._hShowInd
      });

      _arrModalMenu.push(_react["default"].createElement(_ModalMenuIndicator["default"], {
        key: "menu_ind",
        isShow: isShowInd,
        style: S.M_IND,
        chartId: chartId,
        config: config,
        getChart: getChart,
        onAddMfi: onAddMfi,
        onRemoveMfi: onRemoveMfi,
        onClose: this._hCloseInd
      }));
    }

    var _btLegend = legend ? _react["default"].createElement(_ButtonTab["default"], {
      style: S.BT_LEGEND,
      caption: "Legend",
      onClick: onClickLegend
    }) : null;

    var _btAdd = !isWithoutAdd ? _react["default"].createElement(_ButtonTab["default"], {
      style: S.BT_ADD,
      caption: "Add",
      isUpdatable: false,
      onClick: onAddToWatch
    }) : null;

    var _btInfo = info ? _react["default"].createElement(_ButtonTab["default"], {
      caption: "Info",
      onClick: onClickInfo
    }) : null;

    var _btTabMini = null;

    if (zhMiniConfigs && zhMiniConfigs.length) {
      _btTabMini = _react["default"].createElement(_ButtonTab["default"], {
        style: S.BT_MINI,
        caption: "Mini",
        isMenu: true,
        onClick: this._hShowMini
      });

      _arrModalMenu.push(_react["default"].createElement(_ModalMenuMini["default"], {
        key: "menu_mini",
        isShow: isShowMini,
        style: (0, _extends2["default"])({}, S.M_MINI, {}, miniStyle),
        configs: zhMiniConfigs,
        onClickItem: onMiniChart,
        onClose: this._hCloseMini
      }));
    }

    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_ModalMenuFn["default"], {
      isShow: isShowFn,
      style: (0, _extends2["default"])({}, S.M_FN, {}, fnStyle),
      config: config,
      getChart: getChart,
      onX2H: onClick2H,
      onMinMax: onMinMax,
      onZoom: onZoom,
      onCopy: onCopy,
      onPasteTo: onPasteTo,
      onClose: this._hCloseFn
    }), _arrModalMenu, _react["default"].createElement("div", {
      className: CL_SCROLL,
      style: style
    }, _btTabIndicator, _btLegend, _react["default"].createElement(_ButtonTab["default"], {
      style: S.BT_FN,
      caption: "Fn",
      isMenu: true,
      onClick: this._hShowFn
    }), _btAdd, _btInfo, _btTabMini, _react["default"].createElement("div", {
      style: S.RIGHT_GAP
    })));
  };

  return ChartToolbar;
}(_react.Component);

var _default = ChartToolbar;
exports["default"] = _default;
//# sourceMappingURL=ChartToolBar.js.map