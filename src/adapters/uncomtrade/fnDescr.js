
import C from './conf'

const fnDescr = {

  toDescr: (json) => {
    const { dataset } = json
        , _firtsItem = dataset[0];
    if (Array.isArray(dataset) && _firtsItem){
      let i=0, max=dataset.length;
      for (; i<max; i++) {
        const { cmdDescE, qtDesc, TradeQuantity } = dataset[i];
        if (TradeQuantity) {
          return cmdDescE + ' ' + qtDesc + '.';
        }
      }
      return _firtsItem.cmdDescE
         ? _firtsItem.cmdDescE + ' ' + _firtsItem.qtDesc + '.'
         : C.DESCR_EMPTY;
    } else {
      return C.DESCR_EMPTY;
    }
  }

}

export default fnDescr
