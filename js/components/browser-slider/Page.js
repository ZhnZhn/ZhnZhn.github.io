"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Spinner = require("../zhn/Spinner");
var _MenuList = _interopRequireDefault(require("./MenuList"));
var _ErrMsg = _interopRequireDefault(require("./ErrMsg"));
var _jsxRuntime = require("react/jsx-runtime");
const Page = _ref => {
  let {
    refFirstItem,
    model,
    fOnClickItem,
    errMsg
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [!(model || errMsg) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner.SpinnerLoading, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuList.default, {
      refFirstItem: refFirstItem,
      model: model,
      fOnClickItem: fOnClickItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrMsg.default, {
      errMsg: errMsg
    })]
  });
};
var _default = exports.default = Page;
//# sourceMappingURL=Page.js.map