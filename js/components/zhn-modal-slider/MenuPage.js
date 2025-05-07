"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _has = require("../has");
var _useItemsFocusTrap = _interopRequireDefault(require("../hooks/useItemsFocusTrap"));
var _useGetRefValue = _interopRequireDefault(require("../hooks/useGetRefValue2"));
var _useFocus = require("../hooks/useFocus");
var _FocusTrap = _interopRequireDefault(require("../zhn-moleculs/FocusTrap"));
var _MenuTitle = _interopRequireDefault(require("./MenuTitle"));
var _MenuItemList = _interopRequireDefault(require("./MenuItemList"));
var _jsxRuntime = require("react/jsx-runtime");
const DF_ITEMS = [];
const FOCUS_ITEM_MLS = 350;
const MenuPage = _ref => {
  let {
    isVisible,
    style,
    title,
    titleCl,
    itemCl,
    pageNumber,
    items = DF_ITEMS,
    onNextPage,
    onPrevPage,
    onClose,
    children
  } = _ref;
  const _refTitle = (0, _uiApi.useRef)(),
    [_getRefFocus, _refLastItem, _refFirstItem] = (0, _useItemsFocusTrap.default)(items),
    _getFocusFirstItem = (0, _useGetRefValue.default)(_refTitle, _refFirstItem),
    _hClickTitle = (0, _uiApi.useCallback)(() => {
      onPrevPage(pageNumber);
    }, [onPrevPage, pageNumber]);
  (0, _useFocus.useAsyncFocusIf)(_has.HAS_KEYBOARD_FOCUS && isVisible, _getFocusFirstItem, FOCUS_ITEM_MLS);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: style,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_FocusTrap.default, {
      refFirst: _getFocusFirstItem,
      refLast: _refLastItem,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTitle.default, {
        refEl: _refTitle,
        titleCl: titleCl,
        title: title,
        onClick: _hClickTitle
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItemList.default, {
        getRefFocus: _getRefFocus,
        items: items,
        itemCl: itemCl || titleCl,
        pageNumber: pageNumber,
        onNextPage: onNextPage,
        onClose: onClose
      }), children]
    })
  });
};

/*
MenuPage.propTypes = {
  isVisible: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.string,
  titleCl: PropTypes.string,
  itemCl: PropTypes.string,
  pageNumber: PropTypes.number,
  items: PropTypes.arrayOf(
     PropTypes.shapeOf({
        cn: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        id: PropTypes.string,
        isClose: PropTypes.bool,
        onClick: PropTypes.func
     })
  ),
  onNextPage: PropTypes.func,
  onPrevPage: PropTypes.func,
  onClose: PropTypes.func
}
*/
var _default = exports.default = MenuPage;
//# sourceMappingURL=MenuPage.js.map