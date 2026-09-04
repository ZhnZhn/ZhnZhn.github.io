"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _LoadType = require("../../constants/LoadType");
var _ApiFn = require("../ApiFn");
var _fnAdapter = require("./fnAdapter");
var _crDfQuery = _interopRequireDefault(require("./crDfQuery"));
var _crSdnQuery = _interopRequireDefault(require("./crSdnQuery"));
var _crSirQuery = _interopRequireDefault(require("./crSirQuery"));
const _hmCrQuery = {
  DF: _crDfQuery.default,
  [_LoadType.LT_SDN]: _crSdnQuery.default,
  [_LoadType.LT_SIR]: _crSirQuery.default
};
const crUrlPathDf = option => '/' + option.dfId;
const crOptionFetch = option => {
    if (option.optionFetch) {
      return option.optionFetch;
    }
    const _crQuery = _hmCrQuery[option.loadId] || _hmCrQuery.DF;
    return option.optionFetch = _crQuery(option);
  },
  checkResponse = json => {
    const {
      error
    } = json || {};
    if (error) {
      throw (0, _fnAdapter.crErrorByMessage)(error);
    }
  };
const fTableApi = (rootUrl, crUrlPath = crUrlPathDf) => (0, _ApiFn.addCrOptionFetchTo)((0, _ApiFn.crProviderApi)(option => {
  option.resErrStatus = [400];
  if (option.url) {
    return option.url;
  }
  const _dfId = crUrlPath(option);
  return option.url = `${option.proxy || ''}${rootUrl}${_dfId}`;
}, checkResponse), crOptionFetch);
var _default = exports.default = fTableApi;
//# sourceMappingURL=fTableApi.js.map