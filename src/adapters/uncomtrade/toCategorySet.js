import crAdapterCategory from '../crAdapterCategory';
import { crCategoryPoint } from '../CategoryFn'
import { sortDescCategory } from '../compareByFn';

import {
  isNumber,
  getHmTradePartners
} from './fnAdapter';

const _round = Math.round;

const crCategoryData = (
  json,
  option
) => {
  const hm = getHmTradePartners(option.tradePartners)
  , pnValue = option.measure;
  option._itemKey = option.key
  let value;
  return sortDescCategory(json.data.reduce((arr, item) => {
    value = _round(parseFloat(item[pnValue]));
    const { reporterCode } = item || {};
    if (value && isNumber(reporterCode)) {
      arr.push(crCategoryPoint(
        value,
        hm[reporterCode] || reporterCode
      ))
    }
    return arr;
  }, []));
};

const _crItemCaption = ({
  subtitle
}) => (subtitle || '').split("-")[0] || 'id';

const toCategorySet = crAdapterCategory(
  crCategoryData,
  void 0,
  _crItemCaption
);

export default toCategorySet
