import crAdapterType1 from '../crAdapterType1';
import {
  ymdToUTC,
  compareByDate,
  joinBy,
  _isNaN
} from './fnAdapter';

const crData = (
  { data }
) => (data || [])
  .reduce((arr, {value, date}={}) => {
     const _y = parseFloat(value);
     if (!_isNaN(_y)) {
       arr.push([ymdToUTC(date), _y])
     }
     return arr;
  }, [])
  .sort(compareByDate);

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
