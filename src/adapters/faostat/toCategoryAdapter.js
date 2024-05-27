import crAdapterCategory from '../crAdapterCategory';
import { crCategoryPoint } from '../CategoryFn';
import { isNumber } from '../AdapterFn';
import { compareByPnY } from '../compareByFn';

const _crData = (
  json,
  option
) => json.data.reduce((_data, item) => {
    const _value = parseFloat(item.Value);
    if (isNumber(_value) && item.Area) {
      _data.push(crCategoryPoint(
        parseFloat(item.Value),
        item.Area
      ))
    }
    return _data;
 }, [])
 .sort(compareByPnY)
 .reverse();

const toCategoryAdapter = crAdapterCategory(_crData);

export default toCategoryAdapter
