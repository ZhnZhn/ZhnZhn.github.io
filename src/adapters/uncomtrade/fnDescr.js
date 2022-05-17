import { crItemLink } from '../crFn';
import C from './conf';

const _isArr = Array.isArray
, _crWebsiteLink = crItemLink.bind(null, "Website UN Comtrade Data", "https://comtrade.un.org/data/", "padding-bottom: 8px;")
, _crDatasetLink = crItemLink.bind(null, "UN Comtrade Dataset Link")

, _crDescrText = ({ cmdDescE, qtDesc }) => cmdDescE + ', ' + qtDesc + '.';

const _crDescr = json => {
  const { dataset } = json
  , _firtsItem = dataset[0];
  if (_isArr(dataset) && _firtsItem){
    let i=0, max=dataset.length;
    for (; i<max; i++) {
      const _item = dataset[i];
      if (_item.TradeQuantity) {
        return _crDescrText(_item);
      }
    }
    return _firtsItem.cmdDescE
       ? _crDescrText(_firtsItem)
       : C.DESCR_EMPTY;
  }
  return C.DESCR_EMPTY;
};

export const toDescr = (
  json,
  option
) => _crDescr(json)
  + _crWebsiteLink()
  + _crDatasetLink(option.nativeHref)
