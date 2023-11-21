const _SLICE = {
  chb: null
};

const _setActiveContCheckBox = (
  checkBox
) => {
  const _chb = _SLICE.chb;
  if (_chb) {
    _chb.setUnchecked()
  }
  _SLICE.chb = checkBox
};

const _toggleContCheckBox = (
  checkBox,
  isCheck
) => {
    if (isCheck) {
      _setActiveContCheckBox(checkBox)
    } else {
      _SLICE.chb = null
    }
};

export const getActiveContCheckBox = () => _SLICE.chb

export const setActiveContainer = (
  chartType,
  browserType,
  checkBox,
  isCheck
) => {
  checkBox.chartType = chartType
  checkBox.browserType = browserType
  _toggleContCheckBox(checkBox, isCheck)
}

export const uncheckActiveContCheckBox = (
  chartType
) => {
  const _chb = _SLICE.chb;
  if (_chb && _chb.chartType === chartType) {
    _chb.setUnchecked()
    _SLICE.chb = null
  }
}
