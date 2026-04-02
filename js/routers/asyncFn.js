"use strict";

exports.__esModule = true;
exports.throwErrOffline = exports.resolvePromise = exports.logErrMsg = exports.getModuleDefault = void 0;
var _Msg = require("../constants/Msg");
/*
import {
  showAlertDialogBy
} from '../flux/stores/compStore';
*/

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
    console.log(errMsg);
    /*
    showAlertDialogBy(
      NETWORK_ERROR,
      MSG_OFFLINE
    )
    */
  }
};
exports.logErrMsg = logErrMsg;
//# sourceMappingURL=asyncFn.js.map