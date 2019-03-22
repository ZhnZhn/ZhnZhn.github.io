'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _apiTitle2;

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _settings = {};
var _withApiKey = [_Type.LoadType.B, _Type.LoadType.AL, _Type.LoadType.AL_S, _Type.LoadType.AL_I, _Type.LoadType.BEA, _Type.LoadType.EIA, _Type.LoadType.INTR];
var _withProxy = [_Type.LoadType.FS, _Type.LoadType.FAO, _Type.LoadType.BLS, _Type.LoadType.CRC];
var _apiTitle = (_apiTitle2 = {
  DF: 'API'
}, (0, _defineProperty3.default)(_apiTitle2, _Type.LoadType.B, 'Barchart Market Data'), (0, _defineProperty3.default)(_apiTitle2, _Type.LoadType.AL, 'Alpha Vantage'), (0, _defineProperty3.default)(_apiTitle2, _Type.LoadType.AL_S, 'Alpha Vantage'), (0, _defineProperty3.default)(_apiTitle2, _Type.LoadType.AL_I, 'Alpha Vantage'), (0, _defineProperty3.default)(_apiTitle2, _Type.LoadType.BEA, 'BEA'), (0, _defineProperty3.default)(_apiTitle2, _Type.LoadType.EIA, 'EIA'), (0, _defineProperty3.default)(_apiTitle2, _Type.LoadType.INTR, 'Intrinio'), _apiTitle2);

var _isUndef = function _isUndef(v) {
  return typeof v === 'undefined';
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
      key4: this.fSetKey([_Type.LoadType.INTR]),
      key5: this.fSetKey([_Type.LoadType.Q]),
      key6: this.fSetKey([_Type.LoadType.EIA]),
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
      case _Type.LoadType.AL_I:case _Type.LoadType.AL_S:
        return _settings[_Type.LoadType.AL];
      case _Type.LoadType.EIA:
        return _settings[_Type.LoadType.EIA];
      case _Type.LoadType.WL:
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

exports.default = SettingSlice;
//# sourceMappingURL=SettingSlice.js.map