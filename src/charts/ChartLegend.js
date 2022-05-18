import COLOR from '../constants/Color';

const OPEN = 'open'
, OPEN_INTEREST = 'open interest'
, OPEN_INTEREST_2 = 'o.i.'
, OPEN_INTEREST_3 = 'prev. day open interest'
, HIGH = 'high'
, LOW = 'low'
, VOLUME = 'volume'
, ADJ_CLOSE = 'adj. close'
, ADJ_CLOSE_2 = 'adjusted close'
, PRE_SETTLE = 'pre settle'
, CLOSE = 'close'
, LAST = 'last'
, TURNOVER = 'turnover'
, TRADES = 'trades'
, BALANCE = 'balance'
, IMPORTS = 'imports'
, EXPORTS = 'exports';

const _assign = Object.assign
, _crCs = (
  color,
  symbol='circle'
) => ({
  color,
  symbol
})
, _crCsa = (
  color,
  symbol='diamond'
) => ({
  color,
  symbol,
  isSecondAxes: true
});


export const crLegendConfig = (
  columnName
) => {
  const _conf = {
     data: [],
     name: columnName
  };

  switch(columnName.toLowerCase()){
    case OPEN:
      return _assign(_conf, _crCs(COLOR.S_OPEN));
    case OPEN_INTEREST:
    case OPEN_INTEREST_2:
    case OPEN_INTEREST_3:
      return _assign(_conf, _crCsa(COLOR.S_OPEN_INTEREST, 'circle'));
    case HIGH:
      return _assign(_conf, _crCs(COLOR.S_HIGH))
    case LOW:
      return _assign(_conf, _crCs(COLOR.S_LOW));
    case VOLUME:
      return _assign(_conf, _crCsa(COLOR.S_VOLUME));
    case ADJ_CLOSE:
    case ADJ_CLOSE_2:
      return _assign(_conf, _crCs(COLOR.S_ADJ_CLOSE, 'diamond'));
    case CLOSE:
    case LAST:
      return _assign(_conf, _crCs(COLOR.S_CLOSE, 'diamond'));
    case PRE_SETTLE:
      return _assign(_conf, _crCs(COLOR.S_PRE_SETTLE, 'diamond'));
    case TURNOVER:
      return _assign(_conf, _crCsa(COLOR.S_TURNOVER));
    case TRADES:
      return _assign(_conf, _crCsa(COLOR.S_TRADES));
    case BALANCE:
      return _assign(_conf, _crCs(COLOR.S_BALANCE));
    case IMPORTS:
      return _assign(_conf, _crCs(COLOR.S_IMPORTS));
    case EXPORTS:
      return _assign(_conf, _crCs(COLOR.S_EXPORTS));
    default:
     return _assign(_conf, {
       color: void 0,
       symbol: 'circle',
       isSecondAxes: false
     });
  }
}
