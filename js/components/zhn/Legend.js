"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useToggle = require("../hooks/useToggle");
var _Button = _interopRequireDefault(require("./Button"));
var _ItemStack = _interopRequireDefault(require("./ItemStack"));
var _LegendItem = _interopRequireDefault(require("./LegendItem"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_WITH_SCROLL = (0, _styleFn.crWithScrollCn)(),
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
const _crBtCaption = (isMore, len) => isMore ? `Less: ${MORE_MAX}` : `More: ${len - MORE_MAX}`;
const BtMoreOrLess = _ref => {
  let {
    isMore,
    legend,
    onClick
  } = _ref;
  const _len = legend.length;
  return _len > MORE_MAX ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
    className: CL_BT_ML,
    onClick: onClick,
    children: _crBtCaption(isMore, _len)
  }) : null;
};
const _crLegendItem = (item, index, onClickItem) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_LegendItem.default, {
  item: item,
  onClickItem: onClickItem
}, item.name + index);
const Legend = (0, _uiApi.memo)(_ref2 => {
  let {
    legend = [],
    onClickItem
  } = _ref2;
  const [isMore, toggleIsMore] = (0, _useToggle.useToggle)(false),
    _crStackItem = (0, _uiApi.useCallback)((item, index) => _crLegendItem(item, index, onClickItem), [onClickItem]),
    _legendItems = isMore ? legend : legend.slice(0, MORE_MAX),
    _style = (0, _styleFn.crStyle2)(S_MORE, !isMore && S_LESS);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: CL_WITH_SCROLL,
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
var _default = exports.default = Legend;
//# sourceMappingURL=Legend.js.map