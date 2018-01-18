'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Type = require('../../constants/Type');

var _settings = {};
var _withProxy = [_Type.LoadType.FS, _Type.LoadType.FAO, _Type.LoadType.NST, _Type.LoadType.NST_2, _Type.LoadType.SWS, _Type.LoadType.BLS];

var SettingSlice = {
  setting: {
    proxy: 'https://cors-anywhere.herokuapp.com/',
    isAdminMode: false,
    isDrawDeltaExtrems: false,
    isNotZoomToMinMax: false
  },

  exportSettingFn: function exportSettingFn() {
    return {
      key1: this.fSetKey([_Type.LoadType.AL]),
      key2: this.fSetKey([_Type.LoadType.B]),
      key3: this.fSetKey([_Type.LoadType.BEA]),
      key4: this.fSetKey([_Type.LoadType.INTR]),
      key5: this.fSetKey([_Type.LoadType.Q]),
      setProxy: this.setSetting('proxy').bind(this),
      getProxy: this.getProxy.bind(this),
      isAdminMode: this.isAdminMode.bind(this),
      isDrawDeltaExtrems: this.isSetting.bind(this, 'isDrawDeltaExtrems'),
      isNotZoomToMinMax: this.isSetting.bind(this, 'isNotZoomToMinMax')
    };
  },


  fSetKey: function fSetKey(propName) {
    return function (value) {
      _settings[propName] = value;
    };
  },

  getKey: function getKey(id) {
    switch (id) {
      case _Type.LoadType.AL_I:case _Type.LoadType.AL_S:
        return _settings[_Type.LoadType.AL];
      default:
        return _settings[id];
    }
  },


  setSetting: function setSetting(propName) {
    return function (value) {
      this.setting[propName] = value;
    };
  },

  getProxy: function getProxy(loadId) {
    /*
    const _id = id && id.loadId
              ? id.loadId
              : id;
    */
    if (_withProxy.indexOf(loadId) === -1) {
      return undefined;
    }
    return this.setting.proxy;
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