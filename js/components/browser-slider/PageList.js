"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Frame = _interopRequireDefault(require("./Frame"));

var _react = require("react");

const PageList = _ref => {
  let {
    pages,
    onClickPrev,
    ...restProps
  } = _ref;
  return pages.map((pageProps, index) => /*#__PURE__*/(0, _react.createElement)(_Frame.default, { ...restProps,
    ...pageProps,
    key: pageProps.id,
    pageNumber: index,
    onClickPrev: index === 0 ? void 0 : onClickPrev
  }));
};

var _default = PageList;
exports.default = _default;
//# sourceMappingURL=PageList.js.map