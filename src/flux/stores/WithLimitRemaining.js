const CHANNEL = 'WITH_LIMIT_REMAINING';

const WithLimitRemaining = {

  listenLimitRemaining(fnHandler){
    this.emitter.addListener(CHANNEL, fnHandler);
    return () => {
      this.emitter.removeListener(CHANNEL, fnHandler);
    }
  },

  triggerLimitRemaining(limitRemaining){
    this.emitter.emit(CHANNEL, limitRemaining);
  }
}

export default WithLimitRemaining
