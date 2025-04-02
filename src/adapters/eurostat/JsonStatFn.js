import { fetchJsonHm } from '../../utils/fnFetch';
import { fGetLazyValueAsync } from '../../utils/fGetLazyValue';
import pipe from '../../utils/pipe';

import { crData } from '../JsonStatFn';
import { compareByValueId } from '../compareByFn';

const FN_TRUE = () => true
, URL_ID_COUNTRY = './data/eurostat/id-country.json'
, _crHmIdCountry = () => fetchJsonHm(URL_ID_COUNTRY)
, _getAsyncHmIdCountry = fGetLazyValueAsync(_crHmIdCountry)
, _getCountryById = id => (_getAsyncHmIdCountry(true) || {})[id] || id;

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
     , geoEntity = _getCountryById(id);
     if (isAddToCategories(geoEntity)) {
       categories.push(geoEntity);
       data.push({
         y: value,
         c: geoEntity,
         id: geoEntity,
         status
       })
       if (value > max) { max = value; }
       if (value < min) { min = value; }
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
      hm[_getCountryById(id)] = value;
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
) => _getAsyncHmIdCountry()
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
