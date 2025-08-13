"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useItemsFocusTrap = _interopRequireDefault(require("../hooks/useItemsFocusTrap"));
var _useGetRefValue = _interopRequireDefault(require("../hooks/useGetRefValue2"));
var _useFocus = require("../hooks/useFocus");
var _useCanBeHidden = _interopRequireDefault(require("./useCanBeHidden"));
var _FocusTrap = _interopRequireDefault(require("../zhn-moleculs/FocusTrap"));
var _MenuTitle = _interopRequireDefault(require("./MenuTitle"));
var _MenuItemList = _interopRequireDefault(require("./MenuItemList"));
var _jsxRuntime = require("react/jsx-runtime");
const MenuPage = props => {
  const _refTitle = (0, _uiApi.useRef)(),
    [_getRefFocus, _refLastItem, _refFirstItem] = (0, _useItemsFocusTrap.default)(props.items),
    _getFocusFirstItem = (0, _useGetRefValue.default)(_refTitle, _refFirstItem),
    _style = (0, _useCanBeHidden.default)(props.canBeHidden);
  (0, _useFocus.useAsyncFocusFirstItemIf)(props.isVisible, _getFocusFirstItem);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      ...props.style,
      ...(0, _styleFn.crVisibilityHidden)(props.isVisible),
      ..._style
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_FocusTrap.default, {
      refFirst: _getFocusFirstItem,
      refLast: _refLastItem,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTitle.default, {
        refEl: _refTitle,
        titleCl: props.titleCl,
        title: props.title,
        onClick: props.onPrevPage
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItemList.default, {
        getRefFocus: _getRefFocus,
        items: props.items,
        itemCl: props.itemCl,
        pageNumber: props.pageNumber,
        onNextPage: props.onNextPage,
        onClose: props.onClose
      }), props.children]
    })
  });
};

/*
MenuPage.propTypes = {
  isVisible: PropTypes.bool,
  canBeHidden: PropTypes.bool,
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