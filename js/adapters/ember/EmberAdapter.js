"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _AdapterFn = require("../AdapterFn");

const crData = (json, option) => {
  const {
    fromYear,
    data
  } = json,
        _fromYear = parseInt(fromYear, 10);

  return (0, _AdapterFn.isNumber)(_fromYear) ? data.map((v, index) => [(0, _AdapterFn.ymdToUTC)(_fromYear + index + ''), v]) : [];
};

const EmberAdapter = (0, _crAdapterType.default)({
  crData
});
var _default = EmberAdapter;
exports.default = _default;
//# sourceMappingURL=EmberAdapter.js.map