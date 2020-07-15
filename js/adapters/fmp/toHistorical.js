"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var _crAdapterOHLCV = _interopRequireDefault(require("../crAdapterOHLCV"));

var crCaption = _fnAdapter["default"].crCaption,
    crHistOption = _fnAdapter["default"].crHistOption;

var _getData = function _getData(json, option) {
  var dfPn = option.dfPn;
  return json[dfPn].reverse();
};

var toChart = (0, _crAdapterOHLCV["default"])({
  crCaption: crCaption,
  getArr: _getData,
  crAddConfig: crHistOption
});
var _default = toChart;
exports["default"] = _default;
//# sourceMappingURL=toHistorical.js.map