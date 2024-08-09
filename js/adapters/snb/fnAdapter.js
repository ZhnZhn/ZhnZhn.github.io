"use strict";

exports.__esModule = true;
exports.getTimeSeriesValues = void 0;
const getTimeSeriesValues = json => (((json || {}).timeseries || [])[0] || {}).values;
exports.getTimeSeriesValues = getTimeSeriesValues;
//# sourceMappingURL=fnAdapter.js.map