"use strict";

exports.__esModule = true;
exports.logErrorToConsole = void 0;
var _arrFn = require("../../utils/arrFn");
const LOG_ERR_COLOR = 'color:rgb(237, 88, 19);',
  _consoleLogErr = str => {
    console.log('%c' + str, LOG_ERR_COLOR);
  };
const logErrorToConsole = _ref => {
  let {
    alertCaption,
    alertItemId,
    alertDescr
  } = _ref;
  _consoleLogErr((0, _arrFn.joinBy)(": ", alertCaption, alertItemId));
  _consoleLogErr(alertDescr);
};
exports.logErrorToConsole = logErrorToConsole;
//# sourceMappingURL=storeFn.js.map