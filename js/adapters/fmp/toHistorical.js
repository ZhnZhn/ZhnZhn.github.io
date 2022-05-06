"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _fnAdapter = require("./fnAdapter");

var _crAdapterOHLCV = _interopRequireDefault(require("../crAdapterOHLCV"));

const _getData = (json, _ref) => {
  let {
    dfPn
  } = _ref;
  return (json[dfPn] || json).reverse();
};

const toChart = (0, _crAdapterOHLCV.default)({
  crCaption: _fnAdapter.crCaption,
  getArr: _getData,
  crAddConfig: _fnAdapter.crHistOption
});
var _default = toChart;
exports.default = _default;
//# sourceMappingURL=toHistorical.js.map