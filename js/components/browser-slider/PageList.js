"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var PageList = function PageList(_ref) {
  var pages = _ref.pages,
      pageCurrent = _ref.pageCurrent;
  return pages.map(function (page, index) {
    return /*#__PURE__*/(0, _react.cloneElement)(page, {
      pageCurrent: pageCurrent,
      pageNumber: index + 1
    });
  });
};

var _default = PageList;
exports["default"] = _default;
//# sourceMappingURL=PageList.js.map