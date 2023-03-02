const _setActiveContCheckBox = (
  slice,
  checkBox
) => {
  const _chb = slice.activeContChb;
  if (_chb) {
    _chb.setUnchecked()
  }
  slice.activeContChb = checkBox
}
const _unsetActiveContCheckBox = (slice) => {
  slice.activeContChb = null
}

export const toggleContCheckBox = (
  slice,
  checkBox,
  isCheck
) => {
    if (isCheck) {
      _setActiveContCheckBox(slice, checkBox)
    } else {
      _unsetActiveContCheckBox(slice)
    }
}

export const uncheckActiveContCheckBox = (
  slice,
  chartType
) => {
  const _chb = slice.activeContChb;
  if (_chb && _chb.chartType === chartType) {
    _chb.setUnchecked()
    _unsetActiveContCheckBox(slice)
  }
}
