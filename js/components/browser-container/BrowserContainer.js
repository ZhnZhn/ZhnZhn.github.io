"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _DialogContainer = _interopRequireDefault(require("../zhn-containers/DialogContainer"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const CL_ROOT = "hrz-container";

const BrowserContainer = _ref => {
  let {
    initBrowserAction,
    showDialogAction,
    onCloseDialog
  } = _ref;
  const [elBrowsers, setElBrowsers] = (0, _react.useState)([]);
  (0, _useListen.default)((actionType, elBrowser) => {
    if (actionType === initBrowserAction) {
      setElBrowsers(arrEl => [elBrowser, ...arrEl]);
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_ROOT,
    children: [elBrowsers, /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogContainer.default, {
      maxDialog: 3,
      showAction: showDialogAction,
      onCloseDialog: onCloseDialog
    })]
  });
};
/*
BrowserContainer.propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func
  }),
  initBrowserAction: PropTypes.string,
  showDialogAction: PropTypes.string,
  onCloseDialog: PropTypes.func
}
*/


var _default = BrowserContainer;
exports.default = _default;
//# sourceMappingURL=BrowserContainer.js.map