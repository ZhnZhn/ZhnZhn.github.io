import { isTokenInStr } from './AdapterFn';

const TIME_START_DAY = '09:30:00'
, TIME_CLOSE_DAY = '16:00:00'
, COLOR_START_DAY = "#90ed7d"
, COLOR_CLOSE_DAY = "#f7a35c";

const _crMarkerColor = color => ({
  marker: {
    radius: 3,
    enabled: true,
    fillColor: color
  },
  color
});

//AV IntradayAdapter
export const crMarkerColor = (
  strDate
) => {
  const _color = isTokenInStr(strDate, TIME_START_DAY)
    ? COLOR_START_DAY
    : isTokenInStr(strDate, TIME_CLOSE_DAY)
        ? COLOR_CLOSE_DAY
        : '';
  return _color
    ? _crMarkerColor(_color)
    : void 0;
}
