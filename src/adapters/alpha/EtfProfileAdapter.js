import crAdapterCategory from '../crAdapterCategory';
import {
  isPositiveNumber,
  numberFormat,
  toUpperCaseFirst,
  crShortItemCaption,
  getObjectKeys
} from '../AdapterFn';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';

const DOMESTIC_EQUITIES = "domestic_equities";
const FOREIGN_EQUITIES = "foreign_equities";
const FOREIGN_EQUITIES_SHORT_FORM = "For. Eq.";

const _getByProps = (
  json,
  propName
) => (json || {})[propName] || "n/a";

const crItemCaption = ({
  itemCaption
}, json) => `${crShortItemCaption(itemCaption)} ${numberFormat(_getByProps(json, "net_assets"), "")}`;

const crData = (json, option) => {
  const {
    holdings,
    asset_allocation
  } = json || {}
  , data = (holdings || {}).map(item => crCategoryPoint(
      parseFloat(item.weight),
      item.symbol
  ), []);

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
