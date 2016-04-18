
const SettingSlice = {
  setting: {quandlKey: 'NAMdV9hFyWDgCs7PRusf'},
  setQuandlKey(value){
    this.setting.quandlKey = value;
  },
  getQuandlKey(){
    return this.setting.quandlKey;
  }
}

export default SettingSlice
