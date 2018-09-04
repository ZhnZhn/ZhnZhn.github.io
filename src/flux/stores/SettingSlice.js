import { LoadType as LT } from '../../constants/Type'

const _settings = {};
const _withApiKey = [
  LT.B, LT.AL, LT.AL_S, LT.AL_I,
  LT.BEA, LT.EIA, LT.INTR
];
const _withProxy = [
  LT.FS,
  LT.FAO,
  LT.BLS,
  LT.CRC
];
const _apiTitle = {
  DF: 'API',
  [LT.B]: 'Barchart Market Data',
  [LT.AL]: 'Alpha Vantage',
  [LT.AL_S]: 'Alpha Vantage',
  [LT.AL_I]: 'Alpha Vantage',
  [LT.BEA]: 'BEA',
  [LT.EIA]: 'EIA',
  [LT.INTR]: 'Intrinio'
};


const SettingSlice = {
  setting: {
    proxy: 'https://cors-anywhere.herokuapp.com/',
    isAdminMode: false,
    isDrawDeltaExtrems: false,
    isNotZoomToMinMax: false
  },

  exportSettingFn(){
    return {
      key1: this.fSetKey([LT.AL]),
      key2: this.fSetKey([LT.B]),
      key3: this.fSetKey([LT.BEA]),
      key4: this.fSetKey([LT.INTR]),
      key5: this.fSetKey([LT.Q]),
      key6: this.fSetKey([LT.EIA]),
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
      case LT.AL_I: case LT.AL_S:
         return _settings[LT.AL];
      case LT.EIA:
         return _settings[LT.EIA];
      case LT.WL:
         return _settings[LT.Q];
      default:
         return _settings[id];
    }
  },

  setSetting: (propName) => function (value) {
    this.setting[propName] = value
  },

  getProxy(loadId){
    if (_withProxy.indexOf(loadId) === -1) {
      return '';
    }
    return this.setting.proxy;
  },
  isSetting(propName, value){
    if (typeof value === 'undefined'){
      return this.setting[propName];
    }
    this.setting[propName] = !!value
  },

  isAdminMode(value){
    if (typeof value === 'undefined'){
      return this.setting.isAdminMode;
    }
    this.setting.isAdminMode = !!value
  },

  isApiKeyRequired(loadId){
    return _withApiKey.indexOf(loadId) !== -1
      ? true
      : false;
  },
  getApiTitle(loadId){
    return _apiTitle[loadId] || _apiTitle.DF;
  }
}

export default SettingSlice
