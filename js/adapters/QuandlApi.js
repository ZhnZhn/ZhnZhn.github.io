'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  ROOT_URL: "https://www.quandl.com/api/v3/datasets/",

  REQUEST_ERROR: 'Request Error',
  DATASET_EMPTY: 'Dataset Empty'
};

var QuandlApi = {
  getRequestUrl: function getRequestUrl(option) {
    var value = option.value,
        fromDate = option.fromDate,
        toDate = option.toDate,
        apiKey = option.apiKey,
        transform = option.transform;


    var _queryDate = '';
    if (fromDate || toDate) {
      _queryDate = 'sort_order=asc';
      if (fromDate) {
        _queryDate = _queryDate + ('&trim_start=' + fromDate);
      }
      if (toDate) {
        _queryDate = _queryDate + ('&trim_end=' + toDate);
      }
    }

    if (transform) {
      _queryDate = _queryDate + ('&transform=' + transform);
    }

    var _apiKey = '';
    if (apiKey) {
      _apiKey = _queryDate ? '&api_key=' + apiKey : 'api_key=' + apiKey;
    }

    return '' + C.ROOT_URL + value + '.json?' + _queryDate + _apiKey;
  },
  checkResponse: function checkResponse(json) {
    var quandl_error = json.quandl_error,
        _json$dataset = json.dataset,
        dataset = _json$dataset === undefined ? {} : _json$dataset;

    if (quandl_error) {
      if (quandl_error.message) {
        throw { errCaption: C.REQUEST_ERROR, message: json.quandl_error.message };
      } else {
        throw { errCaption: C.REQUEST_ERROR, message: '' };
      }
    } else if (!dataset.data || dataset.data.length === 0) {
      var _dataset$newest_avail = dataset.newest_available_date,
          newest_available_date = _dataset$newest_avail === undefined ? '' : _dataset$newest_avail,
          _dataset$oldest_avail = dataset.oldest_available_date,
          oldest_available_date = _dataset$oldest_avail === undefined ? '' : _dataset$oldest_avail;

      throw {
        errCaption: C.DATASET_EMPTY,
        message: 'Result dataset for request is empty:\n                      Newest Date: ' + newest_available_date + '\n                      Oldest Date: ' + oldest_available_date
      };
    }
    return true;
  }
};

exports.default = QuandlApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\QuandlApi.js.map