'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SettingSlice = {
  setting: {
    quandlKey: undefined,
    barchartKey: undefined,
    alphaKey: undefined,
    isAdminMode: false,
    isDrawDeltaExtrems: false,
    isNotZoomToMinMax: false
  },

  exportSettingFn: function exportSettingFn() {
    return {
      setQuandlKey: this.setSetting('quandlKey').bind(this),
      setAlphaKey: this.setSetting('alphaKey').bind(this),
      setBarcharKey: this.setSetting('barchartKey').bind(this),
      isAdminMode: this.isAdminMode.bind(this),
      isDrawDeltaExtrems: this.isSetting.bind(this, 'isDrawDeltaExtrems'),
      isNotZoomToMinMax: this.isSetting.bind(this, 'isNotZoomToMinMax')
    };
  },


  setSetting: function setSetting(propName) {
    return function (value) {
      this.setting[propName] = value;
    };
  },
  getQuandlKey: function getQuandlKey() {
    return this.setting.quandlKey;
  },
  getBarchartKey: function getBarchartKey() {
    return this.setting.barchartKey;
  },
  getAlphaKey: function getAlphaKey() {
    return this.setting.alphaKey;
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