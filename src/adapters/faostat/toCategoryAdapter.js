import crAdapterCategory from '../crAdapterCategory';
import { crCategoryPoint } from '../CategoryFn';
import {
  isNumber,
  isStr,
  joinBy
} from '../AdapterFn';
import { compareByPnY } from '../compareByFn';

const _crData = (
  json,
  option
) => json.data.reduce((_data, item) => {
    const _value = parseFloat(item.Value);
    if (isNumber(_value) && _value !== 0 && item.Area) {
      _data.push(crCategoryPoint(
        _value,
        item.Area
      ))
    }
    return _data;
 }, [])
 .sort(compareByPnY)
 .reverse();

 const _crTitle = (
   title,
   json
 ) => {
   const _unit = json.data[0].Unit;
   return joinBy(', ',
     title,
     isStr(_unit) ? _unit.toUpperCase() : ''
   );
};

const toCategoryAdapter = crAdapterCategory(
  _crData,
  _crTitle
);

export default toCategoryAdapter
