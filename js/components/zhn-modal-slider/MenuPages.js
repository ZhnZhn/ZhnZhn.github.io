"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const MenuPages = _ref => {
  let {
    isShow,
    style,
    pages,
    pageCurrent,
    onNextPage,
    onPrevPage,
    onClose
  } = _ref;
  return (0, _uiApi.safeMap)(pages, (Page, index) => {
    const _pageNumber = index + 1,
      _isFirstPage = index === 0;
    return (0, _uiApi.cloneUiElement)(Page, {
      style,
      isVisible: isShow && _pageNumber === pageCurrent,
      pageNumber: _pageNumber,
      onNextPage: _isFirstPage ? onNextPage : void 0,
      onPrevPage: _isFirstPage ? void 0 : (0, _uiApi.bindTo)(onPrevPage, _pageNumber),
      onClose
    });
  });
};
var _default = exports.default = MenuPages;
//# sourceMappingURL=MenuPages.js.map