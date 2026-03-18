import {
  tryUpdate,
  crPlotOptions
} from './pluginFn';

export default function(pointWidth) {
  tryUpdate(
    this,
    crPlotOptions(
      this,
      "pointWidth",
      pointWidth
    )
  )
}
