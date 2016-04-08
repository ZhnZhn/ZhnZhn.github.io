
const SettingSlice = {
  setting: {},
  setQuandlKey(value){
    this.setting.quandlKey = value;
  },
  getQuandlKey(){
    return this.setting.quandlKey;
  }  
}

export default SettingSlice
