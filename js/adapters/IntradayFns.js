"use strict";

exports.__esModule = true;
exports.crMarkerColor = exports.crDataDaily = void 0;
const TIME_START_DAY = '09:30:00',
      TIME_CLOSE_DAY = '16:00:00',
      COLOR_START_DAY = "#90ed7d",
      COLOR_CLOSE_DAY = "#f7a35c";

const _isTokenInStr = (str, token) => str.indexOf(token) !== -1;

const _crMarkerColor = color => ({
  marker: {
    radius: 3,
    enabled: true,
    fillColor: color
  },
  color
}); //AV IntradayAdapter


const crMarkerColor = strDate => _isTokenInStr(strDate, TIME_START_DAY) ? _crMarkerColor(COLOR_START_DAY) : _isTokenInStr(strDate, TIME_CLOSE_DAY) ? _crMarkerColor(COLOR_CLOSE_DAY) : {}; //AV IntradayAdapter


exports.crMarkerColor = crMarkerColor;

const crDataDaily = data => data.filter(p => p.color === COLOR_CLOSE_DAY);

exports.crDataDaily = crDataDaily;
//# sourceMappingURL=IntradayFns.js.map