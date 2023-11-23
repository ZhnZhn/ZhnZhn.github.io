"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useListen = _interopRequireDefault(require("../hooks/useListen"));
var _DialogContainer = _interopRequireDefault(require("../zhn-containers/DialogContainer"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_HRZ_CONTAINER = "hrz-container";
const BrowserContainer = _ref => {
  let {
    initBrowserAction
  } = _ref;
  const [elBrowsers, setElBrowsers] = (0, _uiApi.useState)([]);
  (0, _useListen.default)((actionType, elBrowser) => {
    if (actionType === initBrowserAction) {
      setElBrowsers(arrEl => [elBrowser, ...arrEl]);
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_HRZ_CONTAINER,
    children: [elBrowsers, /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogContainer.default, {
      maxDialog: 3
    })]
  });
};
var _default = exports.default = BrowserContainer;
//# sourceMappingURL=BrowserContainer.js.map