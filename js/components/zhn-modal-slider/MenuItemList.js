"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _SvgCheckIn = _interopRequireDefault(require("../zhn/SvgCheckIn"));
var _MenuAriaItem = _interopRequireDefault(require("./MenuAriaItem"));
var _jsxRuntime = require("react/jsx-runtime");
const SUB_MENU = 'sub',
  CL_SP_SVG_CHECKED = 'sp-svg-checked',
  S_ITEM = {
    position: 'relative'
  },
  S_NEXT_PAGE = {
    display: 'inline-block',
    position: 'absolute',
    top: 0,
    right: 4,
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
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuAriaItem.default, {
        refEl: getRefFocus(index),
        className: cn || itemCl,
        style: S_ITEM,
        isInitial: isInitial,
        onClick: _onClick,
        children: is => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: name
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckIn.default, {
            is: is,
            cn: CL_SP_SVG_CHECKED
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(NextPageArrow, {
            type: type
          })]
        })
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