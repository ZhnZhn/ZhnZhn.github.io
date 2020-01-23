"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var DialogSlice = {
  getDialogConf: function getDialogConf(conf, chartType) {
    //DialogStatN
    if (conf && conf.dialogConf) {
      return conf;
    }

    var _browserId = chartType.split('_')[0];
    return this.getSourceConfig(_browserId, chartType);
  }
};
var _default = DialogSlice;
exports["default"] = _default;
//# sourceMappingURL=DialogSlice.js.map