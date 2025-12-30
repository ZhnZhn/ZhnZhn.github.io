import {
  isArr,
  isObj,
  isPositiveNumber,
  getObjectKeys
} from '../../utils/isTypeFn';

import crAdapterCategory from '../crAdapterCategory';
import {
  numberFormat,
  toUpperCaseFirst,
  crShortItemCaption
} from '../AdapterFn';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';

const DOMESTIC_EQUITIES = "domestic_equities";
const FOREIGN_EQUITIES = "foreign_equities";
const FOREIGN_EQUITIES_SHORT_FORM = "For. Eq.";
const NA = "n/a";

const _getByProps = (
  json,
  propName
) => (json || {})[propName] || NA;

const crItemCaption = ({
  itemCaption
}, json) => `${crShortItemCaption(itemCaption)} ${numberFormat(_getByProps(json, "net_assets"), "")}`;

const _crHoldingDescription = (
  item,
  index
) => {
  const _description = _getByProps(item, "description");
  return _description === NA
    ? NA + " " + index
    : _description.slice(0, 20);
}

const crData = (json, option) => {
  const {
    holdings,
    asset_allocation
  } = json || {}
  , data = [];

  if (isArr(holdings)) {
    holdings.forEach((item, index) => {
      if (isObj(item)) {
        const _weight = parseFloat(item.weight);
        if (_weight !== 0) {
          data.push(crCategoryPoint(
            _weight,
            item.symbol === NA
              ? _crHoldingDescription(item, index)
              : item.symbol
          ))
        }
      }
    })
  }

  getObjectKeys(asset_allocation)
    .forEach(key => {
       if (key !== DOMESTIC_EQUITIES) {
         const value = parseFloat(asset_allocation[key]);
         if (isPositiveNumber(value)) {
           data.push(crCategoryPoint(
             value,
             key === FOREIGN_EQUITIES
               ? FOREIGN_EQUITIES_SHORT_FORM
               : toUpperCaseFirst(key)
           ))
         }
       }
    })

  option.subtitle = `${option.itemCaption}, Net Expense Ratio ${_getByProps(json, "net_expense_ratio")}`
  option.title = `Portfolio Turnover ${_getByProps(json, "portfolio_turnover")}, Dividend Yield ${_getByProps(json, "dividend_yield")}`

  return sortDescCategory(data);
}
const EtfProfileAdapter = crAdapterCategory(
  crData,
  crItemCaption
);

export default EtfProfileAdapter
