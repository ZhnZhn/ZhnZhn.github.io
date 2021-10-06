"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _ItemStack = _interopRequireDefault(require("./ItemStack"));

var _LegendItem = _interopRequireDefault(require("./LegendItem"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_SCROLL = "with-scroll",
      CL_BT_ML = "bt-ml",
      MORE_MAX = 12,
      S_MORE = {
  overflowY: 'auto',
  height: 250,
  paddingRight: 4,
  marginLeft: -8,
  transform: 'scaleX(-1)'
},
      S_LESS = {
  height: 'auto'
},
      S_DIV = {
  transform: 'scaleX(-1)'
};

const _crBtCaption = (isMore, len) => isMore ? "Less: " + MORE_MAX : "More: " + (len - MORE_MAX);

const BtMoreOrLess = ({
  isMore,
  legend,
  onClick
}) => {
  const _len = legend.length;
  return _len > MORE_MAX ? /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: CL_BT_ML,
    onClick: onClick,
    children: _crBtCaption(isMore, _len)
  }) : null;
};

const _crLegendItem = (onClickItem, item) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendItem.default, {
  item: item,
  onClickItem: onClickItem
}, item.name);

const Legend = /*#__PURE__*/(0, _react.memo)(({
  legend = [],
  onClickItem
}) => {
  const [isMore, toggleIsMore] = (0, _useToggle.default)(false),
        _legendItems = isMore ? legend : legend.slice(0, MORE_MAX),
        _crStackItem = (0, _react.useCallback)(item => _crLegendItem(onClickItem, item), [onClickItem]),
        _style = isMore ? S_MORE : { ...S_MORE,
    ...S_LESS
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: CL_SCROLL,
    style: _style,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_DIV,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
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
exports.default = _default;
//# sourceMappingURL=Legend.js.map