"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _ButtonTab = _interopRequireDefault(require("../zhn/ButtonTab"));

var _MenuTabItem = _interopRequireDefault(require("../zhn-moleculs/MenuTabItem"));

var _ModalMenuIndicator = _interopRequireDefault(require("./ModalMenuIndicator"));

var _ModalMenuFn = _interopRequireDefault(require("./ModalMenuFn"));

var _ModalMenuMini = _interopRequireDefault(require("./ModalMenuMini"));

//import PropTypes from "prop-types";
var S = {
  TAB_INDICATOR: {
    left: 10
  },
  PANE_INDICATOR: {
    width: 240
  },
  BT_LEGEND: {
    left: 115
  },
  TAB_MINI: {
    left: 350
  },
  TAB_FN: {
    left: 190
  },
  BT_ADD: {
    left: 250
  },
  BT_CONF: {
    left: 430
  }
};
var INDICATOR_TAB_TYPES = ['area', 'spline', 'line'];

var _isIndicatorTab = function _isIndicatorTab(_ref, isWithoutIndicator) {
  var series = _ref.series;
  return !isWithoutIndicator && Array.isArray(series) && series[0] && INDICATOR_TAB_TYPES.indexOf(series[0].type) !== -1;
};

var ChartToolbar =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ChartToolbar, _Component);

  function ChartToolbar() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ChartToolbar.prototype;

  /*
  static propTypes = {
    style: PropTypes.object,
    config: PropTypes.object
  }
  */
  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    return false;
  };

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
        legend = zhConfig.legend;

    var _btTabIndicator = _isIndicatorTab(config, isWithoutIndicator) ? _react["default"].createElement(_MenuTabItem["default"], {
      style: S.TAB_INDICATOR,
      caption: "Indicator"
    }, _react["default"].createElement(_ModalMenuIndicator["default"], {
      chartId: chartId,
      config: config,
      getChart: getChart,
      onAddMfi: onAddMfi,
      onRemoveMfi: onRemoveMfi
    })) : null;

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

    var _btTabMini = zhMiniConfigs && zhMiniConfigs.length ? _react["default"].createElement(_MenuTabItem["default"], {
      style: S.TAB_MINI,
      caption: "Mini"
    }, _react["default"].createElement(_ModalMenuMini["default"], {
      configs: zhMiniConfigs,
      onClickItem: onMiniChart
    })) : null;

    return _react["default"].createElement("div", {
      style: style
    }, _btTabIndicator, _btLegend, _react["default"].createElement(_MenuTabItem["default"], {
      style: S.TAB_FN,
      caption: "Fn"
    }, _react["default"].createElement(_ModalMenuFn["default"], {
      config: config,
      getChart: getChart,
      onX2H: onClick2H,
      onMinMax: onMinMax,
      onZoom: onZoom,
      onCopy: onCopy,
      onPasteTo: onPasteTo
    })), _btAdd, _btInfo, _btTabMini);
  };

  return ChartToolbar;
}(_react.Component);

var _default = ChartToolbar;
exports["default"] = _default;
//# sourceMappingURL=ChartToolBar.js.map