"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useToggle2 = _interopRequireDefault(require("../hooks/useToggle"));

var _ItemStack = _interopRequireDefault(require("./ItemStack"));

var _LegendItem = _interopRequireDefault(require("./LegendItem"));

var CL_SCROLL = "with-scroll",
    CL_BT_ML = "bt-ml",
    MORE_MAX = 12;
var S = {
  MORE: {
    overflowY: 'auto',
    height: 250,
    paddingRight: 4,
    marginLeft: -8,
    transform: 'scaleX(-1)'
  },
  LESS: {
    height: 'auto'
  },
  DIV: {
    transform: 'scaleX(-1)'
  }
};

var _crBtCaption = function _crBtCaption(isMore, len) {
  return isMore ? "Less: " + MORE_MAX : "More: " + (len - MORE_MAX);
};

var BtMoreOrLess = function BtMoreOrLess(_ref) {
  var isMore = _ref.isMore,
      legend = _ref.legend,
      onClick = _ref.onClick;
  var _len = legend.length;
  return _len > MORE_MAX ? /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: CL_BT_ML,
    onClick: onClick,
    children: _crBtCaption(isMore, _len)
  }) : null;
};

var _crLegendItem = function _crLegendItem(onClickItem, item) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendItem["default"], {
    item: item,
    onClickItem: onClickItem
  }, item.name);
};

var Legend = /*#__PURE__*/(0, _react.memo)(function (_ref2) {
  var _ref2$legend = _ref2.legend,
      legend = _ref2$legend === void 0 ? [] : _ref2$legend,
      onClickItem = _ref2.onClickItem;

  var _useToggle = (0, _useToggle2["default"])(false),
      isMore = _useToggle[0],
      toggleIsMore = _useToggle[1],
      _legendItems = isMore ? legend : legend.slice(0, MORE_MAX),
      _crStackItem = (0, _react.useCallback)(function (item) {
    return _crLegendItem(onClickItem, item);
  }, [onClickItem]),
      _style = isMore ? S.MORE : (0, _extends2["default"])({}, S.MORE, S.LESS);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: CL_SCROLL,
    style: _style,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.DIV,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack["default"], {
        items: _legendItems,
        crItem: _crStackItem
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(BtMoreOrLess, {
        isMore: isMore,
        legend: legend,
        onClick: toggleIsMore
      })]
    })
  });
});
var _default = Legend;
exports["default"] = _default;
//# sourceMappingURL=Legend.js.map