"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const ITEM_URL = `https://data.${_fnAdapter.ECB_EUROPA_EU}/data/datasets`;
const crData = (json, option) => {
  const _observations = (0, _fnAdapter.getSeriesObservertions)(json),
    _values = (0, _fnAdapter.getObservationValues)(json);
  return (0, _AdapterFn.getObjectKeys)(_observations).reduce((data, prName) => {
    const _dateMls = (0, _AdapterFn.ymdToUTC)((_values[prName] || {}).id),
      _value = (_observations[prName] || [])[0];
    if ((0, _AdapterFn.isNumber)(_dateMls) && (0, _AdapterFn.isNumber)(_value)) {
      data.push([_dateMls, _value]);
    }
    return data;
  }, []).sort(_compareByFn.compareByDate);
};
const addToConfig = (config, json, option) => {
  (0, _AdapterFn.addToConfigInfo)(config, option);
  (0, _AdapterFn.addToConfigDfLink)(config, "ECB Data Portal", `${ITEM_URL}/${option.dfR}/${option.dfR}.${(0, _fnAdapter.crItemId)(option)}`);
  return config;
};
const trOption = option => {
  const {
    dfSubt
  } = option;
  if (dfSubt) {
    option.subtitle = (0, _AdapterFn.joinBy)(', ', option.subtitle, dfSubt);
  }
};
const EcbAdapter = (0, _crAdapterType.crAdapterType1)({
  crData,
  crConfOption: (0, _crAdapterType.fCrConfOptionExchangeRate)("EUR"),
  addToConfig,
  trOption
});
var _default = exports.default = EcbAdapter;
//# sourceMappingURL=EcbAdapter.js.map