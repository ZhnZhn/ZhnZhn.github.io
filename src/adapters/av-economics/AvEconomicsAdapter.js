import { hasOwnProperty } from '../../utils/isTypeFn';
import { joinByComma } from '../../utils/arrFn';
import { crAdapterType1 } from '../crAdapterType1';
import { fCrData } from '../av/AvFn';

const PN_VALUE = 'value'
, PN_PRICE = 'price'
, PN_DATE = 'date'
, _crDataByValue = fCrData(PN_VALUE, PN_DATE)
, _crDataByPrice = fCrData(PN_PRICE, PN_DATE)
, crData = ({ data }) => {
  const item = data[0]
  , _crData = hasOwnProperty(item, PN_VALUE)
    ? _crDataByValue
    : hasOwnProperty(item, PN_PRICE)
    ? _crDataByPrice
    : void 0;
  return _crData
    ? _crData(data)
    : [];
}
, trOption = (
  option,
  json
) => {
  const { title } = option
  , { unit } = json;
  option.title = joinByComma(title, unit)
};

const AvEconomicsAdapter = crAdapterType1({
  crData,
  trOption
});

export default AvEconomicsAdapter
