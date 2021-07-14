"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _Type = require("../../constants/Type");

var _apiTitle2;

var _settings = {};
var _withApiKey = [_Type.LoadType.AL, _Type.LoadType.IEX, _Type.LoadType.FMP, _Type.LoadType.INTR, _Type.LoadType.TW, _Type.LoadType.BEA, _Type.LoadType.EIA];
var _withProxy = [_Type.LoadType.FAO];

var _apiTitle = (_apiTitle2 = {
  DF: ''
}, _apiTitle2[_Type.LoadType.AL] = 'Alpha Vantage', _apiTitle2[_Type.LoadType.IEX] = 'IEX Cloud', _apiTitle2[_Type.LoadType.BEA] = 'BEA', _apiTitle2[_Type.LoadType.EIA] = 'EIA', _apiTitle2[_Type.LoadType.FMP] = 'FMP', _apiTitle2[_Type.LoadType.INTR] = 'Intrinio', _apiTitle2[_Type.LoadType.TW] = 'Twelve Data', _apiTitle2[_Type.LoadType.FAO] = 'FAOSTAT', _apiTitle2[_Type.LoadType.CRC] = 'CryptoCompare Information', _apiTitle2);

var _isUndef = function _isUndef(value) {
  return typeof value === 'undefined';
};

var SettingSlice = {
  setting: {
    proxy: '',
    isAdminMode: false,
    isDrawDeltaExtrems: false,
    isNotZoomToMinMax: false
  },
  exportSettingFn: function exportSettingFn() {
    return {
      key1: this.fSetKey([_Type.LoadType.AL]),
      key2: this.fSetKey([_Type.LoadType.TW]),
      key3: this.fSetKey([_Type.LoadType.BEA]),
      key4: this.fSetKey([_Type.LoadType.BLS]),
      key5: this.fSetKey([_Type.LoadType.EIA]),
      key6: this.fSetKey([_Type.LoadType.FMP]),
      key7: this.fSetKey([_Type.LoadType.IEX]),
      key8: this.fSetKey([_Type.LoadType.INTR]),
      key9: this.fSetKey([_Type.LoadType.Q]),
      setProxy: this.setProxy.bind(this),
      getProxy: this.getProxy.bind(this, _Type.LoadType.FAO),
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
      case _Type.LoadType.WL:
      case _Type.LoadType.Q_T:
        return _settings[_Type.LoadType.Q];

      default:
        return _settings[id];
    }
  },
  setProxy: function setProxy(url) {
    if (('' + url).substring(0, 16) === 'http://127.0.0.1') {
      this.setting.proxy = url;
      return true;
    }
  },
  getProxy: function getProxy(loadId) {
    return _withProxy.indexOf(loadId) === -1 ? '' : this.setting.proxy;
  },
  isSetting: function isSetting(propName, value) {
    if (_isUndef(value)) {
      return this.setting[propName];
    }

    this.setting[propName] = !!value;
  },
  isAdminMode: function isAdminMode(value) {
    if (_isUndef(value)) {
      return this.setting.isAdminMode;
    }

    this.setting.isAdminMode = !!value;
  },
  isApiKeyRequired: function isApiKeyRequired(loadId) {
    return _withApiKey.indexOf(loadId) !== -1;
  },
  isProxyRequired: function isProxyRequired(loadId) {
    return _withProxy.indexOf(loadId) !== -1;
  },
  getApiTitle: function getApiTitle(loadId) {
    return _apiTitle[loadId] || _apiTitle.DF;
  }
};
var _default = SettingSlice;
exports["default"] = _default;
//# sourceMappingURL=SettingSlice.js.map