"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var fCompareByTwoProps = function fCompareByTwoProps(propName1, propName2) {
  return function (a, b) {
    if (a[propName1] < b[propName1]) {
      return -1;
    } else if (a[propName1] > b[propName1]) {
      return 1;
    } else if (a[propName2] < b[propName2]) {
      return -1;
    } else if (a[propName2] > b[propName2]) {
      return 1;
    } else return 0;
  };
};

var _default = fCompareByTwoProps;
exports["default"] = _default;
//# sourceMappingURL=fCompareByTwoProps.js.map