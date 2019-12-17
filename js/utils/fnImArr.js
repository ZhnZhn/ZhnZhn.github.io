"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var fnImArr = {
  push: function push(arr, obj) {
    return arr ? [].concat(arr, [Object.assign({}, obj)]) : [Object.assign({}, obj)];
  },
  filterByPropFn: function filterByPropFn(propName) {
    return function (arr, propValue) {
      return arr.filter(function (obj) {
        return obj[propName] !== propValue;
      });
    };
  },
  insertItem: function insertItem(item, index, arr) {
    if (arr === void 0) {
      arr = [];
    }

    return [].concat(arr.slice(0, index), [Object.assign({}, item)], arr.slice(index));
  },
  editByPropFn: function editByPropFn(propName) {
    return function (arr, index, propValue) {
      var _Object$assign;

      return [].concat(arr.slice(0, index), [Object.assign({}, arr[index], (_Object$assign = {}, _Object$assign[propName] = propValue, _Object$assign))], arr.slice(index + 1));
    };
  }
};
var _default = fnImArr;
exports["default"] = _default;
//# sourceMappingURL=fnImArr.js.map