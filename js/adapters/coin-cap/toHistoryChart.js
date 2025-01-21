"use strict";

exports.__esModule = true;
exports.toHistoryChart = void 0;
var _AdapterFn = require("../AdapterFn");
var _crAdapterType = require("../crAdapterType1");
const crData = (0, _crAdapterType.fCrDataType1)(json => json.data, () => item => [item.time, (0, _AdapterFn.roundByOHLC)(parseFloat(item.priceUsd))]);
const toHistoryChart = exports.toHistoryChart = (0, _crAdapterType.crAdapterType1)({
  crData
});
//# sourceMappingURL=toHistoryChart.js.map