"use strict";

exports.__esModule = true;
exports.default = void 0;
var _dateFn = require("../../utils/dateFn");
var _arrFn = require("../../utils/arrFn");
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
const NDL_DATA_SOURCE = "NDL",
  API_V3 = "https://data.nasdaq.com/api/v3",
  TABLE_URL = `${API_V3}/datatables`,
  LIMIT_REMAINING = "X-RateLimit-Remaining";
const _crDataSource = _ref => {
    let {
      dataSource
    } = _ref;
    return (0, _arrFn.joinByBlank)(NDL_DATA_SOURCE, dataSource);
  },
  _crDate = time => {
    const arrDate = time.split("-");
    return `${time}-${(0, _dateFn.getNumberOfDays)(arrDate[0], arrDate[1])}`;
  },
  _crQueryToken = (name, value) => value ? `${name}=${value}` : "",
  _crQueryOneTwo = (pn1, pn2, items) => `${pn1}=${(0, _AdapterFn.getValue)(items[0])}&${pn2}=${(0, _AdapterFn.getValue)(items[1])}`,
  _crQueryCountryCode = (items, seriaType) => (0, _CategoryFn.isCategory)(seriaType) ? _crQueryToken("code", (0, _AdapterFn.getValue)(items[1])) : _crQueryOneTwo("country", "code", items),
  _getCrTableQuery = (0, _AdapterFn.crGetRoute)({
    jo: _ref2 => {
      let {
        items,
        seriaType
      } = _ref2;
      return `energy=OIL&${_crQueryCountryCode(items, seriaType)}${(0, _AdapterFn.getValue)(items[2])}${(0, _AdapterFn.getValue)(items[3])}`;
    },
    jg: _ref3 => {
      let {
        items,
        seriaType
      } = _ref3;
      return `energy=GAS&${_crQueryCountryCode(items, seriaType)}${(0, _AdapterFn.getValue)(items[2])}`;
    },
    zl: _ref4 => {
      let {
        items
      } = _ref4;
      return `${_crQueryOneTwo("indicator_id", "region_id", items)}`;
    }
  }, _ref5 => {
    let {
      value
    } = _ref5;
    return value;
  });
const _crTableUrl = option => {
  const {
      proxy,
      dfTable
    } = option,
    value = _getCrTableQuery(option.dfIdFn)(option),
    _apiKeyQuery = _crQueryToken("api_key", option.apiKey),
    _dateQuery = (0, _CategoryFn.isCategory)(option.seriaType) ? _crQueryToken("date", _crDate(option.time)) : option.dfFromDate ? _crQueryToken("date.gte", option.fromDate) : "";
  option.apiKey = null;
  option.dataSource = _crDataSource(option);
  return `${proxy}${TABLE_URL}/${dfTable}?${(0, _arrFn.joinBy)("&", value, _apiKeyQuery, _dateQuery)}`;
};
const _checkDataset = datatable => {
  const {
    data,
    newest_available_date,
    oldest_available_date
  } = datatable;
  if (!(0, _AdapterFn.isNotEmptyArr)(data)) {
    throw (0, _AdapterFn.crError)("", `Result dataset for request is empty:
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