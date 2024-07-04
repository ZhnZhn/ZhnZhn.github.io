import crAdapterCategory from '../crAdapterCategory';
import { crCategoryPoint } from '../CategoryFn'
import { sortDescByPnY } from '../compareByFn';

import {
  isNumber,
  getHmTradePartners
} from './fnAdapter';

const crCategoryData = (
  json,
  option
) => {
  const data = (json || {}).data || []
  , hm = getHmTradePartners(option.tradePartners)
  , pnValue = option.measure;
  option._itemKey = option.key
  let value;
  return sortDescByPnY(data.reduce((arr, item) => {
    value = parseFloat(item[pnValue])
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
