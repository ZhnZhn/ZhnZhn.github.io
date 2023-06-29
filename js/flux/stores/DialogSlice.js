"use strict";

exports.__esModule = true;
exports.default = void 0;
const DialogSlice = {
  getDialogConf(conf, chartType) {
    //DialogStatN
    if (conf && conf.dialogConf) {
      return conf;
    }
    const _browserId = chartType.split('_')[0];
    return this.getSourceConfig(_browserId, chartType);
  }
};
var _default = DialogSlice;
exports.default = _default;
//# sourceMappingURL=DialogSlice.js.map