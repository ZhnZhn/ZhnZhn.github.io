"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _ChoroplethMap = _interopRequireDefault(require("../../adapters/eurostat/ChoroplethMap"));

var _ButtonTab = _interopRequireDefault(require("../zhn/ButtonTab"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _SpinnerLoading = _interopRequireDefault(require("../zhn/SpinnerLoading"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var _PanelDataInfo = _interopRequireDefault(require("./PanelDataInfo"));

//import PropTypes from "prop-types";
var S = {
  ROOT_DIV: {
    position: 'relative',
    //lineHeight: 1.5,
    marginBottom: '10px',
    marginRight: '25px'
  },
  TIME_SPAN: {
    position: 'absolute',
    display: 'inline-block',
    color: 'rgb(253, 179, 22)',
    fontWeight: 'bold',
    paddingLeft: '16px'
  },
  TAB_DIV: {
    position: 'relative',
    height: '30px',
    backgroundColor: 'transparent',
    zIndex: 2
  },
  MAP_DIV: {
    height: '400px'
  },
  SPINNER_LOADING: {
    position: 'relative',
    display: 'block',
    textAlign: 'middle',
    margin: '0 auto',
    marginTop: '64px',
    width: '32px',
    height: '32px'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

var MapChartItem =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MapChartItem, _Component);

  /*
  static propTypes = {
    caption: PropTypes.string,
    config: PropTypes.shape({
      json: PropTypes.object,
      zhMapSlice: PropTypes.object,
      zhDialog: PropTypes.shape({
        subtitle: PropTypes.string,
        time: PropTypes.string
      })
    }),
    onCloseItem: PropTypes.func
  }
  */
  function MapChartItem(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._handleToggle = function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      });
    };

    _this._handleClickInfo = function () {
      _this.setState({
        isShowInfo: true
      });
    };

    _this._handleClickChart = function () {
      _this.setState({
        isShowInfo: false
      });
    };

    _this._renderTabToolbar = function () {
      return _react["default"].createElement("div", {
        style: S.TAB_DIV
      }, _react["default"].createElement(_ButtonTab["default"], {
        caption: "Info",
        onClick: _this._handleClickInfo
      }));
    };

    _this.map = undefined;
    _this.state = {
      isLoading: true,
      isOpen: true,
      isShowInfo: false,
      time: ''
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

      return undefined;
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
        _config$zhDialog = config.zhDialog,
        zhDialog = _config$zhDialog === void 0 ? {} : _config$zhDialog,
        _zhDialog$subtitle = zhDialog.subtitle,
        subtitle = _zhDialog$subtitle === void 0 ? '' : _zhDialog$subtitle,
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
      caption: subtitle,
      onClick: this._handleToggle,
      onClose: onCloseItem
    }, _react["default"].createElement("span", {
      style: S.TIME_SPAN
    }, time)), _react["default"].createElement(_ShowHide["default"], {
      isShow: isOpen
    }, !isShowInfo && this._renderTabToolbar(), _react["default"].createElement("div", {
      id: "map_" + caption,
      style: (0, _extends2["default"])({}, S.MAP_DIV, {}, _styleMap)
    }, isLoading && _react["default"].createElement(_SpinnerLoading["default"], {
      style: S.SPINNER_LOADING
    })), _react["default"].createElement(_PanelDataInfo["default"], {
      isShow: isShowInfo,
      info: config.info,
      onClickChart: this._handleClickChart
    })));
  };

  return MapChartItem;
}(_react.Component);

var _default = MapChartItem;
exports["default"] = _default;
//# sourceMappingURL=MapChartItem.js.map