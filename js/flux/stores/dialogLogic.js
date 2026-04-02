"use strict";

exports.__esModule = true;
exports.showOptionDialogImpl = exports.showDialogImpl = void 0;
var _asyncFn = require("../../routers/asyncFn");
var _Factory = require("../logic/Factory");
var _getDialogConf = require("./getDialogConf");
const showDialogImpl = (slice, _ref) => {
  let {
    type,
    browserType,
    dialogConfOr
  } = _ref;
  return slice[type] ? (0, _asyncFn.resolvePromise)({
    key: type
  }) : (0, _Factory.crDialog)(browserType, (0, _getDialogConf.getDialogConf)(dialogConfOr, type)).then(Comp => {
    slice[type] = true;
    return {
      key: type,
      Comp
    };
  }).catch(_asyncFn.logErrMsg);
};
exports.showDialogImpl = showDialogImpl;
const showOptionDialogImpl = (slice, options) => {
  const {
    type,
    data
  } = options;
  if (slice[type]) {
    return (0, _asyncFn.resolvePromise)({
      key: type,
      data
    });
  } else {
    options.dialogType = type;
    return (0, _Factory.crOptionDialog)(options).then(Comp => {
      slice[type] = true;
      return {
        key: type,
        Comp,
        data
      };
    }).catch(_asyncFn.logErrMsg);
  }
};
exports.showOptionDialogImpl = showOptionDialogImpl;
//# sourceMappingURL=dialogLogic.js.map