
const SettingSlice = {
  setting: {
    quandlKey: undefined,
    barchartKey: undefined,
    alphaKey: undefined,
    isAdminMode: false,
    isDrawDeltaExtrems: false,
    isNotZoomToMinMax: false
  },

  exportSettingFn(){
    return {
      setQuandlKey: this.setSetting('quandlKey').bind(this),
      setAlphaKey: this.setSetting('alphaKey').bind(this),
      setBarcharKey: this.setSetting('barchartKey').bind(this),
      isAdminMode: this.isAdminMode.bind(this),
      isDrawDeltaExtrems: this.isSetting.bind(this, 'isDrawDeltaExtrems'),
      isNotZoomToMinMax: this.isSetting.bind(this, 'isNotZoomToMinMax')
    };
  },

  setSetting: (propName) => function (value) {
    this.setting[propName] = value
  },
  getQuandlKey(){
    return this.setting.quandlKey;
  },
  getBarchartKey(){
    return this.setting.barchartKey;
  },
  getAlphaKey(){
    return this.setting.alphaKey;
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
