
const CHANNEL = 'WITH_LOADING_PROGRESS'

const WithLoadingProgress = {
  listenLoadingProgress(fnHandle){
    this.emitter.addListener(CHANNEL, fnHandle)
    return () => {
      this.emitter.removeListener(fnHandle)
    };
  },
  triggerLoadingProgress(actionType){
    this.emitter.emit(CHANNEL, actionType)
  }
};

export default WithLoadingProgress
