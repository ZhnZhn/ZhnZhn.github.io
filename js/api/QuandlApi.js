"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ApiUtils = require("../utils/ApiUtils");

var _ApiUtils2 = _interopRequireDefault(_ApiUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuandlApi = {};

QuandlApi.rootUrl = "https://www.quandl.com/api/v3/datasets/";
QuandlApi.apiKey = "api_key=NAMdV9hFyWDgCs7PRusf";
//QuandlApi.apiKey = "";

QuandlApi.getRequestUrl = function (option) {
  var queryDate = option.fromDate && option.toDate ? "sort_order=asc&trim_start=" + option.fromDate + "&trim_end=" + option.toDate + "&" : '';

  var uri = "" + QuandlApi.rootUrl + option.value + ".json?\n           " + queryDate + "\n           " + QuandlApi.apiKey;

  return _ApiUtils2.default.createUri(uri);
};

exports.default = QuandlApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\api\QuandlApi.js.map