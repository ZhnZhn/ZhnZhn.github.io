"use strict";

exports.__esModule = true;
exports.default = void 0;
var _arrFn = require("../../utils/arrFn");
var _isTypeFn = require("../../utils/isTypeFn");
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _crAdapterType = require("../crAdapterType1");
var _fnAdapter = require("./fnAdapter");
const crTitle = (option, json) => {
  const {
      items,
      dfT
    } = option,
    _reporting = (0, _AdapterFn.getCaption)(items[0]),
    _product = (0, _AdapterFn.getCaption)(items[1]),
    item = (0, _fnAdapter.getDataset)(json)[0] || {};
  return {
    title: (0, _arrFn.joinByColon)(_reporting, dfT),
    subtitle: (0, _arrFn.joinByColon)(_product, item.Unit)
  };
};
const trOption = (option, json) => {
  (0, _AdapterFn.assign)(option, crTitle(option, json));
};
const _getPeriodCode = periodCode => periodCode === "A" ? "" : (0, _isTypeFn.isStr)(periodCode) ? "-" + periodCode.replace("M", "") : "-NN";
const _fCrItemTuple = () => item => [(0, _AdapterFn.ymdToUTC)('' + item.Year + _getPeriodCode(item.PeriodCode)), item.Value],
  _crData = (0, _crAdapterType.fCrDataType1)(_fnAdapter.getDataset, _fCrItemTuple),
  crData = json => _crData(json).sort(_compareByFn.compareByDate);
const toLineAdapter = (0, _crAdapterType.crAdapterType1)({
  crData,
  trOption
});
var _default = exports.default = toLineAdapter;
//# sourceMappingURL=toLineAdapter.js.map