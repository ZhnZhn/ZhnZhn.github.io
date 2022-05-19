import ChartConfig from '../../charts/ChartConfig';
import {
  tooltipExValue
} from '../../charts/Tooltip';
import Builder from '../../charts/ConfigBuilder';
import {
  ymdToUTC,
  toFloatOrEmpty
} from '../AdapterFn';

const CAPTION = 'Dividends'
, COLOR_MARKER = '#4caf50'
, _isArr = Array.isArray
, _assign = Object.assign
, _crPoint = p => _assign(
  ChartConfig.crMarkerExDividend(COLOR_MARKER, 0), {
    x: ymdToUTC(p.paymentDate),
    exValue: toFloatOrEmpty(p.amount)
});

const toDividendsImpl = {
  caption: CAPTION,
  color: COLOR_MARKER,

  crSubtitle: ({
    value,
    dfPeriod
  }) => `${value} Dividends ${dfPeriod}`,

  crSeria: (json, option) => {
    const data = _isArr(json)
      ? json.reverse().map(_crPoint)
      : [];
    return Builder()
      .scatterSeria(tooltipExValue, { data })
      .toSeria();
  }
};

export default toDividendsImpl
