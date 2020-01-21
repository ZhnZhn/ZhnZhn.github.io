"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var DialogSlice = {
  getDialogConf: function getDialogConf(conf, dialogType) {
    if (conf && conf.dialogConf) {
      return conf;
    }

    var _browserId = dialogType.split('_')[0];
    return this.getSourceConfig(_browserId, dialogType);
  }
};
var _default = DialogSlice;
exports["default"] = _default;
//# sourceMappingURL=DialogSlice.js.map