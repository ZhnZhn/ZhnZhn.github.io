"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));
var _jsxRuntime = require("react/jsx-runtime");
const _crItem = (item, index, _ref) => {
  let {
    selectedIndex,
    className,
    refOptionNode,
    onClick,
    propCaption,
    ItemComp
  } = _ref;
  return (
    /*#__PURE__*/
    /*eslint-disable jsx-a11y/click-events-have-key-events*/
    (0, _jsxRuntime.jsx)("div", {
      role: "option",
      "aria-selected": selectedIndex === index,
      tabIndex: "-1",
      className: className,
      ref: n => refOptionNode(n, index),
      onClick: () => onClick(item, index),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemComp, {
        item: item,
        propCaption: propCaption
      })
    }, index)
    /*eslint-enable jsx-a11y/click-events-have-key-events*/
  );
};

const OptionList = _ref2 => {
  let {
    options,
    ...restProps
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
    items: options,
    crItem: _crItem,
    ...restProps
  });
};
var _default = exports.default = OptionList;
//# sourceMappingURL=OptionList.js.map