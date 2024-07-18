import crAdapterCategory from '../crAdapterCategory';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';
import { crItemColor } from '../fToTreeMapAdapter';

const crData = (json, option) => {
  return sortDescCategory(
    json.data.map(item => {
      const point = crCategoryPoint(
         item.value,
         item.label
      );
      point.color = crItemColor(item.label)
      return point;
    }))
};

const toBarTreeMapAdapter = crAdapterCategory(
  crData
);

export default toBarTreeMapAdapter
