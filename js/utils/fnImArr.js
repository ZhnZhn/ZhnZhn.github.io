"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnImArr = {
  push: function push(arr, obj) {
    return arr ? [].concat((0, _toConsumableArray3.default)(arr), [Object.assign({}, obj)]) : [Object.assign({}, obj)];
  },


  filterByPropFn: function filterByPropFn(propName) {
    return function (arr, propValue) {
      return arr.filter(function (obj) {
        return obj[propName] !== propValue;
      });
    };
  },

  insertItem: function insertItem(item, index) {
    var arr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    return [].concat((0, _toConsumableArray3.default)(arr.slice(0, index)), [Object.assign({}, item)], (0, _toConsumableArray3.default)(arr.slice(index)));
  },


  editByPropFn: function editByPropFn(propName) {
    return function (arr, index, propValue) {
      return [].concat((0, _toConsumableArray3.default)(arr.slice(0, index)), [Object.assign({}, arr[index], (0, _defineProperty3.default)({}, propName, propValue))], (0, _toConsumableArray3.default)(arr.slice(index + 1)));
    };
  }

};

exports.default = fnImArr;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\utils\fnImArr.js.map