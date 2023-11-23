"use strict";

exports.__esModule = true;
exports.showOptionDialogImpl = exports.showDialogImpl = exports.getDialogConf = void 0;
var _Factory = require("../logic/Factory");
var _browserLogic = require("./browserLogic");
const getDialogConf = (conf, chartType) => {
  //DialogStatN
  if (conf && conf.dialogConf) {
    return conf;
  }
  const _browserId = chartType.split('_')[0];
  return (0, _browserLogic.getSourceConfig)(_browserId, chartType);
};
exports.getDialogConf = getDialogConf;
const showDialogImpl = (slice, _ref) => {
  let {
    type,
    browserType,
    dialogConfOr
  } = _ref;
  return slice[type] ? Promise.resolve({
    key: type
  }) : (0, _Factory.crDialog)(browserType, getDialogConf(dialogConfOr, type)).then(Comp => {
    slice[type] = true;
    return {
      key: type,
      Comp
    };
  });
};
exports.showDialogImpl = showDialogImpl;
const showOptionDialogImpl = (slice, options) => {
  const {
    type,
    data
  } = options;
  if (slice[type]) {
    return Promise.resolve({
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
    });
  }
};
exports.showOptionDialogImpl = showOptionDialogImpl;
//# sourceMappingURL=dialogLogic.js.map