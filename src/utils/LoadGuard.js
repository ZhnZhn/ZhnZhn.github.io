class LoadGuard {
  constructor(mls=5000) {
    this.mls = mls
    this.isLoading = false
    //loadingUrl
    //timeoutId
  }

  start(url) {
    if (this.isLoading) {
      return false;
    }
    this.loadingUrl = url
    this.isLoading = true;
    this.timeoutId = setTimeout(() => {
      if (url === this.loadingUrl) {
        this.isLoading = false
      }
    }, this.mls);
    return true;
  }

  stop() {
    this.isLoading = false;
    clearTimeout(this.timeoutId)
  }
}

export default LoadGuard
