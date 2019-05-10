
const zhZoomX = function({ seriaIndex=0, from, to }){
  try {
    const xAxis = this.xAxis[seriaIndex];
    if (xAxis) {
      xAxis.setExtremes(from, to)
      if (!this.resetZoomButton) {
        this.showResetZoom()
      }
    }
  } catch(err) {
    console.log(err)
  }
};

export default zhZoomX
