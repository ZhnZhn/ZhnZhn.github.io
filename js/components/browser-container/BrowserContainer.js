"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _useStoreState = _interopRequireDefault(require("../hooks/useStoreState"));
var _DialogContainer = _interopRequireDefault(require("../zhn-containers/DialogContainer"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_HRZ_CONTAINER = "hrz-container";
const updateElementBrowsers = (msInitBrowser, setState) => {
  const {
    elBrowser
  } = msInitBrowser || {};
  if (elBrowser) {
    setState(arrEl => [elBrowser, ...arrEl]);
  }
};
const BrowserContainer = _ref => {
  let {
    useMsInitBrowser
  } = _ref;
  const elBrowsers = (0, _useStoreState.default)([], useMsInitBrowser, updateElementBrowsers)[0];
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_HRZ_CONTAINER,
    children: [elBrowsers, /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogContainer.default, {
      maxDialog: 3
    })]
  });
};
var _default = exports.default = BrowserContainer;
//# sourceMappingURL=BrowserContainer.js.map