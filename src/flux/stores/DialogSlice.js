
const DialogSlice = {
  getDialogConf(conf, dialogType){
    if (conf && conf.dialogConf) {
      return conf;
    }
    const _browserId = dialogType.split('_')[0];        
    return this.getSourceConfig(_browserId, dialogType);
  }
}

export default DialogSlice
