"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _MenuTitle = _interopRequireDefault(require("./MenuTitle"));

var _MenuItemList = _interopRequireDefault(require("./MenuItemList"));

var _fFocus = function _fFocus(ref) {
  return function () {
    if (ref && ref.current) {
      ref.current.focus();
    }
  };
}; //const _getCurrent = ({ current }) => current;


var MenuPage = function MenuPage(_ref) {
  var isShow = _ref.isShow,
      _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      style = _ref.style,
      title = _ref.title,
      titleCl = _ref.titleCl,
      itemCl = _ref.itemCl,
      pageCurrent = _ref.pageCurrent,
      pageNumber = _ref.pageNumber,
      onClose = _ref.onClose,
      children = _ref.children,
      onNextPage = _ref.onNextPage,
      onPrevPage = _ref.onPrevPage;

  var _refTitle = (0, _react.useRef)(),
      _refFirst = (0, _react.useRef)(),
      _hClickTitle = (0, _react.useCallback)(function () {
    onPrevPage(pageNumber);
  }, [onPrevPage, pageNumber]),
      _isFocus = pageCurrent === pageNumber && isShow;

  (0, _react.useEffect)(function () {
    if (_isFocus) {
      if (_refTitle.current) {
        setTimeout(_fFocus(_refTitle), 1000);
      } else if (_refFirst.current) {
        setTimeout(_fFocus(_refFirst), 1000);
      }
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTitle["default"], {
      ref: _refTitle,
      titleCl: titleCl,
      title: title,
      onClick: _hClickTitle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItemList["default"], {
      ref: _refFirst,
      items: items,
      itemCl: itemCl || titleCl,
      pageNumber: pageNumber,
      onNextPage: onNextPage,
      onClose: onClose
    }), children]
  });
};
/*
MenuPage.propTypes = {
  isShow: PropTypes.bool,
  title: PropTypes.string,
  pageNumber: PropTypes.number,
  items: PropTypes.arrayOf(
     PropTypes.shapeOf({
        name: PropTypes.string,
        type: PropTypes.string,
        id: PropTypes.string,
        onClick: PropTypes.func
     })
  ),
  onNextPage: PropTypes.func,
  onPrevPage: PropTypes.func,
  onClose: PropTypes.func
}
*/


var _default = MenuPage;
exports["default"] = _default;
//# sourceMappingURL=MenuPage.js.map