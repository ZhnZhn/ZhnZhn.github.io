import { getNumberOfDays } from "../../utils/dateFn";
import {
  joinBy,
  joinByBlank
} from "../../utils/arrFn";
import {
  isNotEmptyArr,
  getValue,
  crError,
  crGetRoute
} from "../AdapterFn";

import { isCategory } from "../CategoryFn";

const NDL_DATA_SOURCE = "NDL"
, API_V3 = "https://data.nasdaq.com/api/v3"
, TABLE_URL = `${API_V3}/datatables`
, LIMIT_REMAINING = "X-RateLimit-Remaining";

const _crDataSource = ({
  dataSource
}) => joinByBlank(NDL_DATA_SOURCE, dataSource)
, _crDate = (
  time
) => {
  const arrDate = time.split("-");
  return `${time}-${getNumberOfDays(arrDate[0], arrDate[1])}`;
}
, _crQueryToken = (
  name,
  value
) => value
  ? `${name}=${value}`
  : ""
, _crQueryOneTwo = (
  pn1,
  pn2,
  items
) => `${pn1}=${getValue(items[0])}&${pn2}=${getValue(items[1])}`
, _crQueryCountryCode = (
  items,
  seriaType
) => isCategory(seriaType)
 ? _crQueryToken("code", getValue(items[1]))
 : _crQueryOneTwo("country", "code", items)
, _getCrTableQuery = crGetRoute({
  jo: ({ items, seriaType }) => `energy=OIL&${_crQueryCountryCode(items, seriaType)}${getValue(items[2])}${getValue(items[3])}`,
  jg: ({ items, seriaType }) => `energy=GAS&${_crQueryCountryCode(items, seriaType)}${getValue(items[2])}`,
  zl: ({ items }) => `${_crQueryOneTwo("indicator_id", "region_id", items)}`
}, ({ value }) => value);

const _crTableUrl = (
  option
) => {
  const {
    proxy,
    dfTable
  } = option
  , value = _getCrTableQuery(option.dfIdFn)(option)
  , _apiKeyQuery = _crQueryToken("api_key", option.apiKey)
  , _dateQuery = isCategory(option.seriaType)
       ? _crQueryToken("date", _crDate(option.time))
       : option.dfFromDate
          ? _crQueryToken("date.gte", option.fromDate)
          : "";

  option.apiKey = null
  option.dataSource = _crDataSource(option)

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
    throw crError("",
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
