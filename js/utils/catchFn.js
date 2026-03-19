"use strict";

exports.__esModule = true;
exports.resolvePromise = exports.catchLogErr = exports.catchDynamicLoad = void 0;
var _Msg = require("../constants/Msg");
const resolvePromise = exports.resolvePromise = Promise.resolve.bind(Promise);
const catchDynamicLoad = () => {
  throw new Error(_Msg.MSG_OFFLINE);
};
exports.catchDynamicLoad = catchDynamicLoad;
const catchLogErr = err => {
  console.log(err.message);
};
exports.catchLogErr = catchLogErr;
//# sourceMappingURL=catchFn.js.map