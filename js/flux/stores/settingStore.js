"use strict";

exports.__esModule = true;
exports.isProxyRequired = exports.isApiKeyRequired = exports.isAdminMode = exports.getProxy = exports.getKey = exports.getApiTitle = exports.exportSettingFn = exports.addSettingTo = exports.CHECKBOX_CONFIGS = void 0;
var _ChartUiTheme = require("../../charts/ChartUiTheme");
var _Color = require("../../constants/Color");
var _storeApi = require("../storeApi");
var _LoadType = require("../../constants/LoadType");
const _createObject = () => Object.create(null),
  _assign = Object.assign;
const _withApiKey = [_LoadType.LT_Q, _LoadType.LT_AV, _LoadType.LT_AV_BLCH, _LoadType.LT_AV_ECON, _LoadType.LT_FMP, _LoadType.LT_INTR, _LoadType.LT_TW, _LoadType.LT_PLG, _LoadType.LT_BEA, _LoadType.LT_EIA, _LoadType.LT_WT];
const _withProxyServer = [_LoadType.LT_BIS, _LoadType.LT_ECB, _LoadType.LT_SNB, _LoadType.LT_Q, _LoadType.LT_UN, _LoadType.LT_BB, _LoadType.LT_WT];
const _withProxyServer2 = [..._withProxyServer, _LoadType.LT_CR, _LoadType.LT_BF, _LoadType.LT_KR, _LoadType.LT_KC, _LoadType.LT_GT, _LoadType.LT_HT, _LoadType.LT_KX];
const ALPHA_VANTAGE = 'Alpha Vantage';
const _apiTitle = {
  DF: '',
  [_LoadType.LT_AV]: ALPHA_VANTAGE,
  [_LoadType.LT_AV_BLCH]: ALPHA_VANTAGE,
  [_LoadType.LT_AV_ECON]: ALPHA_VANTAGE,
  [_LoadType.LT_BEA]: 'BEA',
  [_LoadType.LT_EIA]: 'EIA',
  [_LoadType.LT_FMP]: 'FMP',
  [_LoadType.LT_INTR]: 'Intrinio',
  [_LoadType.LT_TW]: 'Twelve Data',
  [_LoadType.LT_PLG]: 'Polygon.io',
  [_LoadType.LT_WT]: 'WTO',
  [_LoadType.LT_CRC]: 'CryptoCompare Information'
};
const _fIsRequired = items => id => items.indexOf(id) !== -1;
const isApiKeyRequired = exports.isApiKeyRequired = _fIsRequired(_withApiKey);
const isProxyRequired = exports.isProxyRequired = _fIsRequired(_withProxyServer);
const getApiTitle = loadId => _apiTitle[loadId] || _apiTitle.DF;
exports.getApiTitle = getApiTitle;
const _API_KEYS = _createObject();
const _fSetKey = propName => value => {
  _API_KEYS[propName] = value;
};
const getKey = id => {
  switch (id) {
    case _LoadType.LT_WL:
      return _API_KEYS[_LoadType.LT_Q];
    case _LoadType.LT_AV_BLCH:
    case _LoadType.LT_AV_ECON:
      return _API_KEYS[_LoadType.LT_AV];
    default:
      return _API_KEYS[id];
  }
};
exports.getKey = getKey;
const PN_LH_CORS_PROXY_SERVER = 'cps',
  PN_IS_ADMIN_MODE = 'isAdm',
  PN_IS_DRAW_DELTA_EXTREMS = 'isDrawDeltaExtrems',
  PN_IS_NOT_ZOOM_TO_MIN_MAX = 'isNotZoomToMinMax',
  PN_IS_AXIS_LABELS_GREY = 'isAlg';
