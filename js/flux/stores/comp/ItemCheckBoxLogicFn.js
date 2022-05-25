"use strict";

exports.__esModule = true;
exports.uncheckActiveItemCheckBox = exports.toggleItemCheckBox = void 0;

const toggleItemCheckBox = (slice, _ref) => {
  let {
    isCheck,
    checkBox,
    chart
  } = _ref;

  if (isCheck) {
    const activeCheckbox = slice.activeCheckbox;

    if (activeCheckbox && activeCheckbox !== checkBox) {
      activeCheckbox.setUnchecked();
    }

    slice.activeCheckbox = checkBox;
    slice.activeChart = chart;
  } else {
    slice.activeCheckbox = null;
    slice.activeChart = null;
  }
};

exports.toggleItemCheckBox = toggleItemCheckBox;

const uncheckActiveItemCheckBox = (slice, chartType) => {
  const activeCheckbox = slice.activeCheckbox;

  if (activeCheckbox && (!chartType || activeCheckbox.chartType === chartType)) {
    activeCheckbox.setUnchecked();
    slice.activeCheckbox = null;
    slice.activeChart = null;
  }
};

exports.uncheckActiveItemCheckBox = uncheckActiveItemCheckBox;
//# sourceMappingURL=ItemCheckBoxLogicFn.js.map