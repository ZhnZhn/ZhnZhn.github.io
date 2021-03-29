import COLOR from '../constants/Color';

const C = {
  OPEN : 'open',
  OPEN_INTEREST : 'open interest',
  OPEN_INTEREST_2 : 'o.i.',
  OPEN_INTEREST_3 : 'prev. day open interest',
  HIGH : 'high',
  LOW : 'low',
  VOLUME : 'volume',
  ADJ_CLOSE : 'adj. close',
  ADJ_CLOSE_2 : 'adjusted close',
  PRE_SETTLE : 'pre settle',
  CLOSE : 'close',
  LAST : 'last',
  TURNOVER : 'turnover',
  TRADES : 'trades',
  BALANCE : 'balance',
  IMPORTS : 'imports',
  EXPORTS : 'exports'
};

const _assign = Object.assign
, _crCs = (color, symbol='circle') => ({
  color, symbol
})
, _crCsa = (color, symbol='diamond') => ({
  color, symbol,
  isSecondAxes: true
});

const ChartLegend = {

  crLegendConfig(columnName){
    const _conf = {
       data: [],
       name: columnName
    };

    switch(columnName.toLowerCase()){
      case C.OPEN:
        return _assign(_conf, _crCs(COLOR.S_OPEN));
      case C.OPEN_INTEREST:
      case C.OPEN_INTEREST_2:
      case C.OPEN_INTEREST_3:
        return _assign(_conf, _crCsa(COLOR.S_OPEN_INTEREST, 'circle'));
      case C.HIGH:
        return _assign(_conf, _crCs(COLOR.S_HIGH))
      case C.LOW:
        return _assign(_conf, _crCs(COLOR.S_LOW));
      case C.VOLUME:
        return _assign(_conf, _crCsa(COLOR.S_VOLUME));
      case C.ADJ_CLOSE:
      case C.ADJ_CLOSE_2:
        return _assign(_conf, _crCs(COLOR.S_ADJ_CLOSE, 'diamond'));
      case C.CLOSE:
      case C.LAST:
        return _assign(_conf, _crCs(COLOR.S_CLOSE, 'diamond'));
      case C.PRE_SETTLE:
        return _assign(_conf, _crCs(COLOR.S_PRE_SETTLE, 'diamond'));
      case C.TURNOVER:
        return _assign(_conf, _crCsa(COLOR.S_TURNOVER));
      case C.TRADES:
        return _assign(_conf, _crCsa(COLOR.S_TRADES));
      case C.BALANCE:
        return _assign(_conf, _crCs(COLOR.S_BALANCE));
      case C.IMPORTS:
        return _assign(_conf, _crCs(COLOR.S_IMPORTS));
      case C.EXPORTS:
        return _assign(_conf, _crCs(COLOR.S_EXPORTS));
      default:
       return _assign(_conf, {
         color: void 0, symbol: 'circle', isSecondAxes: false
       });
    }
  }
};

export default ChartLegend
