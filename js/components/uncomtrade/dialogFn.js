"use strict";

exports.__esModule = true;
exports.crInputSelectDfProps = void 0;
var _getPropertyFn = require("../../utils/getPropertyFn");
const crInputSelectDfProps = function (options, dfItemIndex) {
  if (dfItemIndex === void 0) {
    dfItemIndex = 0;
  }
  const dfItem = options[dfItemIndex];
  return [dfItem, `Default: ${(0, _getPropertyFn.getC)(dfItem)}`];
};
exports.crInputSelectDfProps = crInputSelectDfProps;
//# sourceMappingURL=dialogFn.js.map