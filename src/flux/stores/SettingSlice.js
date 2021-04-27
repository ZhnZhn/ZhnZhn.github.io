import { LoadType as LT } from '../../constants/Type';

const _settings = {};
const _withApiKey = [
  LT.AL, LT.IEX, LT.FMP, LT.INTR, LT.TW,
  LT.BEA, LT.EIA
];
const _withProxy = [
  LT.FAO
];
const _apiTitle = {
  DF: '',
  [LT.AL]: 'Alpha Vantage',
  [LT.IEX]: 'IEX Cloud',
  [LT.BEA]: 'BEA',
  [LT.EIA]: 'EIA',
  [LT.FMP]: 'FMP',
  [LT.INTR]: 'Intrinio',
  [LT.TW]: 'Twelve Data',

  [LT.FAO]: 'FAOSTAT',
  [LT.CRC]: 'CryptoCompare Information'
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
      key1: this.fSetKey([LT.AL]),
      key2: this.fSetKey([LT.TW]),
      key3: this.fSetKey([LT.BEA]),
      key4: this.fSetKey([LT.EIA]),
      key5: this.fSetKey([LT.FMP]),
      key6: this.fSetKey([LT.IEX]),
      key7: this.fSetKey([LT.INTR]),
      key8: this.fSetKey([LT.Q]),
      setProxy: this.setSetting('proxy').bind(this),
      getProxy: this.getProxy.bind(this, LT.FAO),
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
      case LT.WL: case LT.Q_T:
         return _settings[LT.Q];
      default:
         return _settings[id];
    }
  },

  setSetting: (propName) => function (value) {
    this.setting[propName] = value
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
