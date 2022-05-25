"use strict";

exports.__esModule = true;
exports.uncheckActiveContCheckBox = exports.toggleContCheckBox = void 0;

const _setActiveContCheckBox = (slice, checkBox) => {
  const _chb = slice.activeContChb;

  if (_chb) {
    _chb.setUnchecked();
  }

  slice.activeContChb = checkBox;
};

const _unsetActiveContCheckBox = slice => {
  slice.activeContChb = null;
};

const toggleContCheckBox = (slice, _ref) => {
  let {
    isCheck,
    checkBox
  } = _ref;

  if (isCheck) {
    _setActiveContCheckBox(slice, checkBox);
  } else {
    _unsetActiveContCheckBox(slice);
  }
};

exports.toggleContCheckBox = toggleContCheckBox;

const uncheckActiveContCheckBox = (slice, chartType) => {
  const _chb = slice.activeContChb;

  if (_chb && _chb.chartType === chartType) {
    _chb.setUnchecked();

    _unsetActiveContCheckBox(slice);
  }
};

exports.uncheckActiveContCheckBox = uncheckActiveContCheckBox;
//# sourceMappingURL=ContCheckBoxLogicFn.js.map