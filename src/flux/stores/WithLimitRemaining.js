const CHANNEL = 'WITH_LIMIT_REMAINING'
    , UNKNOWN = 'Unknown';

const WithLimitRemaining = {

  listenWithLimitRemaining(fnHandler){
    this.emitter.addListener(CHANNEL, fnHandler);
    return () => {
      this.emitter.removeListener(CHANNEL, fnHandler);
    }
  },

  triggerWithLimitRemaining(limitRemaining){
    if (limitRemaining == null){
      limitRemaining = UNKNOWN;
    }
    this.emitter.emit(CHANNEL, limitRemaining);
  }
}

export default WithLimitRemaining
