import { crAdapterType1 } from '../crAdapterType1';
import {
  joinBy,
  fCrData
} from './fnAdapter';

const _crData = fCrData('value', 'date')
, crData = ({ data }) => _crData(data);

const trOption = (
  option,
  json
) => {
  const { title } = option
  , { unit } = json;
  option.title = joinBy(', ', title, unit)
}

let _adapter;
const EconomicsAdapter = () => _adapter
  || (_adapter = crAdapterType1({ crData, trOption }))

export default EconomicsAdapter
