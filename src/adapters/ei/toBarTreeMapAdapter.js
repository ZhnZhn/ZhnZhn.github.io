import crAdapterCategory from '../crAdapterCategory';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';
import { crItemColor } from '../fToTreeMapAdapter';

const crData = (json, option) => {
  return sortDescCategory(
    json.data.map(item => {
      const point = crCategoryPoint(
         item[1],
         item[0]
      );
      point.color = crItemColor(item[0])
      return point;
    }))
};

const toBarTreeMapAdapter = crAdapterCategory(
  crData
);

export default toBarTreeMapAdapter
