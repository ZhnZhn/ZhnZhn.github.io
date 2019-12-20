
import ChartConfig from '../../charts/ChartConfig'
import Tooltip from '../../charts/Tooltip'
import Builder from '../../charts/ConfigBuilder'

import AdapterFn from '../AdapterFn'

const C = {
  CAPTION: 'EPS 4Q',
  COLOR: '#4caf50',
  COLOR_PLUS: '#4caf50',
  COLOR_MINUS: '#f44336'
};

const { ymdToUTC, toFloatOrEmpty } = AdapterFn

const _isArr = Array.isArray;
const _assign = Object.assign;
const _isNumber = n => typeof n === 'number';

const _markerColor = (p) => _isNumber(p.EPSSurpriseDollar)
   && p.EPSSurpriseDollar < 0
      ? C.COLOR_MINUS
      : C.COLOR_PLUS;

const _crPoint = p => _assign(
   ChartConfig.crMarkerExDividend(_markerColor(p), 0), {
   x: ymdToUTC(p.EPSReportDate),
   exValue: toFloatOrEmpty(p.actualEPS),
   ...p
});

const toEarningsImpl = {
  caption: C.CAPTION,
  color: C.COLOR,

  crSubtitle: ({ value }) => {
    return `${value} ${C.CAPTION}`;
  },
  crSeria: (json, option) => {
    const { dfType } = option
    , _jsonData = json && json[dfType]
    , data = _isArr(_jsonData)
       ? _jsonData.map(_crPoint)
       : [];
    return Builder()
      .scatterSeria(Tooltip.eps, { data })
      .toSeria();
  }
};

export default toEarningsImpl
