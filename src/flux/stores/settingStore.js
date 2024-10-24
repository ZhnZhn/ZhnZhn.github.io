import { setAxisLabelsColor } from '../../charts/ChartUiTheme';
import {
  COLOR_X_LABEL,
  COLOR_Y_LABEL
} from '../../constants/Color';

import {
  isUndef,
  isFn
} from '../storeApi';

import {
  LT_OE,
  LT_BIS,
  LT_ECB,
  LT_SNB,
  LT_Q,
  LT_AL,
  LT_FMP,
  LT_INTR,
  LT_TW,
  LT_BEA,
  LT_EIA,
  LT_CRC,
  LT_BLS,
  LT_WL,
  LT_UN,
  LT_WT,

  LT_CR,
  LT_BB,
  LT_BF,
  LT_KR,
  LT_KC,
  LT_GT,
  LT_HT,
  LT_KX
} from '../../constants/LoadType';


const _createObject = () => Object.create(null)
, _assign = Object.assign;

const _withApiKey = [
  LT_AL, LT_FMP, LT_INTR, LT_TW,
  LT_BEA, LT_EIA,
  LT_WT
];
const _withProxyServer = [
  LT_OE,
  LT_BIS,
  LT_ECB,
  LT_SNB,
  LT_Q,
  LT_UN,
  LT_BB,
  LT_WT
];
const _withProxyServer2 = [
  ..._withProxyServer,
  LT_CR,
  LT_BF,
  LT_KR,
  LT_KC,
  LT_GT,
  LT_HT,
  LT_KX
];

const _apiTitle = {
  DF: '',
  [LT_AL]: 'Alpha Vantage',
  [LT_BEA]: 'BEA',
  [LT_EIA]: 'EIA',
  [LT_FMP]: 'FMP',
  [LT_INTR]: 'Intrinio',
  [LT_TW]: 'Twelve Data',
  [LT_WT]: 'WTO',

  [LT_CRC]: 'CryptoCompare Information'
};

const _fIsRequired = items => id => items
  .indexOf(id) !== -1;
export const isApiKeyRequired = _fIsRequired(_withApiKey)
export const isProxyRequired = _fIsRequired(_withProxyServer)

export const getApiTitle = loadId => _apiTitle[loadId]
  || _apiTitle.DF

const _API_KEYS = _createObject();

const _fSetKey = (propName) => (value) => {
  _API_KEYS[propName] = value
};

export const getKey = (id) => {
  switch(id){
    case LT_WL:
       return _API_KEYS[LT_Q];
    default:
       return _API_KEYS[id];
  }
}

const PN_LH_CORS_PROXY_SERVER = 'cps'
, PN_IS_ADMIN_MODE = 'isAdm'
, PN_IS_DRAW_DELTA_EXTREMS = 'isDrawDeltaExtrems'
, PN_IS_NOT_ZOOM_TO_MIN_MAX = 'isNotZoomToMinMax'
, PN_IS_AXIS_LABELS_GREY = 'isAlg';

export const CHECKBOX_CONFIGS = [
  ['View in Admin Mode', PN_IS_ADMIN_MODE],
  ['Draw Axis Labels Grey', PN_IS_AXIS_LABELS_GREY],
  ['Draw Deltas to Min-Max', PN_IS_DRAW_DELTA_EXTREMS],
  ['Not Zoom to Min-Max', PN_IS_NOT_ZOOM_TO_MIN_MAX]
];

const _SETTINGS = _assign(_createObject(), {
  [PN_LH_CORS_PROXY_SERVER]: '',
  [PN_IS_ADMIN_MODE]: false,
  [PN_IS_DRAW_DELTA_EXTREMS]: false,
  [PN_IS_NOT_ZOOM_TO_MIN_MAX]: false,
  [PN_IS_AXIS_LABELS_GREY]: false
});

const _isSetting = propName => _SETTINGS[propName];
const _fGetSetOption = (
  propName,
  onSetting
) => (value) => {
  if (isUndef(value)){
    return _isSetting(propName);
  }
  _SETTINGS[propName] = !!value
  if (isFn(onSetting)) {
    onSetting(_SETTINGS[propName])
  }
}

const _setProxy = (url) => {
  if ((''+url).slice(0,16) === 'http://127.0.0.1' || url === '') {
    _SETTINGS[PN_LH_CORS_PROXY_SERVER] = url
    return true;
  }
};

const _isProxyServerValueRequired = _fIsRequired(_withProxyServer2)
export const getProxy = (
  loadId
) => _isProxyServerValueRequired(loadId)
  ? _SETTINGS[PN_LH_CORS_PROXY_SERVER]
  : ''

const _addBoolOptionTo = (
  options,
  propName
) => {
  if (isUndef(options[propName])) {
    options[propName] = _isSetting(propName)
  }
};

export const addSettingTo = (
  options,
  loadId
) => {
  _assign(options, {
    apiKey: getKey(loadId),
    proxy: getProxy(loadId)
  })
  _addBoolOptionTo(options, PN_IS_DRAW_DELTA_EXTREMS)
  _addBoolOptionTo(options, PN_IS_NOT_ZOOM_TO_MIN_MAX)
  _addBoolOptionTo(options, PN_IS_AXIS_LABELS_GREY)
}

const _setAxisLabelColor = isGrey => {
  if (isGrey) {
    setAxisLabelsColor()
  } else {
    setAxisLabelsColor(COLOR_X_LABEL, COLOR_Y_LABEL)
  }
};

export const isAdminMode = _fGetSetOption(PN_IS_ADMIN_MODE)
const _isDrawDeltaExtrems = _fGetSetOption(PN_IS_DRAW_DELTA_EXTREMS)
, _isNotZoomToMinMax = _fGetSetOption(PN_IS_NOT_ZOOM_TO_MIN_MAX)
, _isAxisLabelsGrey = _fGetSetOption(PN_IS_AXIS_LABELS_GREY, _setAxisLabelColor)

export const exportSettingFn = () => ({
  key1: _fSetKey(LT_Q),
  key2: _fSetKey(LT_WT),
  key3: _fSetKey(LT_BEA),
  key4: _fSetKey(LT_BLS),
  key5: _fSetKey(LT_EIA),
  key6: _fSetKey(LT_AL),
  key7: _fSetKey(LT_FMP),
  key8: _fSetKey(LT_INTR),
  key9: _fSetKey(LT_TW),
  setProxy: _setProxy,
  getProxy,
  [PN_IS_ADMIN_MODE]: isAdminMode,
  [PN_IS_DRAW_DELTA_EXTREMS]: _isDrawDeltaExtrems,
  [PN_IS_NOT_ZOOM_TO_MIN_MAX]: _isNotZoomToMinMax,
  [PN_IS_AXIS_LABELS_GREY]: _isAxisLabelsGrey
})
