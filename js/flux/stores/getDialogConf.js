"use strict";

exports.__esModule = true;
exports.getDialogConf = void 0;
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
//# sourceMappingURL=getDialogConf.js.map