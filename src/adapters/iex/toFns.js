export {
  isTypeNumber,
  getValue
} from '../AdapterFn';

import { isTypeNumber } from '../AdapterFn';
import IT from './ItemTypes';

const _LOCALE = (navigator || {}).language;
const _assign = Object.assign;

const _calcScatterY = (
  chart,
  isMin
) => {
  const {
    max,
    min
  } = chart.yAxis[0]
  , all = max - min
  , one = all/100;
  return isMin
    ? (min + one)
    : (max - 7*one);
};


export const toStr = n => isTypeNumber(n)
  ? n.toLocaleString(_LOCALE)
  : ''

export const toPerc = n => isTypeNumber(n)
  ? n.toLocaleString(_LOCALE, { style: 'percent', minimumFractionDigits: 2})
  : ''

export const crZhConfig = ({
  key,
  value,
  dataSource
}) => ({
    key,
    id: key,
    itemCaption: value || key,
    dataSource
})

export const crToSeria = ({
  chart,
  seria,
  caption,
  color,
  option
}) => {
   const { dfType } = option
   , y = (dfType === IT.ERN)
      ? _calcScatterY(chart)
      : _calcScatterY(chart, true);
   seria.data.forEach(p => p.y = y)
   _assign(seria, {
     name: caption,
     itemCaption: caption,
     zhColor: color
   })
   return seria;
}
