"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Type = require("../../constants/Type");

const _settings = {};
const _withApiKey = [_Type.LoadType.AL, _Type.LoadType.IEX, _Type.LoadType.FMP, _Type.LoadType.INTR, _Type.LoadType.TW, _Type.LoadType.BEA, _Type.LoadType.EIA];
const _withProxy = [_Type.LoadType.FAO, _Type.LoadType.BF];
const _apiTitle = {
  DF: '',
  [_Type.LoadType.AL]: 'Alpha Vantage',
  [_Type.LoadType.IEX]: 'IEX Cloud',
  [_Type.LoadType.BEA]: 'BEA',
  [_Type.LoadType.EIA]: 'EIA',
  [_Type.LoadType.FMP]: 'FMP',
  [_Type.LoadType.INTR]: 'Intrinio',
  [_Type.LoadType.TW]: 'Twelve Data',
  [_Type.LoadType.FAO]: 'FAOSTAT',
  [_Type.LoadType.CRC]: 'CryptoCompare Information'
};

const _isUndef = value => typeof value === 'undefined';

const SettingSlice = {
  setting: {
    proxy: '',
    isAdminMode: false,
    isDrawDeltaExtrems: false,
    isNotZoomToMinMax: false
  },

  exportSettingFn() {
    return {
      key1: this.fSetKey(_Type.LoadType.Q),
      key2: this.fSetKey(_Type.LoadType.BEA),
      key3: this.fSetKey(_Type.LoadType.BLS),
      key4: this.fSetKey(_Type.LoadType.EIA),
      key5: this.fSetKey(_Type.LoadType.AL),
      key6: this.fSetKey(_Type.LoadType.FMP),
      key7: this.fSetKey(_Type.LoadType.IEX),
      key8: this.fSetKey(_Type.LoadType.INTR),
      key9: this.fSetKey(_Type.LoadType.TW),
      setProxy: this.setProxy.bind(this),
      getProxy: this.getProxy.bind(this, _Type.LoadType.FAO),
      isAdminMode: this.isAdminMode.bind(this),
      isDrawDeltaExtrems: this.isSetting.bind(this, 'isDrawDeltaExtrems'),
      isNotZoomToMinMax: this.isSetting.bind(this, 'isNotZoomToMinMax')
    };
  },

  fSetKey: propName => value => {
    _settings[propName] = value;
  },

  getKey(id) {
    switch (id) {
      case _Type.LoadType.WL:
      case _Type.LoadType.Q_T:
        return _settings[_Type.LoadType.Q];

      default:
        return _settings[id];
    }
  },

  setProxy(url) {
    if (('' + url).substring(0, 16) === 'http://127.0.0.1') {
      this.setting.proxy = url;
      return true;
    }
  },

  getProxy(loadId) {
    return _withProxy.indexOf(loadId) === -1 ? '' : this.setting.proxy;
  },

  isSetting(propName, value) {
    if (_isUndef(value)) {
      return this.setting[propName];
    }

    this.setting[propName] = !!value;
  },

  isAdminMode(value) {
    if (_isUndef(value)) {
      return this.setting.isAdminMode;
    }

    this.setting.isAdminMode = !!value;
  },

  isApiKeyRequired(loadId) {
    return _withApiKey.indexOf(loadId) !== -1;
  },

  isProxyRequired(loadId) {
    return _withProxy.indexOf(loadId) !== -1;
  },

  getApiTitle(loadId) {
    return _apiTitle[loadId] || _apiTitle.DF;
  }

};
var _default = SettingSlice;
exports.default = _default;
//# sourceMappingURL=SettingSlice.js.map