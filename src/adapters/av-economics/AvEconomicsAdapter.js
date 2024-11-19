import { joinBy } from '../AdapterFn';
import { crAdapterType1 } from '../crAdapterType1';
import { fCrData } from '../av/AvFn';

const _crData = fCrData('value', 'date')
, crData = ({ data }) => _crData(data)
, trOption = (
  option,
  json
) => {
  const { title } = option
  , { unit } = json;
  option.title = joinBy(', ', title, unit)
};

const AvEconomicsAdapter = crAdapterType1({
  crData,
  trOption
});

export default AvEconomicsAdapter
