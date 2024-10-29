"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _fnAdapter = require("./fnAdapter");
const API_URL = `${_fnAdapter.BEA_DATA_URL}/api/data/?Year=ALL&ResultFormat=JSON&method=GETDATA&UserID`;
const _setCaptionTo = option => {
  const {
    title,
    subtitle,
    dfTitle
  } = option;
  (0, _AdapterFn.assign)(option, {
    itemCaption: title,
    title: dfTitle,
    subtitle: (0, _AdapterFn.joinBy)(": ", title, subtitle)
  });
};
const BeaApi = {
  getRequestUrl(option) {
    const {
        TableID,
        DataSetName,
        apiKey,
        ValueName,
        items = []
      } = option,
      value = (0, _AdapterFn.getValue)(items[0]),
      _Frequncy = (0, _fnAdapter.getFrequency)(items[0]);
    _setCaptionTo(option);
    return `${API_URL}=${apiKey}&TableID=${TableID}&DataSetName=${DataSetName}&Frequency=${_Frequncy}&${ValueName}=${value}`;
  },
  checkResponse(json) {
    const ResError = (0, _fnAdapter.getResError)(json);
    if (ResError) {
      throw (0, _AdapterFn.crError)(ResError.APIErrorCode, (ResError.ErrorDetail || {}).Description || ResError.APIErrorDescription);
    }
    const Results = (0, _fnAdapter.getResults)(json);
    if (!Results || Results.Error || !(0, _AdapterFn.isArr)((0, _fnAdapter.getResultsData)(Results))) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = BeaApi;
//# sourceMappingURL=BeaApi.js.map