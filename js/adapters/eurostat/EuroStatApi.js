"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

var _api = _interopRequireDefault(require("./api/api"));

const RES_ERR_STATUS = [400],
      MSG_400 = '400: Bad request.\nDataset contains no data. One or more filtering elements (query parameters) are probably not valid.\nMaybe try to request this data set with older date or another country.',
      _crDetailMsg = errLabel => errLabel + "\n\nIf you use For Date input field in Dialog\ntry to use more late date.",
      _addPropTo = option => {
  option.resErrStatus = [...RES_ERR_STATUS];
};

const EuroStatApi = {
  getRequestUrl(option) {
    _addPropTo(option);

    if (option.url) {
      return option.url;
    }

    const _url = _api.default.crUrlN(option);

    return option.url = _url;
  },

  checkResponse(json, option, status) {
    if (status === 400) {
      throw (0, _AdapterFn.crError)('', MSG_400);
    }

    const {
      error
    } = json;

    if (error) {
      const {
        label
      } = error,
            _msgErr = label ? _crDetailMsg(label) : void 0;

      throw (0, _AdapterFn.crError)('', _msgErr);
    }

    return true;
  }

};
var _default = EuroStatApi;
exports.default = _default;
//# sourceMappingURL=EuroStatApi.js.map