
export const getSeriaType = (
  chartInst
) => chartInst.options.chart.type

export const tryUpdate = (inst, options) => {
  try {
    inst.update(options)
  } catch(err) {
    console.log(err)
  }
}
