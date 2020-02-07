
const WEEK_IN_MLS = 1000*60*60*24*7;
const HOUR_IN_MLS = 1000*60*60;

const zhIs = {
  zhIsAnimation() {
    return ((this.userOptions || {}).zhConfig || {}).withoutAnimation
      ? false
      : true
  },

  zhIsDaily(seriaIndex=0) {
    const _data = this.series?.[0].data ?? []
    , _max = _data.length - 1;
    if (_max < 2) { return false; }
    const _xTo = _data[_max].x
    , _xFrom = _data[_max-1].x
    , _xPeriod = _xTo - _xFrom;
    return _xPeriod < WEEK_IN_MLS
      && _xPeriod > HOUR_IN_MLS;
  }
};

export default zhIs
