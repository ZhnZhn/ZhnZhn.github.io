
const SettingSlice = {
  setting: {    
    isAdminMode: false
  },
  setQuandlKey(value){
    this.setting.quandlKey = value;
  },
  getQuandlKey(){
    return this.setting.quandlKey;
  },
  isAdminMode(value){
    if (typeof value == 'undefined'){
      return this.setting.isAdminMode;
    }
    this.setting.isAdminMode = !!value
  }
}

export default SettingSlice
