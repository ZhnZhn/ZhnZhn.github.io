
export const crPlotOptions = (
  chartInst,
  propName,
  propValue
) => ({
    plotOptions: {
      [chartInst.options.chart.type]: {
        [propName]: propValue
      }
    }
})

export const tryUpdate = (inst, options) => {
  try {
    inst.update(options)
  } catch(err) {
    console.log(err)
  }
}
