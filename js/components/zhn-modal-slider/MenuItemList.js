"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _InputSwitch = _interopRequireDefault(require("../zhn/InputSwitch"));
var _jsxRuntime = require("react/jsx-runtime");
const SUB_MENU = 'sub',
  S_ITEM = {
    position: 'relative'
  },
  S_INPUT_SWITCH = {
    lineHeight: 'initial',
    height: 35,
    paddingTop: 9
  },
  S_NEXT_PAGE = {
    ..._styleFn.S_INLINE,
    ...(0, _styleFn.crAbsoluteTopLeftStyle)(0, 4, !0),
    color: 'inherit',
    padding: '1px 16px 1px 0px',
    fontWeight: 'bold'
  };
const _fClick = _ref => {
  let {
    isClose,
    onClick,
    onClose
  } = _ref;
  return (0, _uiApi.isFn)(onClick) ? isClose ? () => {
    onClick();
    onClose();
  } : onClick : void 0;
};
const NextPageArrow = _ref2 => {
  let {
    type
  } = _ref2;
  return type === SUB_MENU ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: S_NEXT_PAGE,
    children: ">"
  }) : null;
};
const MenuItemList = _ref3 => {
  let {
    getRefFocus,
    items,
    itemCl,
    pageNumber,
    onNextPage,
    onClose
  } = _ref3;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: (0, _uiApi.safeMap)(items, (item, index) => {
      const {
          cn,
          name,
          type,
          id,
          isClose,
          isInitial,
          onClick
        } = item,
        _onClick = type === SUB_MENU ? (0, _uiApi.bindTo)(onNextPage, id, name, pageNumber) : _fClick({
          isClose,
          onClick,
          onClose
        });
      return (0, _isTypeFn.isBool)(isInitial) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        ...(0, _a11yFn.crMenuItemRole)(),
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
          refEl: getRefFocus(index),
          className: cn || itemCl,
          style: S_INPUT_SWITCH,
          initialValue: isInitial,
          caption: name,
          onToggle: _onClick
        })
      }, name) : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        ref: getRefFocus(index),
        className: cn || itemCl,
        style: S_ITEM,
        ...(0, _a11yFn.crMenuItemRole)(_onClick, "0"),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          children: name
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(NextPageArrow, {
          type: type
        })]
      }, name);
    })
  });
};

/*
MenuItemList.propTypes = {
  items: PropTypes.array,
  itemCl: PropTypes.string,
  pageNumber: PropTypes.number,
  onNextPage: PropTypes.func,
  onClose: PropTypes.func
}
*/
var _default = exports.default = MenuItemList;
//# sourceMappingURL=MenuItemList.js.map