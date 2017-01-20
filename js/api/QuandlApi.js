'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var QuandlApi = {
  rootUrl: "https://www.quandl.com/api/v3/datasets/",
  BLANK: ''
};

QuandlApi.getRequestUrl = function (option) {
  var value = option.value,
      fromDate = option.fromDate,
      toDate = option.toDate,
      apiKey = option.apiKey;


  var _queryDate = void 0;
  if (fromDate || toDate) {
    _queryDate = 'sort_order=asc';
    if (fromDate) {
      _queryDate = _queryDate + ('&trim_start=' + fromDate);
    }
    if (toDate) {
      _queryDate = _queryDate + ('&trim_end=' + toDate);
    }
  } else {
    _queryDate = QuandlApi.BLANK;
  }

  var _apiKey = void 0;
  if (apiKey) {
    _apiKey = _queryDate ? '&api_key=' + apiKey : 'api_key=' + apiKey;
  } else {
    _apiKey = QuandlApi.BLANK;
  }

  var _uri = '' + QuandlApi.rootUrl + value + '.json?' + _queryDate + _apiKey;

  return _uri;
};

var REQUEST_ERROR = 'Request Error',
    DATASET_EMPTY = 'Dataset Empty';
QuandlApi.checkResponse = function (json) {
  var quandl_error = json.quandl_error,
      _json$dataset = json.dataset,
      dataset = _json$dataset === undefined ? {} : _json$dataset;

  if (quandl_error) {
    if (quandl_error.message) {
      throw { errCaption: REQUEST_ERROR, message: json.quandl_error.message };
    } else {
      throw { errCaption: REQUEST_ERROR, message: '' };
    }
  } else if (!dataset.data || dataset.data.length === 0) {
    var _dataset$newest_avail = dataset.newest_available_date,
        newest_available_date = _dataset$newest_avail === undefined ? '' : _dataset$newest_avail,
        _dataset$oldest_avail = dataset.oldest_available_date,
        oldest_available_date = _dataset$oldest_avail === undefined ? '' : _dataset$oldest_avail;

    throw {
      errCaption: DATASET_EMPTY,
      message: 'Result dataset for request is empty:\n                    Newest Date: ' + newest_available_date + '\n                    Oldest Date: ' + oldest_available_date
    };
  }
  return true;
};

exports.default = QuandlApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\api\QuandlApi.js.map