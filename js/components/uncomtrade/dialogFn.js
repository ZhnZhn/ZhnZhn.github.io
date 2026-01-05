"use strict";

exports.__esModule = true;
exports.crInputSelectDfProps = void 0;
var _itemFn = require("../../utils/itemFn");
const crInputSelectDfProps = function (options, dfItemIndex) {
  if (dfItemIndex === void 0) {
    dfItemIndex = 0;
  }
  const dfItem = options[dfItemIndex];
  return [dfItem, `Default: ${(0, _itemFn.getCaption)(dfItem)}`];
};
exports.crInputSelectDfProps = crInputSelectDfProps;
//# sourceMappingURL=dialogFn.js.map