"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _useToggle4 = _interopRequireDefault(require("../hooks/useToggle"));

var _ButtonTab = _interopRequireDefault(require("../zhn/ButtonTab"));

var _ModalMenuIndicator = _interopRequireDefault(require("./ModalMenuIndicator"));

var _ModalMenuFn = _interopRequireDefault(require("./ModalMenuFn"));

var _ModalMenuMini = _interopRequireDefault(require("./ModalMenuMini"));

//import PropTypes from "prop-types";
var CL = {
  SCROLL: "with-scroll-x",
  BT_R: "with-scroll-x__bt-r"
};
var S = {
  BT_IND: {
    left: 8
  },
  M_IND: {
    top: 60,
    left: 5
  },
  BT_LEGEND: {
    left: 115
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
    left: 350,
    width: 68
  },
  M_MINI: {
    top: 60,
    left: 290
  },
  BT_CONF: {
    left: 430
  },
  BT_R: {
    left: 440,
    width: 36
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
};

var _isArr = Array.isArray;

var _isHrzScrollable = function _isHrzScrollable(node) {
  return node && node.scrollWidth > node.clientWidth;
};

var _scrollNodeToLeft = function _scrollNodeToLeft(ref, left) {
  var node = ref.current;

  if (_isHrzScrollable(node)) {
    if (_isFn(node.scroll)) {
      node.scroll({
        left: left,
        behavior: 'smooth'
      });
    } else {
      node.scrollLeft = left;
    }
  }
};

var LINE_TYPES = ['area', 'spline', 'line'];

var _isColumnCategoryConfig = function _isColumnCategoryConfig(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      type = _ref.type,
      categories = _ref.categories;

  return type === 'category' && _isArr(categories);
};

var _isIndicatorTab = function _isIndicatorTab(_ref2, isWithoutIndicator) {
  var series = _ref2.series,
      xAxis = _ref2.xAxis;
  return !isWithoutIndicator && _isArr(series) && series[0] && (LINE_TYPES.indexOf(series[0].type) !== -1 || !_isColumnCategoryConfig(xAxis));
};

var _crModalMenuStyle = function _crModalMenuStyle(ref, left) {
  var node = ref.current;

  if (node && _isNumber(node.scrollLeft)) {
    return {
      left: left - node.scrollLeft
    };
  }

  return void 0;
};

var ChartToolbar = function ChartToolbar(_ref3) {
  var hasError = _ref3.hasError,
      style = _ref3.style,
      _ref3$config = _ref3.config,
      config = _ref3$config === void 0 ? {} : _ref3$config,
      onMiniChart = _ref3.onMiniChart,
      getChart = _ref3.getChart,
      onAddMfi = _ref3.onAddMfi,
      onRemoveMfi = _ref3.onRemoveMfi,
      onClickLegend = _ref3.onClickLegend,
      onClick2H = _ref3.onClick2H,
      onAddToWatch = _ref3.onAddToWatch,
      onCopy = _ref3.onCopy,
      onPasteTo = _ref3.onPasteTo,
      onMinMax = _ref3.onMinMax,
      onZoom = _ref3.onZoom,
      onClickInfo = _ref3.onClickInfo;

  var _refToolbar = (0, _react.useRef)(),
      _useToggle = (0, _useToggle4["default"])(false),
      isShowInd = _useToggle[0],
      toggleInd = _useToggle[1],
      _useToggle2 = (0, _useToggle4["default"])(false),
      isShowFn = _useToggle2[0],
      toggleFn = _useToggle2[1],
      _useToggle3 = (0, _useToggle4["default"])(false),
      isShowMini = _useToggle3[0],
      toggleMini = _useToggle3[1],
      _hClickR = (0, _react.useCallback)(function () {
    _scrollNodeToLeft(_refToolbar, 0);
  }, []);

  var _config$zhConfig = config.zhConfig,
      zhConfig = _config$zhConfig === void 0 ? {} : _config$zhConfig,
      info = config.info,
      zhMiniConfigs = config.zhMiniConfigs,
      isWithoutIndicator = zhConfig.isWithoutIndicator,
      itemConf = zhConfig.itemConf,
      legend = zhConfig.legend,
      _modalMenuArr = [];

  var _btInfo = /*#__PURE__*/_react["default"].createElement(_ButtonTab["default"], {
    is: !!info,
    caption: "Info",
    onClick: onClickInfo
  });

  if (hasError) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      ref: _refToolbar,
      className: CL.SCROLL,
      style: style
    }, _btInfo);
  }

  var _btTabIndicator = null;

  if (_isIndicatorTab(config, isWithoutIndicator)) {
    _btTabIndicator = /*#__PURE__*/_react["default"].createElement(_ButtonTab["default"], {
      style: S.BT_IND,
      caption: "Indicator",
      isShow: isShowInd,
      isMenu: true,
      onClick: toggleInd
    });

    _modalMenuArr.push( /*#__PURE__*/_react["default"].createElement(_ModalMenuIndicator["default"], {
      key: "menu_ind",
      isShow: isShowInd,
      style: S.M_IND,
      config: config,
      getChart: getChart,
      onAddMfi: onAddMfi,
      onRemoveMfi: onRemoveMfi,
      onClose: toggleInd
    }));
  }

  var _btLegend = /*#__PURE__*/_react["default"].createElement(_ButtonTab["default"], {
    is: !!legend,
    style: S.BT_LEGEND,
    caption: "Legend",
    onClick: onClickLegend
  });

  var _btAdd = /*#__PURE__*/_react["default"].createElement(_ButtonTab["default"], {
    is: !!itemConf,
    style: S.BT_ADD,
    caption: "Add",
    onClick: onAddToWatch
  });

  var _btTabMini = null;

  if (zhMiniConfigs && zhMiniConfigs.length) {
    _btTabMini = /*#__PURE__*/_react["default"].createElement(_ButtonTab["default"], {
      style: S.BT_MINI,
      caption: "Mini",
      isShow: isShowMini,
      isMenu: true,
      onClick: toggleMini
    });

    var _miniStyle = isShowMini ? _crModalMenuStyle(_refToolbar, S.M_MINI.left) : void 0;

    _modalMenuArr.push( /*#__PURE__*/_react["default"].createElement(_ModalMenuMini["default"], {
      key: "menu_mini",
      isShow: isShowMini,
      style: (0, _extends2["default"])({}, S.M_MINI, _miniStyle),
      configs: zhMiniConfigs,
      onClickItem: onMiniChart,
      onClose: toggleMini
    }));
  }

  var _fnStyle = isShowFn ? _crModalMenuStyle(_refToolbar, S.BT_FN.left) : void 0;

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_ModalMenuFn["default"], {
    isShow: isShowFn,
    style: (0, _extends2["default"])({}, S.M_FN, _fnStyle),
    config: config,
    getChart: getChart,
    onX2H: onClick2H,
    onMinMax: onMinMax,
    onZoom: onZoom,
    onCopy: onCopy,
    onPasteTo: onPasteTo,
    onClose: toggleFn
  }), _modalMenuArr, /*#__PURE__*/_react["default"].createElement("div", {
    ref: _refToolbar,
    className: CL.SCROLL,
    style: style
  }, _btTabIndicator, _btLegend, /*#__PURE__*/_react["default"].createElement(_ButtonTab["default"], {
    style: S.BT_FN,
    caption: "Fn",
    isShow: isShowFn,
    isMenu: true,
    onClick: toggleFn
  }), _btAdd, _btInfo, _btTabMini, /*#__PURE__*/_react["default"].createElement(_ButtonTab["default"], {
    is: !!_btTabMini,
    className: CL.BT_R,
    style: S.BT_R,
    caption: ">",
    onClick: _hClickR
  })));
};
/*
ChartToolbar.propTypes = {
  hasError: PropTypes.bool,

  style: PropTypes.object,
  config: PropTypes.object,

  getChart: PropTypes.func,
  
  onMiniChart: PropTypes.func,
  onAddMfi: PropTypes.func,
  onRemoveMfi: PropTypes.func,
  onClickLegend: PropTypes.func,
  onClick2H: PropTypes.func,
  onAddToWatch: PropTypes.func,
  onCopy: PropTypes.func,
  onPasteTo: PropTypes.func,
  onMinMax: PropTypes.func,
  onZoom: PropTypes.func,
  onClickInfo: PropTypes.func
}
*/


var _default = ChartToolbar;
exports["default"] = _default;
//# sourceMappingURL=ChartToolBar.js.map