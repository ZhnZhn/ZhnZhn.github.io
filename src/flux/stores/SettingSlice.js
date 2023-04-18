import {
  LT_Q,
  LT_AL,
  LT_IEX,
  LT_FMP,
  LT_INTR,
  LT_TW,
  LT_BEA,
  LT_EIA,
  LT_FAO,
  LT_BF,
  LT_CRC,
  LT_BLS,
  LT_WL,
  LT_UN
} from '../../constants/LoadType';

const _settings = {};
const _withApiKey = [
  LT_AL, LT_IEX, LT_FMP, LT_INTR, LT_TW,
  LT_BEA, LT_EIA
];
const _withProxy = [
  LT_BF,
  LT_UN
];
const _apiTitle = {
  DF: '',
  [LT_AL]: 'Alpha Vantage',
  [LT_IEX]: 'IEX Cloud',
  [LT_BEA]: 'BEA',
  [LT_EIA]: 'EIA',
  [LT_FMP]: 'FMP',
  [LT_INTR]: 'Intrinio',
  [LT_TW]: 'Twelve Data',

  [LT_CRC]: 'CryptoCompare Information'
};


const _isUndef = value => typeof value === 'undefined';

const SettingSlice = {
  setting: {
    proxy: '',
    isAdminMode: false,
    isDrawDeltaExtrems: false,
    isNotZoomToMinMax: false
  },

  exportSettingFn(){
    return {
      key1: this.fSetKey(LT_Q),
      key2: this.fSetKey(LT_BEA),
      key3: this.fSetKey(LT_BLS),
      key4: this.fSetKey(LT_EIA),
      key5: this.fSetKey(LT_AL),
      key6: this.fSetKey(LT_FMP),
      key7: this.fSetKey(LT_IEX),
      key8: this.fSetKey(LT_INTR),
      key9: this.fSetKey(LT_TW),
      setProxy: this.setProxy.bind(this),
      getProxy: this.getProxy.bind(this, LT_FAO),
      isAdminMode: this.isAdminMode.bind(this),
      isDrawDeltaExtrems: this.isSetting.bind(this, 'isDrawDeltaExtrems'),
      isNotZoomToMinMax: this.isSetting.bind(this, 'isNotZoomToMinMax')
    };
  },

  fSetKey: (propName) => (value) => {
    _settings[propName] = value
  },

  getKey(id){
    switch(id){
      case LT_WL:
         return _settings[LT_Q];
      default:
         return _settings[id];
    }
  },

  setProxy(url){
    if ((''+url).substring(0,16) === 'http://127.0.0.1') {
      this.setting.proxy = url
      return true;
    }
  },

  getProxy(loadId){
    return _withProxy.indexOf(loadId) === -1
       ? ''
       : this.setting.proxy;
  },
  isSetting(propName, value){
    if (_isUndef(value)){
      return this.setting[propName];
    }
    this.setting[propName] = !!value
  },

  isAdminMode(value){
    if (_isUndef(value)){
      return this.setting.isAdminMode;
    }
    this.setting.isAdminMode = !!value
  },

  isApiKeyRequired(loadId){
    return _withApiKey.indexOf(loadId) !== -1;
  },
  isProxyRequired(loadId){
    return _withProxy.indexOf(loadId) !== -1;
  },
  getApiTitle(loadId){
    return _apiTitle[loadId] || _apiTitle.DF;
  }
}

export default SettingSlice
