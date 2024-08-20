"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crAdapterType = require("../crAdapterType1");
var _fnAdapter = require("./fnAdapter");
const ITEM_URL = `${_fnAdapter.DATA_SNB_URL}/en/topics`;
const DF_SUB_ID = "uvo";
const _fCrItemTuple = () => item => [(0, _AdapterFn.ymdToUTC)(item.date), item.value],
  crData = (0, _crAdapterType.fCrDataType1)(_fnAdapter.getTimeSeriesValues, _fCrItemTuple),
  trOption = option => {
    option.subtitle = (0, _AdapterFn.joinBy)(', ', option.subtitle, option.dfSubtitle);
  },
  addToConfig = (config, json, option) => {
    config.info = (0, _AdapterFn.crInfoWithName)(option);
    (0, _AdapterFn.assign)(config.zhConfig, {
      linkFn: option.loadId,
      item: `${ITEM_URL}/${option.dfSubId || DF_SUB_ID}/cube/${option.dfId}`
    });
    return config;
  };
const SnbAdapter = (0, _crAdapterType.crAdapterType1)({
  crData,
  trOption,
  addToConfig,
  crConfOption: (0, _crAdapterType.fCrConfOptionExchangeRate)("CHF")
});
var _default = exports.default = SnbAdapter;
//# sourceMappingURL=SnbAdapter.js.map