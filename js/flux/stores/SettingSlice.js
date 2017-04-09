'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SettingSlice = {
  setting: {
    quandlKey: undefined,
    isAdminMode: false
  },
  setQuandlKey: function setQuandlKey(value) {
    this.setting.quandlKey = value;
  },
  getQuandlKey: function getQuandlKey() {
    return this.setting.quandlKey;
  },
  isAdminMode: function isAdminMode(value) {
    if (typeof value == 'undefined') {
      return this.setting.isAdminMode;
    }
    this.setting.isAdminMode = !!value;
  }
};

exports.default = SettingSlice;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\SettingSlice.js.map