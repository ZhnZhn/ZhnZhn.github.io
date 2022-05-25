export const toggleItemCheckBox = (
  slice,
  { isCheck, checkBox, chart }
) => {
   if (isCheck){
      const activeCheckbox = slice.activeCheckbox;
      if (activeCheckbox && activeCheckbox !== checkBox){
         activeCheckbox.setUnchecked()
      }
      slice.activeCheckbox = checkBox
      slice.activeChart = chart
   } else {
     slice.activeCheckbox = null
     slice.activeChart = null
   }
}

export const uncheckActiveItemCheckBox = (
  slice,
  chartType
) => {
   const activeCheckbox = slice.activeCheckbox;
   if (activeCheckbox &&
    (!chartType || activeCheckbox.chartType === chartType) ){
      activeCheckbox.setUnchecked()
      slice.activeCheckbox = null
      slice.activeChart = null
   }
}
