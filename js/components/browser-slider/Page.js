"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _SpinnerLoading = _interopRequireDefault(require("../zhn/SpinnerLoading"));

var _MenuList = _interopRequireDefault(require("./MenuList"));

var _ErrMsg = _interopRequireDefault(require("./ErrMsg"));

var Page = function Page(_ref) {
  var refFirstItem = _ref.refFirstItem,
      model = _ref.model,
      fOnClickItem = _ref.fOnClickItem,
      errMsg = _ref.errMsg;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [!(model || errMsg) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpinnerLoading["default"], {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuList["default"], {
      refFirstItem: refFirstItem,
      model: model,
      fOnClickItem: fOnClickItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrMsg["default"], {
      errMsg: errMsg
    })]
  });
};

var _default = Page;
exports["default"] = _default;
//# sourceMappingURL=Page.js.map