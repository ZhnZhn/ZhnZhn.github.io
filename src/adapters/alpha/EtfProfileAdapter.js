import crAdapterCategory from '../crAdapterCategory';
import {
  numberFormat,
  crShortItemCaption
} from '../AdapterFn';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';

const _getByProps = (
  json,
  propName
) => (json|| {})[propName] || "n/a";

const crItemCaption = ({
  itemCaption
}, json) => `${crShortItemCaption(itemCaption)} ${numberFormat(_getByProps(json, "net_assets"), "")}`;

const crData = (json, option) => {
  const { holdings } = json || {}
  , data = sortDescCategory(holdings.map(item => {
    return crCategoryPoint(
      parseFloat(item.weight),
      item.symbol
    );
  }, []));

  option.subtitle = `${option.itemCaption}, Net Expense Ratio ${_getByProps(json, "net_expense_ratio")}`
  option.title = `Portfolio Turnover ${_getByProps(json, "portfolio_turnover")}, Dividend Yield ${_getByProps(json, "dividend_yield")}`

  return data;
}
const EtfProfileAdapter = crAdapterCategory(
  crData,
  crItemCaption
);

export default EtfProfileAdapter
