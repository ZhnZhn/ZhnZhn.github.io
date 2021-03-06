import AdapterFn from '../AdapterFn'

import IT from './ItemTypes'

const { getValue } = AdapterFn

const _LOCALE = (navigator || {}).language;
const _isNumber = n => typeof n === 'number';
const _assign = Object.assign;

const _calcScatterY = (chart, isMin) => {
  const { max, min } = chart.yAxis[0]
      , all = max - min
      , one = all/100;
  return isMin
    ? (min + one)
    : (max - 7*one);
};

const toFns = {
  getValue,
  
  toStr: n => _isNumber(n)
    ? n.toLocaleString(_LOCALE)
    : '',
  toPerc: n => _isNumber(n)
     ? n.toLocaleString(_LOCALE, { style: 'percent', minimumFractionDigits: 2})
     : '',

  crZhConfig: ({ key, value, dataSource }) => ({
    key, id: key,
    itemCaption: value || key,
    dataSource
  }),

  crToSeria: ({ chart, seria, caption, color, option }) => {
    const { dfType } = option;
    const y = (dfType === IT.ERN)
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
};

export default toFns
