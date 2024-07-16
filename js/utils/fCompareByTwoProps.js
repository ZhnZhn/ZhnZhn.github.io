"use strict";

exports.__esModule = true;
exports.default = void 0;
const fCompareByTwoProps = (propName1, propName2) => (a, b) => a[propName1] < b[propName1] ? -1 : a[propName1] > b[propName1] ? 1 : a[propName2] < b[propName2] ? -1 : a[propName2] > b[propName2] ? 1 : 0;
var _default = exports.default = fCompareByTwoProps;
//# sourceMappingURL=fCompareByTwoProps.js.map