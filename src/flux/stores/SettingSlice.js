import { LoadType as LT } from '../../constants/Type'

const _settings = {};
const _withProxy = [
  LT.FS, LT.FAO,
  LT.NST, LT.NST_2,
  LT.SWS, LT.BLS,
  LT.CRC
];

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
      setProxy: this.setSetting('proxy').bind(this),
      getProxy: this.getProxy.bind(this),
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
      return undefined;
    }
    return this.setting.proxy;
  },
  isSetting(propName, value){
    if (typeof value == 'undefined'){
      return this.setting[propName];
    }
    this.setting[propName] = !!value
  },

  isAdminMode(value){
    if (typeof value == 'undefined'){
      return this.setting.isAdminMode;
    }
    this.setting.isAdminMode = !!value
  }
}

export default SettingSlice
