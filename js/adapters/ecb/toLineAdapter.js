"use strict";

exports.__esModule = true;
exports.default = void 0;
var _arrFn = require("../../utils/arrFn");
var _isTypeFn = require("../../utils/isTypeFn");
var _crAdapterType = require("../crAdapterType1");
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const ITEM_URL = `https://data.${_fnAdapter.ECB_EUROPA_EU}/data/datasets`;
const crData = (json, option) => {
  const _observations = (0, _fnAdapter.getSeriesObservertions)(json),
    _values = (0, _fnAdapter.getObservationValues)(json);
  return (0, _isTypeFn.getObjectKeys)(_observations).reduce((data, prName) => {
    const _dateMls = (0, _AdapterFn.ymdToUTC)((_values[prName] || {}).id),
      _value = (_observations[prName] || [])[0];
    if ((0, _isTypeFn.isNumber)(_dateMls) && (0, _isTypeFn.isNumber)(_value)) {
      data.push([_dateMls, _value]);
    }
    return data;
  }, []).sort(_compareByFn.compareByDate);
};
const trOption = option => {
  const {
    dfSubt
  } = option;
  if (dfSubt) {
    option.subtitle = (0, _arrFn.joinByComma)(option.subtitle, dfSubt);
  }
};
const _crDfLink = option => `${ITEM_URL}/${option.dfR}/${option.dfR}.${(0, _fnAdapter.crItemId)(option)}`;
const toLineAdapter = (0, _crAdapterType.crAdapterType1)({
  crData,
  crConfOption: (0, _crAdapterType.fCrConfOptionExchangeRate)("EUR"),
  addToConfig: (0, _AdapterFn.fAddToConfigInfoAndDfLink)("ECB", _crDfLink),
  trOption
});
var _default = exports.default = toLineAdapter;
//# sourceMappingURL=toLineAdapter.js.map