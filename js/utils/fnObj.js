"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fnObj = {

  findInPropArrayByProp: function findInPropArrayByProp(propArrName, propName) {
    return function (obj, propValue) {
      return obj[propArrName].find(function (item) {
        return item[propName] === propValue;
      });
    };
  }

};

exports.default = fnObj;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\fnObj.js.map