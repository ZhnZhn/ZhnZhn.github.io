"use strict";

exports.__esModule = true;
exports.default = void 0;

const factoryFindInPropArrayByProp = (propArrName, propName) => (obj, propValue) => obj[propArrName].find(item => item[propName] === propValue);

var _default = factoryFindInPropArrayByProp;
exports.default = _default;
//# sourceMappingURL=factoryFindInPropArrayByProp.js.map