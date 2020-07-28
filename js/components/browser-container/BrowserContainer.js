"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useListen = _interopRequireDefault(require("../hooks/useListen"));

var _DialogContainer = _interopRequireDefault(require("../zhn-containers/DialogContainer"));

//import PropTypes from "prop-types";
var CL_ROOT = "hrz-container";

var BrowserContainer = function BrowserContainer(_ref) {
  var store = _ref.store,
      initBrowserAction = _ref.initBrowserAction,
      showDialogAction = _ref.showDialogAction,
      onCloseDialog = _ref.onCloseDialog;

  var _useState = (0, _react.useState)([]),
      elBrowsers = _useState[0],
      setElBrowsers = _useState[1];

  (0, _useListen["default"])(store, function (actionType, elBrowser) {
    if (actionType === initBrowserAction) {
      setElBrowsers(function (arrEl) {
        return [elBrowser].concat(arrEl);
      });
    }
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: CL_ROOT
  }, elBrowsers, /*#__PURE__*/_react["default"].createElement(_DialogContainer["default"], {
    maxDialog: 3,
    store: store,
    showAction: showDialogAction,
    onCloseDialog: onCloseDialog
  }));
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
exports["default"] = _default;
//# sourceMappingURL=BrowserContainer.js.map