"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var MenuPages = function MenuPages(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      pages = _ref.pages,
      pageCurrent = _ref.pageCurrent,
      onNextPage = _ref.onNextPage,
      onPrevPage = _ref.onPrevPage,
      onClose = _ref.onClose;
  return pages.map(function (Page, index) {
    return /*#__PURE__*/(0, _react.cloneElement)(Page, {
      isShow: isShow,
      pageCurrent: pageCurrent,
      style: style,
      pageNumber: index + 1,
      onNextPage: index === 0 ? onNextPage : void 0,
      onPrevPage: index !== 0 ? onPrevPage : void 0,
      onClose: onClose
    });
  });
};

var _default = MenuPages;
exports["default"] = _default;
//# sourceMappingURL=MenuPages.js.map