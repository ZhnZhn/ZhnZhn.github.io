"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ObjUtil = {

  findInPropArrayByProp: function findInPropArrayByProp(propArrName, propName) {
    return function (obj, propValue) {
      return obj[propArrName].find(function (item, index) {
        return item[propName] === propValue;
      });
    };
  }

};

exports.default = ObjUtil;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\ObjUtil.js.map