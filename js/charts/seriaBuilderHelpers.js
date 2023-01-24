"use strict";

exports.__esModule = true;
exports.crLegendItem = exports.addSeriesImpl = void 0;
const crLegendItem = _ref => {
  let {
    index,
    color,
    name = '',
    is = false
  } = _ref;
  return {
    index,
    color,
    name,
    isVisible: is
  };
};
exports.crLegendItem = crLegendItem;
const addSeriesImpl = (to, series) => {
  const _legend = [];
  series.forEach((seria, index) => {
    const {
      color,
      zhValueText,
      name,
      visible
    } = seria;
    to.push(seria);
    _legend.push(crLegendItem({
      index,
      color,
      name: zhValueText || name,
      is: visible
    }));
  });
  return _legend;
};
exports.addSeriesImpl = addSeriesImpl;
//# sourceMappingURL=seriaBuilderHelpers.js.map