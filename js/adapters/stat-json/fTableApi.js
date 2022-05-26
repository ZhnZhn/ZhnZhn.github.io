"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _LoadType = require("../../constants/LoadType");

var _fnAdapter = require("./fnAdapter");

var _crDfQuery = _interopRequireDefault(require("./crDfQuery"));

var _crSdnQuery = _interopRequireDefault(require("./crSdnQuery"));

var _crSirQuery = _interopRequireDefault(require("./crSirQuery"));

const _crErr = _fnAdapter.crError.bind(null, '');

const _hmCrQuery = {
  DF: _crDfQuery.default,
  [_LoadType.LT_SDN]: _crSdnQuery.default,
  [_LoadType.LT_SIR]: _crSirQuery.default
};

const _crDfId = option => option.loadId === _LoadType.LT_SDN ? '' : '/' + option.dfId;

const fTableApi = rootUrl => ({
  getRequestUrl(option) {
    option.resErrStatus = [400];

    if (option.url) {
      return option.url;
    }

    const _dfId = _crDfId(option);

    return option.url = "" + (option.proxy || '') + rootUrl + _dfId;
  },

  crOptionFetch(option) {
    if (option.optionFetch) {
      return option.optionFetch;
    }

    const _crQuery = _hmCrQuery[option.loadId] || _hmCrQuery.DF;

    return option.optionFetch = _crQuery(option);
  },

  checkResponse(json) {
    const {
      error
    } = json || {};

    if (error) {
      throw _crErr(error);
    }

    return true;
  }

});

var _default = fTableApi;
exports.default = _default;
//# sourceMappingURL=fTableApi.js.map