
const DialogSlice = {
  getDialogConf(conf, chartType){
    //DialogStatN
    if (conf && conf.dialogConf) {
      return conf;
    }
    const _browserId = chartType.split('_')[0];
    return this.getSourceConfig(_browserId, chartType);
  }
}

export default DialogSlice
