"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _arrFn = require("../../utils/arrFn");
var _crAdapterType = require("../crAdapterType1");
var _AvFn = require("../av/AvFn");
const PN_VALUE = 'value',
  PN_PRICE = 'price',
  PN_DATE = 'date',
  _crDataByValue = (0, _AvFn.fCrData)(PN_VALUE, PN_DATE),
  _crDataByPrice = (0, _AvFn.fCrData)(PN_PRICE, PN_DATE),
  crData = _ref => {
    let {
      data
    } = _ref;
    const item = data[0],
      _crData = (0, _isTypeFn.hasOwnProperty)(item, PN_VALUE) ? _crDataByValue : (0, _isTypeFn.hasOwnProperty)(item, PN_PRICE) ? _crDataByPrice : void 0;
    return _crData ? _crData(data) : [];
  },
  trOption = (option, json) => {
    const {
        title
      } = option,
      {
        unit
      } = json;
    option.title = (0, _arrFn.joinByComma)(title, unit);
  };
const AvEconomicsAdapter = (0, _crAdapterType.crAdapterType1)({
  crData,
  trOption
});
var _default = exports.default = AvEconomicsAdapter;
//# sourceMappingURL=AvEconomicsAdapter.js.map