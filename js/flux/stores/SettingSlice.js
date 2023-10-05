"use strict";

exports.__esModule = true;
exports.default = void 0;
var _LoadType = require("../../constants/LoadType");
const _settings = {};
const _withApiKey = [_LoadType.LT_AL, _LoadType.LT_IEX, _LoadType.LT_FMP, _LoadType.LT_INTR, _LoadType.LT_TW, _LoadType.LT_BEA, _LoadType.LT_EIA];
const _withProxy = [_LoadType.LT_Q, _LoadType.LT_QCT, _LoadType.LT_BF, _LoadType.LT_UN];
const _apiTitle = {
  DF: '',
  [_LoadType.LT_AL]: 'Alpha Vantage',
  [_LoadType.LT_IEX]: 'IEX Cloud',
  [_LoadType.LT_BEA]: 'BEA',
  [_LoadType.LT_EIA]: 'EIA',
  [_LoadType.LT_FMP]: 'FMP',
  [_LoadType.LT_INTR]: 'Intrinio',
  [_LoadType.LT_TW]: 'Twelve Data',
  [_LoadType.LT_CRC]: 'CryptoCompare Information'
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
      key1: this.fSetKey(_LoadType.LT_Q),
      key2: this.fSetKey(_LoadType.LT_BEA),
      key3: this.fSetKey(_LoadType.LT_BLS),
      key4: this.fSetKey(_LoadType.LT_EIA),
      key5: this.fSetKey(_LoadType.LT_AL),
      key6: this.fSetKey(_LoadType.LT_FMP),
      key7: this.fSetKey(_LoadType.LT_IEX),
      key8: this.fSetKey(_LoadType.LT_INTR),
      key9: this.fSetKey(_LoadType.LT_TW),
      setProxy: this.setProxy.bind(this),
      getProxy: this.getProxy.bind(this, _LoadType.LT_FAO),
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
      case _LoadType.LT_WL:
        return _settings[_LoadType.LT_Q];
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
var _default = exports.default = SettingSlice;
//# sourceMappingURL=SettingSlice.js.map