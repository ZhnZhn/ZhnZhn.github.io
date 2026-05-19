"use strict";

exports.__esModule = true;
exports.getTimeSeriesValues = exports.DATA_SNB_URL = void 0;
const DATA_SNB_URL = exports.DATA_SNB_URL = "https://data.snb.ch";
const getTimeSeriesValues = json => json?.timeseries?.[0]?.values;
exports.getTimeSeriesValues = getTimeSeriesValues;
//# sourceMappingURL=fnAdapter.js.map