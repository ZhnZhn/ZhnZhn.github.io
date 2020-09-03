"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  ROOT_URL: "https://www.quandl.com/api/v3/datasets/",
  TABLE_URL: "https://www.quandl.com/api/v3/datatables/",
  LIMIT_REMAINING: 'X-RateLimit-Remaining',
  REQUEST_ERROR: 'Request Error',
  DATASET_EMPTY: 'Dataset Empty'
};

var _crErr = function _crErr(errCaption, message) {
  if (message === void 0) {
    message = '';
  }

  return {
    errCaption: errCaption,
    message: message
  };
};

var _addTo = function _addTo(q, pN, pV) {
  if (!pV) {
    return q || '';
  }

  return q ? q + "&" + pN + "=" + pV : pN + "=" + pV;
};

var _crSetUrl = function _crSetUrl(option) {
  var value = option.value,
      fromDate = option.fromDate,
      toDate = option.toDate,
      apiKey = option.apiKey,
      transform = option.transform;
  var _q = 'sort_order=asc';
  _q = _addTo(_q, 'trim_start', fromDate);
  _q = _addTo(_q, 'trim_end', toDate);
  _q = _addTo(_q, 'transform', transform);
  _q = _addTo(_q, 'api_key', apiKey);
  return "" + C.ROOT_URL + value + ".json?" + _q;
};

var _crTableUrl = function _crTableUrl(option) {
  var proxy = option.proxy,
      dfTable = option.dfTable,
      dfTail = option.dfTail,
      dfColumn = option.dfColumn,
      value = option.value,
      apiKey = option.apiKey,
      one = value.one,
      two = value.two;
  option.key = option.value = one + "_" + two;
  return "" + proxy + C.TABLE_URL + dfTable + ".json?ticker=" + one + "&api_key=" + apiKey + "&" + dfTail + "&qopts.columns=" + dfColumn + "," + two;
};

var _checkErr = function _checkErr(err) {
  if (err) {
    throw _crErr(C.REQUEST_ERROR, err.message);
  }
};

var _checkDataEmpty = function _checkDataEmpty(dataset, datatable) {
  if (!dataset && !datatable) {
    throw _crErr(C.DATASET_EMPTY);
  }
};

var _checkDataset = function _checkDataset(dataset) {
  var data = dataset.data,
      newest_available_date = dataset.newest_available_date,
      oldest_available_date = dataset.oldest_available_date;

  if (!data || data.length === 0) {
    throw _crErr(C.DATASET_EMPTY, "Result dataset for request is empty:\n        Newest Date: " + (newest_available_date || '') + "\n        Oldest Date: " + (oldest_available_date || ''));
  }
};

var QuandlApi = {
  getRequestUrl: function getRequestUrl(option) {
    if (option === void 0) {
      option = {};
    }

    return !option.dfTable ? _crSetUrl(option) : _crTableUrl(option);
  },
  // headers && headers.get existed
  getLimitRemaiming: function getLimitRemaiming(headers) {
    return headers.get(C.LIMIT_REMAINING);
  },
  checkResponse: function checkResponse(json) {
    var quandl_error = json.quandl_error,
        dataset = json.dataset,
        datatable = json.datatable;

    _checkErr(quandl_error);

    _checkDataEmpty(dataset, datatable);

    _checkDataset(dataset);

    return true;
  }
};
var _default = QuandlApi;
exports["default"] = _default;
//# sourceMappingURL=QuandlApi.js.map