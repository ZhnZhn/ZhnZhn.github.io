import {
  crMarkerExDividend
} from '../../charts/MarkerFn';
import {
  tooltipExValue
} from '../../charts/Tooltip';
import {
  crScatterSeriaConfig
} from '../../charts/configBuilderFn';

import {
  ymdToUTC,
  toFloatOrEmpty
} from '../AdapterFn';

const CAPTION = 'Dividends'
, COLOR_MARKER = '#4caf50'
, _isArr = Array.isArray
, _assign = Object.assign
, _crPoint = p => _assign(
  crMarkerExDividend(COLOR_MARKER, 0), {
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
    return crScatterSeriaConfig(
      tooltipExValue,
      { data }
    );
  }
};

export default toDividendsImpl
