import { crError } from '../crFn';

const C = {
  ROOT_URL: "https://www.quandl.com/api/v3/datasets/",
  TABLE_URL: "https://www.quandl.com/api/v3/datatables/",

  LIMIT_REMAINING: 'X-RateLimit-Remaining'
};

const _addTo = (q, pN, pV) => {
  if (!pV) {
    return q || '';
  }
  return q ? `${q}&${pN}=${pV}` : `${pN}=${pV}`;
};

const _crSetUrl = (option) => {
  const { value, fromDate, toDate, apiKey, transform } = option;
  let _q = 'sort_order=asc';
  _q = _addTo(_q, 'trim_start', fromDate)
  _q = _addTo(_q, 'trim_end', toDate)
  _q = _addTo(_q, 'transform', transform)
  _q = _addTo(_q, 'api_key', apiKey)

  return `${C.ROOT_URL}${value}.json?${_q}`;
};


const _crTableUrl = (option) => {
  const {
          proxy,
          dfTable,
          dfTail, dfColumn,
          value,
          apiKey
        } = option
      , { one, two } = value;
  option.key = (option.value = `${one}_${two}`);
  return `${proxy}${C.TABLE_URL}${dfTable}.json?ticker=${one}&api_key=${apiKey}&${dfTail}&qopts.columns=${dfColumn},${two}`;
};

const _checkErr = (err) => {
  if ( err ){
    throw crError('', err.message);
  }
};
const _checkDataEmpty = (dataset, datatable) => {
  if (!dataset && !datatable) {
    throw crError();
  }
};
const _checkDataset = (dataset) => {
  const {
    data,
    newest_available_date,
    oldest_available_date
  } = dataset;
  if (!data || data.length === 0 ) {
    throw crError('',
       `Result dataset for request is empty:
        Newest Date: ${newest_available_date || ''}
        Oldest Date: ${oldest_available_date || ''}`
    );
  }
};

const QuandlApi = {

  getRequestUrl(option={}) {
    return !option.dfTable
      ? _crSetUrl(option)
      : _crTableUrl(option);
  },

  // headers && headers.get existed
  getLimitRemaiming: headers => headers.get(C.LIMIT_REMAINING),

  checkResponse(json) {
    const {
      quandl_error,
      dataset,
      datatable
    } = json;

    _checkErr(quandl_error)
    _checkDataEmpty(dataset, datatable)
    _checkDataset(dataset)

    return true;
  }
}

export default QuandlApi
