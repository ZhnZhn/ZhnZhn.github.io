import ChartConfig from '../../charts/ChartConfig'
import Tooltip from '../../charts/Tooltip'
import Builder from '../../charts/ConfigBuilder'

import AdapterFn from '../AdapterFn'

const C = {
  CAPTION: 'Dividends',
  COLOR: '#4caf50'
};

const toDividendsImpl = {
  caption: C.CAPTION,
  color: C.COLOR,

  crSubtitle: ({ value, dfPeriod }) => {
    return `${value} Dividends ${dfPeriod}`;
  },

  crSeria: (json, option) => {
    const data = [];
    if (Array.isArray(json)) {
      json.reverse()
        .forEach(p => {
          data.push(Object.assign(
            ChartConfig.fMarkerExDividend(C.COLOR, 0), {
            x: AdapterFn.ymdToUTC(p.paymentDate),
            exValue: p.amount
          }))
        });
    }
    return Builder()
      .scatterSeria(Tooltip.exValue, { data })
      .toSeria();
  }
};

export default toDividendsImpl
