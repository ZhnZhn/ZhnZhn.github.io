import fn from './tpFn'

const {
  crHeader, crRow, crSpan,
  toDateFormatDMYT
 } = fn

const _crVolume = function({ date, id, value, point }){
  const { _open='NoData', _close='', _low='', _high='' } = point;
  return `${crHeader(date, id)}
  <div class="tp__body">
    ${crRow('Volume', value)}
    <div>
      ${crSpan('Open', _open)}
      ${crSpan('Close', _close)}
    </div>
    <div>
      ${crSpan('Low', _low)}
      ${crSpan('High', _high)}
    </div>
  </div>`;
};

const _crAtn = function({date, id, value, point}){
  const { color, y, close, open } = point
   return `${crHeader(date, id)}
    <div class="tp__body">
      ${crRow('ATH', y+'%', { color })}
      ${crRow('Prev Close', close)}
      ${crRow('Next Open', open)}
    </div>`;
};

const _crHl = function({date, id, value, point}){
  const { open, dayHigh, dayLow, close } = point;
  return `${crHeader(date, id)}
  <div class="tp__body">
    ${crRow('Open', open)}
    ${crRow('High', dayHigh)}
    ${crRow('Low', dayLow)}
    ${crRow('Close', close)}
  </div>`;
}

const tpStock = {
  volume: {
    fnTemplate: _crVolume,
    isWithValue: true
  },
  volumeDmyt: {
    fnTemplate: _crVolume,
    fnDateFormat: toDateFormatDMYT,
    isWithValue: true
  },
  ath: {
    fnTemplate: _crAtn
  },
  hl: {
    fnTemplate: _crHl
  }
};

export default tpStock
