"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _assign = Object.assign,
    _isArr = Array.isArray;
var fnImArr = {
  push: function push(arr, obj) {
    return _isArr(arr) ? [].concat(arr, [_assign({}, obj)]) : [_assign({}, obj)];
  },
  filterByPropFn: function filterByPropFn(propName) {
    return function (arr, propValue) {
      return arr.filter(function (obj) {
        return obj[propName] !== propValue;
      });
    };
  },
  insertItem: function insertItem(item, index, arr) {
    return _isArr(arr) ? [].concat(arr.slice(0, index), [_assign({}, item)], arr.slice(index)) : [_assign({}, item)];
  },
  editByPropFn: function editByPropFn(propName) {
    return function (arr, index, propValue) {
      var _assign2;

      return [].concat(arr.slice(0, index), [_assign({}, arr[index], (_assign2 = {}, _assign2[propName] = propValue, _assign2))], arr.slice(index + 1));
    };
  }
};
var _default = fnImArr;
exports["default"] = _default;
//# sourceMappingURL=fnImArr.js.map