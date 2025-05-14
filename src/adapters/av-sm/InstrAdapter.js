import {
  REG_ONE_OR_MORE_BLANKS,
  crRegExpReplacements
} from '../../utils/regExpFn';

import {
  crRankProps,
  crStyleBold,
  crNameProps,
  crNumberProps,
  crTableFlatHeaders,
  crTableRows,
  crTableConfig
} from "../toTableFn";

const _crHeaderItem = (
  name,
  pn,
  options
) => ({
  ...crNameProps(name, pn),
  ...options
})
, HEADERS = crTableFlatHeaders([
  crRankProps("Id", "id"),
  crNameProps("Executive", true),
  crNameProps("Title", "executive_title", true),
  crNameProps("Type", "security_type"),
  _crHeaderItem("A/D", "acquisition_or_disposal", crStyleBold()),
  _crHeaderItem("Shares", "shares", crNumberProps(0)),
  _crHeaderItem("Price", "share_price", { isHide: true, toN: [2] }),
  crNameProps("Date","transaction_date")
]);

const REPLACEMENTS = {
  "Common Stock": "CS",
  "Employee Stock Option": "ESO",
  "Stock Option": "SO",
  "Restricted Stock Unit": "RSU",
  "Performance Stock Units": "PSUs"
}
, REG_REPLACEMENTS = crRegExpReplacements(REPLACEMENTS)

const _setShortNameTo = item => {
  item.security_type = item.security_type
   .replace(REG_ONE_OR_MORE_BLANKS, " ")
   .replace(REG_REPLACEMENTS, match => REPLACEMENTS[match])
   .replace("par value $.01 per share", "$.01 par")
};

const _crRows = (
  json,
  option
) => {
  const { fromDate } = option
  , _rows = json.data
    .filter(item => item.transaction_date >= fromDate)
    .reduce((arr, item, index) => {
      item.id = index + 1
      _setShortNameTo(item)
      arr.push(item)
      return arr;
    }, []);

  return crTableRows(HEADERS, _rows);
}

const InstrAdapter = {
  toConfig(json, option){
    const config = crTableConfig({
      id: option.key,
      title: option.title,
      headers: HEADERS,
      rows: _crRows(json, option),
      dataSource: option.dataSource
    });
    return { config };
  }
};

export default InstrAdapter
