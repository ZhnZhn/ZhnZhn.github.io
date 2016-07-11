'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiUtils = require('../utils/ApiUtils');

var _ApiUtils2 = _interopRequireDefault(_ApiUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuandlApi = {};

QuandlApi.rootUrl = "https://www.quandl.com/api/v3/datasets/";
QuandlApi.BLANK = '';

QuandlApi.getRequestUrl = function (option) {
  var queryDate = option.fromDate && option.toDate ? 'sort_order=asc&trim_start=' + option.fromDate + '&trim_end=' + option.toDate : QuandlApi.BLANK;

  var apiKey = void 0;
  if (option.apiKey) {
    apiKey = queryDate ? '&api_key=' + option.apiKey : 'api_key=' + option.apiKey;
  } else {
    apiKey = QuandlApi.BLANK;
  }

  var uri = '' + QuandlApi.rootUrl + option.value + '.json?' + queryDate + apiKey;

  return _ApiUtils2.default.createUri(uri);
};

var REQUEST_ERROR = 'Request Error',
    DATASET_EMPTY = 'Dataset Empty';
QuandlApi.checkResponse = function (json) {
  var quandl_error = json.quandl_error;
  var _json$dataset = json.dataset;
  var dataset = _json$dataset === undefined ? {} : _json$dataset;

  if (quandl_error) {
    if (quandl_error.message) {
      throw { errCaption: REQUEST_ERROR, message: json.quandl_error.message };
    } else {
      throw { errCaption: REQUEST_ERROR, message: '' };
    }
  } else if (!dataset.data || dataset.data.length === 0) {
    var _dataset$newest_avail = dataset.newest_available_date;
    var newest_available_date = _dataset$newest_avail === undefined ? '' : _dataset$newest_avail;
    var _dataset$oldest_avail = dataset.oldest_available_date;
    var oldest_available_date = _dataset$oldest_avail === undefined ? '' : _dataset$oldest_avail;

    throw {
      errCaption: DATASET_EMPTY,
      message: 'Result dataset for request is empty:\n                    Newest Date: ' + newest_available_date + '\n                    Oldest Date: ' + oldest_available_date
    };
  }
  return true;
};

exports.default = QuandlApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\api\QuandlApi.js.map