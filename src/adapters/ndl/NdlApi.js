import {
  isNotEmptyArr,
  getValue,
  crError,
  crGetRoute,
  joinBy
} from "../AdapterFn";

const API_V3 = "https://data.nasdaq.com/api/v3"
, TABLE_URL = `${API_V3}/datatables`
, LIMIT_REMAINING = "X-RateLimit-Remaining";

const _crQueryToken = (
  name,
  value
) => value
  ? `${name}=${value}`
  : ""
, _getCrTableQuery = crGetRoute({
  jo: ({ items }) => `energy=OIL&country=${getValue(items[0])}&code=${getValue(items[1])}${getValue(items[2])}${getValue(items[3])}`,
  jg: ({ items }) => `energy=GAS&country=${getValue(items[0])}&code=${getValue(items[1])}${getValue(items[2])}`
}, ({ value }) => value);

const _crTableUrl = (
  option
) => {
  const {
    proxy,
    dfTable,
    dfFromDate,
    key,
    fromDate,
  } = option
  , value = _getCrTableQuery(option.dfIdFn)(option)
  , _apiKeyQuery = _crQueryToken("api_key", option.apiKey)
  , _dateQuery = dfFromDate
      ? _crQueryToken("date.gte", fromDate)
      : "";

  option.apiKey = null
  option.key = key || value

  return `${proxy}${TABLE_URL}/${dfTable}?${joinBy("&", value, _apiKeyQuery, _dateQuery)}`;
};

const _checkDataset = (
  datatable
) => {
  const {
    data,
    newest_available_date,
    oldest_available_date
  } = datatable;
  if (!isNotEmptyArr(data)) {
    throw crError('',
       `Result dataset for request is empty:
        Newest Date: ${newest_available_date || ""}
        Oldest Date: ${oldest_available_date || ""}`
    );
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

    if (quandl_error){
      throw crError("", quandl_error.message);
    }
    if (!datatable) {
      throw crError();
    }
    _checkDataset(datatable)
  }
};

export default NdlApi
