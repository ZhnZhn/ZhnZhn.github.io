"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _ChoroplethMap = _interopRequireDefault(require("../../adapters/eurostat/ChoroplethMap"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var _PanelDataInfo = _interopRequireDefault(require("./PanelDataInfo"));

//import PropTypes from "prop-types";
var S = {
  ROOT_DIV: {
    position: 'relative',
    marginBottom: 10,
    marginRight: 25
  },
  TIME_SPAN: {
    position: 'absolute',
    display: 'inline-block',
    color: 'rgb(253, 179, 22)',
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
    position: 'relative',
    display: 'block',
    width: 32,
    height: 32,
    margin: '0 auto',
    marginTop: 64,
    textAlign: 'middle'
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

  return _react["default"].createElement("div", {
    style: S.TAB_DIV
  }, _react["default"].createElement(_Comp["default"].ButtonTab, {
    caption: "Info",
    onClick: onClick
  }));
};

var MapChartItem =
/*#__PURE__*/
function (_Component) {
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
        zhMapSlice = config.zhMapSlice;

    _ChoroplethMap["default"].draw("map_" + caption, jsonCube, zhMapSlice).then(function (option) {
      _this2.map = option.map;

      _this2.setState({
        isLoading: false,
        time: option.time
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
        zhDialog = config.zhDialog,
        _ref2 = zhDialog || {},
        itemCaption = _ref2.itemCaption,
        subtitle = _ref2.subtitle,
        _itemCaption = itemCaption || subtitle || '',
        _this$state = this.state,
        isLoading = _this$state.isLoading,
        isOpen = _this$state.isOpen,
        isShowInfo = _this$state.isShowInfo,
        time = _this$state.time,
        _styleMap = isShowInfo ? S.NONE : S.BLOCK;

    return _react["default"].createElement("div", {
      style: S.ROOT_DIV
    }, _react["default"].createElement(_ItemHeader["default"], {
      isOpen: isOpen,
      caption: _itemCaption,
      onClick: this._hToggle,
      onClose: onCloseItem
    }, _react["default"].createElement("span", {
      style: S.TIME_SPAN
    }, time)), _react["default"].createElement(_Comp["default"].ShowHide, {
      isShow: isOpen
    }, _react["default"].createElement(BtTabInfo, {
      isShow: !isShowInfo,
      onClick: this._hClickInfo
    }), _react["default"].createElement("div", {
      id: "map_" + caption,
      style: (0, _extends2["default"])({}, S.MAP_DIV, {}, _styleMap)
    }, isLoading && _react["default"].createElement(_Comp["default"].SpinnerLoading, {
      style: S.SPINNER_LOADING
    })), _react["default"].createElement(_PanelDataInfo["default"], {
      isShow: isShowInfo,
      info: config.info,
      onClickChart: this._hClickChart
    })));
  };

  return MapChartItem;
}(_react.Component);

var _default = MapChartItem;
exports["default"] = _default;
//# sourceMappingURL=MapChartItem.js.map