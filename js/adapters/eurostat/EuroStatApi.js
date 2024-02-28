"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _api = _interopRequireDefault(require("./api/api"));
const RES_ERR_STATUS = [400],
  MSG_400 = '400: Bad request.\nDataset contains no data. One or more filtering elements (query parameters) are probably not valid.\nMaybe try to request this data set with older date or another country.',
  _crDetailMsg = errLabel => `${errLabel}\n\nIf you use For Date input field in Dialog\ntry to use more late date.`,
  _addPropTo = option => {
    option.resErrStatus = [...RES_ERR_STATUS];
  };
const EuroStatApi = {
  getRequestUrl(option) {
    _addPropTo(option);
    return option.url ? option.url : option.url = _api.default.crUrlN(option);
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
  }
};
var _default = exports.default = EuroStatApi;
//# sourceMappingURL=EuroStatApi.js.map