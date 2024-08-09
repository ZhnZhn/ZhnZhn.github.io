"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _fnAdapter = require("./fnAdapter");
const crData = (json, option) => (0, _fnAdapter.getTimeSeriesValues)(json).map(item => [(0, _AdapterFn.ymdToUTC)(item.date), item.value]),
  trOption = option => {
    option.subtitle = (0, _AdapterFn.joinBy)(', ', option.subtitle, option.dfSubtitle);
  };
const SnbAdapter = (0, _crAdapterType.default)({
  crData,
  trOption
});
var _default = exports.default = SnbAdapter;
//# sourceMappingURL=SnbAdapter.js.map