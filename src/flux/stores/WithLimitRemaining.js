const CHANNEL = 'WITH_LIMIT_REMAINING';

const WithLimitRemaining = {

  listenWithLimitRemaining(fnHandler){
    this.emitter.addListener(CHANNEL, fnHandler);
    return () => {
      this.emitter.removeListener(CHANNEL, fnHandler);
    }
  },

  triggerWithLimitRemaining(limitRemaining){
    this.emitter.emit(CHANNEL, limitRemaining);
  }
}

export default WithLimitRemaining
