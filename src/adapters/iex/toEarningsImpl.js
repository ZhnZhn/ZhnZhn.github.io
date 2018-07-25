
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

const _markerColor = (p) => {
  return typeof p.EPSSurpriseDollar === 'number'
    && p.EPSSurpriseDollar < 0
      ? C.COLOR_MINUS
      : C.COLOR_PLUS;
};

const toEarningsImpl = {
  caption: C.CAPTION,
  color: C.COLOR,

  crSubtitle: ({ value }) => {
    return `${value} ${C.CAPTION}`;
  },
  crSeria: (json, option) => {
    const { dfType } = option
        , data = [];

    if (json && Array.isArray(json[dfType])) {
      json[dfType].forEach(p => {
        data.push(
          Object.assign(
             ChartConfig.fMarkerExDividend(_markerColor(p), 0), {
             x: AdapterFn.ymdToUTC(p.EPSReportDate),
             exValue: p.actualEPS,
             ...p
          }))
      })
    }
    return Builder()
      .scatterSeria(Tooltip.eps, { data })
      .toSeria();
  }
};

export default toEarningsImpl
