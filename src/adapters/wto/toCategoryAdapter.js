import { isNumber, isStr } from '../AdapterFn';
import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';
import crAdapterCategory from '../crAdapterCategory';

const _isStrInclude = (
  str,
  token
) => str.indexOf(token) !== -1;

//Unicode character patch
const _crReportingEconomy = (
  reportingEconomy
) => _isStrInclude(reportingEconomy, "rkiye")
  ? "Türkiye"
  : _isStrInclude(reportingEconomy, "Ivoire")
  ? "Côte d'Ivoire"
  : _isStrInclude(reportingEconomy, "Principe")
  ? "Sao Tomé and Principe"
  : reportingEconomy;

const _crData = (
  json,
  option
) => sortDescCategory(json.Dataset.reduce((data, item) => {
  const {
    Value,
    ReportingEconomy
  } = item || {};
  if (isNumber(Value) && isStr(ReportingEconomy)) {
    data.push(crCategoryPoint(
      item.Value,
      _crReportingEconomy(item.ReportingEconomy)
    ))
  }
  return data;
}, []))
, toCategoryAdapter = crAdapterCategory(_crData);

export default toCategoryAdapter
