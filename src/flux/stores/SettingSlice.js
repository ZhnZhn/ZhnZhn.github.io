
const SettingSlice = {
  setting: {
    quandlKey: undefined,
    isAdminMode: false,
    isDrawDeltaExtrems: false,
    isNotZoomToMinMax: false
  },

  exportSettingFn(){
    return {
      setQuandlKey: this.setQuandlKey.bind(this),
      isAdminMode: this.isAdminMode.bind(this),
      isDrawDeltaExtrems: this.isSetting.bind(this, 'isDrawDeltaExtrems'),
      isNotZoomToMinMax: this.isSetting.bind(this, 'isNotZoomToMinMax')
    };
  },

  setQuandlKey(value){
    this.setting.quandlKey = value;
  },
  getQuandlKey(){
    return this.setting.quandlKey;
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
