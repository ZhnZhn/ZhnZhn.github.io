"use strict";

exports.__esModule = true;
exports.isSetting = exports.isProxyRequired = exports.isApiKeyRequired = exports.isAdminMode = exports.getProxy = exports.getKey = exports.getApiTitle = exports.exportSettingFn = void 0;
var _storeApi = require("../storeApi");
var _LoadType = require("../../constants/LoadType");
const _isUndef = value => typeof value === 'undefined';
const _withApiKey = [_LoadType.LT_AL, _LoadType.LT_IEX, _LoadType.LT_FMP, _LoadType.LT_INTR, _LoadType.LT_TW, _LoadType.LT_BEA, _LoadType.LT_EIA];
const _withProxyServer = [_LoadType.LT_Q, _LoadType.LT_QCT, _LoadType.LT_UN];
const _withProxyServer2 = [..._withProxyServer, _LoadType.LT_BF, _LoadType.LT_KC];
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
const _fIsRequired = items => id => items.indexOf(id) !== -1;
const isApiKeyRequired = exports.isApiKeyRequired = _fIsRequired(_withApiKey);
const isProxyRequired = exports.isProxyRequired = _fIsRequired(_withProxyServer);
const getApiTitle = loadId => _apiTitle[loadId] || _apiTitle.DF;
exports.getApiTitle = getApiTitle;
const _API_KEYS = Object.create(null);
const _fSetKey = propName => value => {
  _API_KEYS[propName] = value;
};
const getKey = id => {
  switch (id) {
    case _LoadType.LT_WL:
      return _API_KEYS[_LoadType.LT_Q];
    default:
      return _API_KEYS[id];
  }
};
exports.getKey = getKey;
const _SETTINGS = {
  proxy: '',
  isAdminMode: false,
  isDrawDeltaExtrems: false,
  isNotZoomToMinMax: false
};
const isSetting = (propName, value) => {
  if (_isUndef(value)) {
    return _SETTINGS[propName];
  }
  _SETTINGS[propName] = !!value;
};
exports.isSetting = isSetting;
const isAdminMode = exports.isAdminMode = (0, _storeApi.bindTo)(isSetting, 'isAdminMode');
const _setProxy = url => {
  if (('' + url).substring(0, 16) === 'http://127.0.0.1') {
    _SETTINGS.proxy = url;
    return true;
  }
};
const _isProxyServerValueRequired = _fIsRequired(_withProxyServer2);
const getProxy = loadId => _isProxyServerValueRequired(loadId) ? _SETTINGS.proxy : '';
exports.getProxy = getProxy;
const exportSettingFn = () => {
  return {
    key1: _fSetKey(_LoadType.LT_Q),
    key2: _fSetKey(_LoadType.LT_BEA),
    key3: _fSetKey(_LoadType.LT_BLS),
    key4: _fSetKey(_LoadType.LT_EIA),
    key5: _fSetKey(_LoadType.LT_AL),
    key6: _fSetKey(_LoadType.LT_FMP),
    key7: _fSetKey(_LoadType.LT_IEX),
    key8: _fSetKey(_LoadType.LT_INTR),
    key9: _fSetKey(_LoadType.LT_TW),
    setProxy: _setProxy,
    getProxy,
    isAdminMode,
    isDrawDeltaExtrems: (0, _storeApi.bindTo)(isSetting, 'isDrawDeltaExtrems'),
    isNotZoomToMinMax: (0, _storeApi.bindTo)(isSetting, 'isNotZoomToMinMax')
  };
};
exports.exportSettingFn = exportSettingFn;
//# sourceMappingURL=settingStore.js.map