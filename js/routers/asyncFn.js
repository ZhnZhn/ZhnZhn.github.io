"use strict";

exports.__esModule = true;
exports.throwErrOffline = exports.resolvePromise = exports.logErrMsg = exports.getModuleDefault = void 0;
var _Msg = require("../constants/Msg");
var _compStore = require("../flux/stores/compStore");
const resolvePromise = exports.resolvePromise = Promise.resolve.bind(Promise);
const getModuleDefault = module => module.default;
exports.getModuleDefault = getModuleDefault;
const throwErrOffline = () => {
  throw new Error(_Msg.MSG_OFFLINE);
};
exports.throwErrOffline = throwErrOffline;
const logErrMsg = err => {
  const errMsg = (err || {}).message || "";
  console.log(errMsg);
  if (errMsg === _Msg.MSG_OFFLINE) {
    (0, _compStore.showAlertDialogBy)(_Msg.NETWORK_ERROR, _Msg.MSG_OFFLINE);
  }
};
exports.logErrMsg = logErrMsg;
//# sourceMappingURL=asyncFn.js.map