'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SettingSlice = {
  setting: {
    quandlKey: undefined,
    isAdminMode: false,
    isDrawDeltaExtrems: false,
    isNotZoomToMinMax: false
  },

  exportSettingFn: function exportSettingFn() {
    return {
      setQuandlKey: this.setQuandlKey.bind(this),
      isAdminMode: this.isAdminMode.bind(this),
      isDrawDeltaExtrems: this.isSetting.bind(this, 'isDrawDeltaExtrems'),
      isNotZoomToMinMax: this.isSetting.bind(this, 'isNotZoomToMinMax')
    };
  },
  setQuandlKey: function setQuandlKey(value) {
    this.setting.quandlKey = value;
  },
  getQuandlKey: function getQuandlKey() {
    return this.setting.quandlKey;
  },
  isSetting: function isSetting(propName, value) {
    if (typeof value == 'undefined') {
      return this.setting[propName];
    }
    this.setting[propName] = !!value;
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