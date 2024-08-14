"use strict";

exports.__esModule = true;
exports.getSeriesId = exports.getObservationsData = void 0;
const getSeriesId = options => options.items[0].v;
exports.getSeriesId = getSeriesId;
const getObservationsData = (json, options) => (json || {}).observations;
exports.getObservationsData = getObservationsData;
//# sourceMappingURL=fnAdapter.js.map