"use strict";

exports.__esModule = true;
exports.tryUpdate = exports.getSeriaType = void 0;
const getSeriaType = chartInst => chartInst.options.chart.type;
exports.getSeriaType = getSeriaType;
const tryUpdate = (inst, options) => {
  try {
    inst.update(options);
  } catch (err) {
    console.log(err);
  }
};
exports.tryUpdate = tryUpdate;
//# sourceMappingURL=pluginFn.js.map