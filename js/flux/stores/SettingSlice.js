"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _Type = require("../../constants/Type");

var _apiTitle2;

var _settings = {};
var _withApiKey = [_Type.LoadType.B, _Type.LoadType.AL, _Type.LoadType.AL_S, _Type.LoadType.AL_I, _Type.LoadType.BEA, _Type.LoadType.EIA, _Type.LoadType.FMP, _Type.LoadType.IEX, _Type.LoadType.INTR];
var _withProxy = [_Type.LoadType.FAO, _Type.LoadType.CRC];
var API_TITLE_AV = 'Alpha Vantage';

var _apiTitle = (_apiTitle2 = {
  DF: 'API'
}, _apiTitle2[_Type.LoadType.B] = 'Barchart Market Data', _apiTitle2[_Type.LoadType.AL] = API_TITLE_AV, _apiTitle2[_Type.LoadType.AL_S] = API_TITLE_AV, _apiTitle2[_Type.LoadType.AL_I] = API_TITLE_AV, _apiTitle2[_Type.LoadType.BEA] = 'BEA', _apiTitle2[_Type.LoadType.EIA] = 'EIA', _apiTitle2[_Type.LoadType.FMP] = 'FMP', _apiTitle2[_Type.LoadType.INTR] = 'Intrinio', _apiTitle2);

var _isUndef = function _isUndef(value) {
  return typeof value === 'undefined';
};

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
      key4: this.fSetKey([_Type.LoadType.EIA]),
      key5: this.fSetKey([_Type.LoadType.FMP]),
      key6: this.fSetKey([_Type.LoadType.IEX]),
      key7: this.fSetKey([_Type.LoadType.INTR]),
      key8: this.fSetKey([_Type.LoadType.Q]),
      setProxy: this.setSetting('proxy').bind(this),
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
      case _Type.LoadType.AL_I:
      case _Type.LoadType.AL_S:
        return _settings[_Type.LoadType.AL];

      case _Type.LoadType.WL:
      case _Type.LoadType.Q_T:
        return _settings[_Type.LoadType.Q];

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
    if (_withProxy.indexOf(loadId) === -1) {
      return '';
    }

    return this.setting.proxy;
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
    return _withApiKey.indexOf(loadId) !== -1 ? true : false;
  },
  getApiTitle: function getApiTitle(loadId) {
    return _apiTitle[loadId] || _apiTitle.DF;
  }
};
var _default = SettingSlice;
exports["default"] = _default;
//# sourceMappingURL=SettingSlice.js.map