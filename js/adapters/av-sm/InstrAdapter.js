"use strict";

exports.__esModule = true;
exports.default = void 0;
var _regExpFn = require("../../utils/regExpFn");
var _toTableFn = require("../toTableFn");
const _crHeaderItem = (name, pn, options) => ({
    ...(0, _toTableFn.crNameProps)(name, pn),
    ...options
  }),
  HEADERS = (0, _toTableFn.crTableFlatHeaders)([(0, _toTableFn.crRankProps)("Id", "id"), (0, _toTableFn.crNameProps)("Executive", true), (0, _toTableFn.crNameProps)("Title", "executive_title", true), (0, _toTableFn.crNameProps)("Type", "security_type"), _crHeaderItem("A/D", "acquisition_or_disposal", (0, _toTableFn.crStyleBold)()), _crHeaderItem("Shares", "shares", (0, _toTableFn.crNumberProps)(0)), _crHeaderItem("Price", "share_price", {
    isHide: true,
    toN: [2]
  }), (0, _toTableFn.crNameProps)("Date", "transaction_date")]);
const REPLACEMENTS = {
    "Common Stock": "CS",
    "Employee Stock Option": "ESO",
    "Stock Option": "SO",
    "Restricted Stock Unit": "RSU",
    "Performance Stock Units": "PSUs"
  },
  REG_REPLACEMENTS = (0, _regExpFn.crRegExpReplacements)(REPLACEMENTS);
const _setShortNameTo = item => {
  item.security_type = item.security_type.replace(_regExpFn.REG_ONE_OR_MORE_BLANKS, " ").replace(REG_REPLACEMENTS, match => REPLACEMENTS[match]).replace("par value $.01 per share", "$.01 par");
};
const _crRows = (json, option) => {
  const {
      fromDate
    } = option,
    _rows = json.data.filter(item => item.transaction_date >= fromDate).reduce((arr, item, index) => {
      item.id = index + 1;
      _setShortNameTo(item);
      arr.push(item);
      return arr;
    }, []);
  return (0, _toTableFn.crTableRows)(HEADERS, _rows);
};
const InstrAdapter = {
  toConfig(json, option) {
    const config = (0, _toTableFn.crTableConfig)({
      id: option.key,
      title: option.title,
      headers: HEADERS,
      rows: _crRows(json, option),
      dataSource: option.dataSource
    });
    return {
      config
    };
  }
};
var _default = exports.default = InstrAdapter;
//# sourceMappingURL=InstrAdapter.js.map