"use strict";

exports.__esModule = true;
exports.crInputSelectDfProps = void 0;
const _crInpuSelectPlaceholder = item => "Default: " + item.c;
const crInputSelectDfProps = function (options, dfItemIndex) {
  if (dfItemIndex === void 0) {
    dfItemIndex = 0;
  }
  const dfItems = options[dfItemIndex];
  return [dfItems, _crInpuSelectPlaceholder(dfItems)];
};
exports.crInputSelectDfProps = crInputSelectDfProps;
//# sourceMappingURL=dialogFn.js.map