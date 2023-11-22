"use strict";

exports.__esModule = true;
exports.default = void 0;
var _browserLogic = require("./browserLogic");
const DialogSlice = {
  getDialogConf(conf, chartType) {
    //DialogStatN
    if (conf && conf.dialogConf) {
      return conf;
    }
    const _browserId = chartType.split('_')[0];
    return (0, _browserLogic.getSourceConfig)(_browserId, chartType);
  }
};
var _default = exports.default = DialogSlice;
//# sourceMappingURL=DialogSlice.js.map