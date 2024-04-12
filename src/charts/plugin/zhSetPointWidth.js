import {
  tryUpdate,
  crPlotOptions
} from './pluginFn';

const zhSetPointWidth = function(pointWidth) {
  tryUpdate(
    this,
    crPlotOptions(
      this,
      "pointWidth",
      pointWidth
    )
  )
};

export default zhSetPointWidth
