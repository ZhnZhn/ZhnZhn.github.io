"use strict";

exports.__esModule = true;
exports.crMarkerColor = void 0;
var _strFn = require("../utils/strFn");
const TIME_START_DAY = '09:30:00',
  TIME_CLOSE_DAY = '16:00:00',
  COLOR_START_DAY = "#90ed7d",
  COLOR_CLOSE_DAY = "#f7a35c";
const _crMarkerColor = color => ({
  marker: {
    radius: 3,
    enabled: true,
    fillColor: color
  },
  color
});

//AV IntradayAdapter
const crMarkerColor = strDate => {
  const _color = (0, _strFn.isTokenInStr)(strDate, TIME_START_DAY) ? COLOR_START_DAY : (0, _strFn.isTokenInStr)(strDate, TIME_CLOSE_DAY) ? COLOR_CLOSE_DAY : '';
  return _color ? _crMarkerColor(_color) : void 0;
};
exports.crMarkerColor = crMarkerColor;
//# sourceMappingURL=IntradayFns.js.map