const CHECKBOX_CONFIGS = exports.CHECKBOX_CONFIGS = [['View in Admin Mode', PN_IS_ADMIN_MODE], ['Draw Axis Labels Grey', PN_IS_AXIS_LABELS_GREY], ['Draw Deltas to Min-Max', PN_IS_DRAW_DELTA_EXTREMS], ['Not Zoom to Min-Max', PN_IS_NOT_ZOOM_TO_MIN_MAX]];
const _SETTINGS = _assign(_createObject(), {
  [PN_LH_CORS_PROXY_SERVER]: '',
  [PN_IS_ADMIN_MODE]: false,
  [PN_IS_DRAW_DELTA_EXTREMS]: false,
  [PN_IS_NOT_ZOOM_TO_MIN_MAX]: false,
  [PN_IS_AXIS_LABELS_GREY]: false
});
const _isSetting = propName => _SETTINGS[propName];
const _fGetSetOption = (propName, onSetting) => value => {
  if ((0, _storeApi.isUndef)(value)) {
    return _isSetting(propName);
  }
  _SETTINGS[propName] = !!value;
  if ((0, _storeApi.isFn)(onSetting)) {
    onSetting(_SETTINGS[propName]);
  }
};
const _setProxy = url => {
  if (('' + url).slice(0, 16) === 'http://127.0.0.1' || url === '') {
    _SETTINGS[PN_LH_CORS_PROXY_SERVER] = url;
    return true;
  }
};
const _isProxyServerValueRequired = _fIsRequired(_withProxyServer2);
const getProxy = loadId => _isProxyServerValueRequired(loadId) ? _SETTINGS[PN_LH_CORS_PROXY_SERVER] : '';
exports.getProxy = getProxy;
const _addBoolOptionTo = (options, propName) => {
  if ((0, _storeApi.isUndef)(options[propName])) {
    options[propName] = _isSetting(propName);
  }
};
const addSettingTo = (options, loadId) => {
  _assign(options, {
    apiKey: getKey(loadId),
    proxy: getProxy(loadId)
  });
  _addBoolOptionTo(options, PN_IS_DRAW_DELTA_EXTREMS);
  _addBoolOptionTo(options, PN_IS_NOT_ZOOM_TO_MIN_MAX);
  _addBoolOptionTo(options, PN_IS_AXIS_LABELS_GREY);
};
exports.addSettingTo = addSettingTo;
const _setAxisLabelColor = isGrey => {
  if (isGrey) {
    (0, _ChartUiTheme.setAxisLabelsColor)();
  } else {
    (0, _ChartUiTheme.setAxisLabelsColor)(_Color.COLOR_X_LABEL, _Color.COLOR_Y_LABEL);
  }
};
const isAdminMode = exports.isAdminMode = _fGetSetOption(PN_IS_ADMIN_MODE);
const _isDrawDeltaExtrems = _fGetSetOption(PN_IS_DRAW_DELTA_EXTREMS),
  _isNotZoomToMinMax = _fGetSetOption(PN_IS_NOT_ZOOM_TO_MIN_MAX),
  _isAxisLabelsGrey = _fGetSetOption(PN_IS_AXIS_LABELS_GREY, _setAxisLabelColor);
const exportSettingFn = () => ({
  key1: _fSetKey(_LoadType.LT_Q),
  key2: _fSetKey(_LoadType.LT_WT),
  key3: _fSetKey(_LoadType.LT_BEA),
  key4: _fSetKey(_LoadType.LT_BLS),
  key5: _fSetKey(_LoadType.LT_EIA),
  key6: _fSetKey(_LoadType.LT_AV),
  key7: _fSetKey(_LoadType.LT_FMP),
  key8: _fSetKey(_LoadType.LT_INTR),
  key9: _fSetKey(_LoadType.LT_TW),
  key10: _fSetKey(_LoadType.LT_PLG),
  setProxy: _setProxy,
  getProxy,
  [PN_IS_ADMIN_MODE]: isAdminMode,
  [PN_IS_DRAW_DELTA_EXTREMS]: _isDrawDeltaExtrems,
  [PN_IS_NOT_ZOOM_TO_MIN_MAX]: _isNotZoomToMinMax,
  [PN_IS_AXIS_LABELS_GREY]: _isAxisLabelsGrey
});
exports.exportSettingFn = exportSettingFn;
//# sourceMappingURL=settingStore.js.map