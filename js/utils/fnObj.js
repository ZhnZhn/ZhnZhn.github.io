"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var fnObj = {
  findInPropArrayByProp: function findInPropArrayByProp(propArrName, propName) {
    return function (obj, propValue) {
      return obj[propArrName].find(function (item) {
        return item[propName] === propValue;
      });
    };
  }
};
var _default = fnObj;
exports["default"] = _default;
//# sourceMappingURL=fnObj.js.map