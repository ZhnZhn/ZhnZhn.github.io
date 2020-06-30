
const _isNumber = n => typeof n === 'number'
 && (n-n === 0);

const zhZoomX = function({ seriaIndex=0, from, to }){
  try {
    if (!_isNumber(from) || !_isNumber(to)){
      return false;
    }
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
