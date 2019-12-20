import ChartConfig from '../../charts/ChartConfig'
import Tooltip from '../../charts/Tooltip'
import Builder from '../../charts/ConfigBuilder'

import AdapterFn from '../AdapterFn'

const C = {
  CAPTION: 'Dividends',
  COLOR: '#4caf50'
};

const { ymdToUTC, toFloatOrEmpty } = AdapterFn

const _isArr = Array.isArray
, _assign = Object.assign;

const _crPoint = p => _assign(
  ChartConfig.crMarkerExDividend(C.COLOR, 0), {
  x: ymdToUTC(p.paymentDate),
  exValue: toFloatOrEmpty(p.amount)
});

const toDividendsImpl = {
  caption: C.CAPTION,
  color: C.COLOR,

  crSubtitle: ({ value, dfPeriod }) => {
    return `${value} Dividends ${dfPeriod}`;
  },

  crSeria: (json, option) => {
    const data = _isArr(json)
      ? json.reverse().map(_crPoint)
      : [];
    return Builder()
      .scatterSeria(Tooltip.exValue, { data })
      .toSeria();
  }
};

export default toDividendsImpl
