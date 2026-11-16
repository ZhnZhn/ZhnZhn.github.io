"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _Svg = require("../zhn/svg/Svg");
var _InputSwitch = _interopRequireDefault(require("../zhn/InputSwitch"));
var _jsxRuntime = require("react/jsx-runtime");
const SUB_MENU = 'sub',
  S_ITEM = {
    position: 'relative'
  },
  S_INPUT_SWITCH = {
    height: 35,
    paddingTop: 9
  },
  S_NEXT_PAGE = {
    ..._styleFn.S_INLINE,
    ...(0, _styleFn.crAbsoluteTopLeftStyle)(8, 6, !0)
  };
const NextPageArrow = ({
  type
}) => type === SUB_MENU ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.SvgArrowRight, {
  style: S_NEXT_PAGE
}) : null;
const MenuItemList = ({
  getRefItem,
  items,
  itemCl,
  pageNumber,
  onNextPage,
  onClose
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
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
      _onClick = type === SUB_MENU ? (0, _uiApi.bindTo)(onNextPage, id, name, pageNumber) : (0, _uiApi.fOnClick)(onClick, onClose, isClose);
    return (0, _isTypeFn.isBool)(isInitial) ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ...(0, _a11yFn.crMenuItemRole)(),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
        refEl: getRefItem(index),
        className: cn || itemCl,
        style: S_INPUT_SWITCH,
        initialValue: isInitial,
        caption: name,
        onToggle: _onClick
      })
    }, name) : /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ref: getRefItem(index),
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

/*
MenuItemList.propTypes = {
  items: PropTypes.array,
  itemCl: PropTypes.string,
  pageNumber: PropTypes.number,
  getRefItem: PropTypes.func,
  onNextPage: PropTypes.func,
  onClose: PropTypes.func
}
*/
var _default = exports.default = MenuItemList;
//# sourceMappingURL=MenuItemList.js.map