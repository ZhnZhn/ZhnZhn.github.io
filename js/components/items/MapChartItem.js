"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _ChoroplethMap = _interopRequireDefault(require("../../adapters/eurostat/ChoroplethMap"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var _PanelDataInfo = _interopRequireDefault(require("./PanelDataInfo"));

//import PropTypes from "prop-types";
var S = {
  ROOT_DIV: {
    position: 'relative',
    marginBottom: 10,
    marginRight: 12
  },
  TIME: {
    display: 'inline-block',
    color: '#fdb316',
    paddingLeft: 16,
    fontWeight: 'bold'
  },
  TAB_DIV: {
    position: 'relative',
    height: 30,
    backgroundColor: 'transparent',
    zIndex: 2
  },
  MAP_DIV: {
    height: 400
  },
  SPINNER_LOADING: {
    margin: '64px auto 0'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

var BtTabInfo = function BtTabInfo(_ref) {
  var isShow = _ref.isShow,
      onClick = _ref.onClick;

  if (!isShow) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S.TAB_DIV,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].ButtonTab, {
      caption: "Info",
      onClick: onClick
    })
  });
};

var _crMapId = function _crMapId(caption) {
  return "map_" + caption;
};

var MapChartItem = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(MapChartItem, _Component);

  function MapChartItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      isLoading: true,
      isOpen: true,
      isShowInfo: false,
      time: ''
    };

    _this._hToggle = function () {
      _this.setState(function (prevState) {
        return {
          isOpen: !prevState.isOpen
        };
      });
    };

    _this._hClickInfo = function () {
      _this.setState({
        isShowInfo: true
      });
    };

    _this._hClickChart = function () {
      _this.setState({
        isShowInfo: false
      });
    };

    return _this;
  }

  var _proto = MapChartItem.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _this$props = this.props,
        caption = _this$props.caption,
        config = _this$props.config,
        jsonCube = config.json,
        zhMapSlice = config.zhMapSlice,
        _config$zhDialog = config.zhDialog,
        zhDialog = _config$zhDialog === void 0 ? {} : _config$zhDialog,
        time = zhDialog.time;

    _ChoroplethMap["default"].draw({
      id: _crMapId(caption),
      jsonCube: jsonCube,
      zhMapSlice: zhMapSlice,
      time: time
    }).then(function (_ref2) {
      var map = _ref2.map,
          time = _ref2.time;
      _this2.map = map;

      _this2.setState({
        isLoading: false,
        time: time
      });
    })["catch"](function (err) {
      _this2.setState({
        isLoading: false
      });
    });
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        caption = _this$props2.caption,
        config = _this$props2.config,
        onCloseItem = _this$props2.onCloseItem,
        _mapId = _crMapId(caption),
        zhDialog = config.zhDialog,
        info = config.info,
        _ref3 = zhDialog || {},
        _ref3$itemCaption = _ref3.itemCaption,
        itemCaption = _ref3$itemCaption === void 0 ? '' : _ref3$itemCaption,
        _this$state = this.state,
        isLoading = _this$state.isLoading,
        isOpen = _this$state.isOpen,
        isShowInfo = _this$state.isShowInfo,
        time = _this$state.time,
        _styleMap = isShowInfo ? S.NONE : S.BLOCK;

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.ROOT_DIV,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemHeader["default"], {
        isOpen: isOpen,
        caption: itemCaption,
        onClick: this._hToggle,
        onClose: onCloseItem,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: S.TIME,
          children: time
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp["default"].ShowHide, {
        isShow: isOpen,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(BtTabInfo, {
          isShow: !isShowInfo,
          onClick: this._hClickInfo
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          id: _mapId,
          style: (0, _extends2["default"])({}, S.MAP_DIV, _styleMap),
          children: isLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].SpinnerLoading, {
            style: S.SPINNER_LOADING
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PanelDataInfo["default"], {
          isShow: isShowInfo,
          info: info,
          onClickChart: this._hClickChart
        })]
      })]
    });
  };

  return MapChartItem;
}(_react.Component);

var _default = MapChartItem;
exports["default"] = _default;
//# sourceMappingURL=MapChartItem.js.map