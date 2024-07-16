import crAdapterCategory from '../crAdapterCategory';
import { crCategoryPoint } from '../CategoryFn'
import { sortDescCategory } from '../compareByFn';

const _isState = stateid => stateid
  && stateid.length === 2
  && stateid !== "US";
const crCategoryData = (
  json,
  option
) => {
  const data = json.response.data;
  return sortDescCategory(data.reduce((arr, item) => {
    const {
      stateid,
      stateDescription
    } = item || {};
    if (_isState(stateid) && stateDescription) {
      arr.push(crCategoryPoint(
        parseFloat(item.price),
        `${stateDescription} (${stateid})`
      ))
    }
    return arr;
  }, []))
}

const toCategoryAdapter = crAdapterCategory(
  crCategoryData
)

export default toCategoryAdapter
