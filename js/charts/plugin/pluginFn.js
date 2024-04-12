"use strict";

exports.__esModule = true;
exports.tryUpdate = exports.crPlotOptions = void 0;
const crPlotOptions = (chartInst, propName, propValue) => ({
  plotOptions: {
    [chartInst.options.chart.type]: {
      [propName]: propValue
    }
  }
});
exports.crPlotOptions = crPlotOptions;
const tryUpdate = (inst, options) => {
  try {
    inst.update(options);
  } catch (err) {
    console.log(err);
  }
};
exports.tryUpdate = tryUpdate;
//# sourceMappingURL=pluginFn.js.map