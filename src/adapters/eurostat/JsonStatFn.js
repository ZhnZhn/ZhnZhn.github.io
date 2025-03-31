import { crData } from '../JsonStatFn';

import { compareByValueId } from '../compareByFn';
import pipe from '../../utils/pipe';
import {
  fetchHmIdCountry,
  getCountryById
} from './fetchHmIdCountry';

const FN_TRUE = () => true;
const _splitForConfig = (
  arr,
  isAddToCategories = FN_TRUE
) => {
   const categories = []
   , data = [];
   let max = Number.NEGATIVE_INFINITY
   , min = Number.POSITIVE_INFINITY;
   arr.forEach((item) => {
     const { id, value, status } = item
     , geoEntity = getCountryById(id);
     if (isAddToCategories(geoEntity)) {
       categories.push(geoEntity);
       data.push({
         y: value,
         c: geoEntity,
         id: geoEntity,
         status
       })
       if (value>=max) { max = value; }
       if (value<=min) { min = value; }
     }
    })
   return {
     categories,
     data,
     min,
     max
   };
}

const _combineToHm = (
  data
) => {
  const hm = {};
  data.forEach((point) => {
    const { value, id } = point;
    if (value != null){
      hm[getCountryById(id)] = value;
    }
  })
  return hm;
};

const _trHmToData = (
  hm,
  categories
) => categories
  .map(id => ({
    y: hm[id] || null,
    c: id
  }));

const _crCategoryPoint = (
  value,
  label,
  status
) => ({
  id: label,
  value,
  status
});

export const trJsonToCategory = (
  json,
  isAddToCategories
) => fetchHmIdCountry()
 .then(() => pipe(
    crData(_crCategoryPoint, json),
    arr => arr.sort(compareByValueId),
    arr => _splitForConfig(arr, isAddToCategories)
 ))

export const trJsonToSeria = (
  json,
  categories
) => pipe(
  _combineToHm(crData(_crCategoryPoint, json)),
  hm => _trHmToData(hm, categories)
)
