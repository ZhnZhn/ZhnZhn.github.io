
const C = {
  TIME_START_DAY: '09:30:00',
  TIME_CLOSE_DAY: '16:00:00',

  START_DAY: "#90ed7d",
  CLOSE_DAY: "#f7a35c",
};

const _crMarker = color => ({
  radius: 3,
  enabled: true,
  fillColor: color
});

const IntradayFns = {
  crMarkerColor: (strDate) => {
    let marker, color;
    if (strDate.indexOf(C.TIME_START_DAY) !== -1) {
      marker = _crMarker(C.START_DAY)
      color = C.START_DAY
    } else if (strDate.indexOf(C.TIME_CLOSE_DAY) !== -1) {
      marker = _crMarker(C.CLOSE_DAY)
      color = C.CLOSE_DAY
    }
    return { marker, color };
  },

  crDataVm: data => {
    const _max = data.length - 1;
    let i = _max;
    for (i; i>-1; i--){
      if (data[i].color === C.START_DAY) {
        return [data[i], data[_max]];
      }
    }
    return [];
  },

  //AV Intraday
  crDataDaily: (data) => data
    .filter(p => p.color === C.CLOSE_DAY)

};

export default IntradayFns
