import { crItemLink } from '../crFn';
import { DESCR_EMPTY } from './conf';

const _crWebsiteLink = crItemLink
  .bind(null, "Website UN Comtrade Data", "https://comtrade.un.org/data/", "padding-bottom: 8px;")
, _crDescrText = ({
  cmdDescE,
  qtDesc
}) => cmdDescE + ', ' + qtDesc + '.';

const _crDescr = json => {
  const { dataset } = json
  , _firtsItem = dataset[0];
  if (_firtsItem) {
    for (let i=0; i<dataset.length; i++) {
      const _item = dataset[i];
      if (_item.TradeQuantity) {
        return _crDescrText(_item);
      }
    }
    return _firtsItem.cmdDescE
       ? _crDescrText(_firtsItem)
       : DESCR_EMPTY;
  }
  return DESCR_EMPTY;
};

export const toDescr = (
  json,
  option
) => _crDescr(json) + _crWebsiteLink()
