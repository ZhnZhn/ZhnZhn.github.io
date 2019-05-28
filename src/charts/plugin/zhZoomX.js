
const zhZoomX = function({ seriaIndex=0, from, to }){
  try {
    const xAxis = this.xAxis[seriaIndex];
    if (xAxis && from<=to ) {
      xAxis.setExtremes(from, to)
      if (!this.resetZoomButton) {
        this.showResetZoom()
      }
      return true;
    }
    return false;
  } catch(err) {
    console.log(err)
    return false;
  }
};

export default zhZoomX
