"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_V3 = "https://data.nasdaq.com/api/v3",
  TABLE_URL = `${API_V3}/datatables`,
  LIMIT_REMAINING = "X-RateLimit-Remaining";
const _crQueryToken = (name, value) => value ? `${name}=${value}` : "",
  _getCrTableQuery = (0, _AdapterFn.crGetRoute)({
    jo: _ref => {
      let {
        items
      } = _ref;
      return `energy=OIL&country=${(0, _AdapterFn.getValue)(items[0])}&code=${(0, _AdapterFn.getValue)(items[1])}${(0, _AdapterFn.getValue)(items[2])}${(0, _AdapterFn.getValue)(items[3])}`;
    },
    jg: _ref2 => {
      let {
        items
      } = _ref2;
      return `energy=GAS&country=${(0, _AdapterFn.getValue)(items[0])}&code=${(0, _AdapterFn.getValue)(items[1])}${(0, _AdapterFn.getValue)(items[2])}`;
    }
  }, _ref3 => {
    let {
      value
    } = _ref3;
    return value;
  });
const _crTableUrl = option => {
  const {
      proxy,
      dfTable,
      dfFromDate,
      key,
      fromDate
    } = option,
    value = _getCrTableQuery(option.dfIdFn)(option),
    _apiKeyQuery = _crQueryToken("api_key", option.apiKey),
    _dateQuery = dfFromDate ? _crQueryToken("date.gte", fromDate) : "";
  option.apiKey = null;
  option.key = key || value;
  return `${proxy}${TABLE_URL}/${dfTable}?${(0, _AdapterFn.joinBy)("&", value, _apiKeyQuery, _dateQuery)}`;
};
const _checkDataset = datatable => {
  const {
    data,
    newest_available_date,
    oldest_available_date
  } = datatable;
  if (!(0, _AdapterFn.isNotEmptyArr)(data)) {
    throw (0, _AdapterFn.crError)('', `Result dataset for request is empty:
        Newest Date: ${newest_available_date || ""}
        Oldest Date: ${oldest_available_date || ""}`);
  }
};
const NdlApi = {
  getRequestUrl(option) {
    return _crTableUrl(option);
  },
  getLimitRemaiming: headers => headers.get(LIMIT_REMAINING),
  checkResponse(json) {
    const {
      quandl_error,
      datatable
    } = json || {};
    if (quandl_error) {
      throw (0, _AdapterFn.crError)("", quandl_error.message);
    }
    if (!datatable) {
      throw (0, _AdapterFn.crError)();
    }
    _checkDataset(datatable);
  }
};
var _default = exports.default = NdlApi;
//# sourceMappingURL=NdlApi.js.map