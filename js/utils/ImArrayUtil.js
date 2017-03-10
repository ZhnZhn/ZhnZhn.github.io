"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImArrayUtil = {
  push: function push(arr, obj) {
    return arr ? [].concat((0, _toConsumableArray3.default)(arr), [obj]) : [obj];
  },
  filterByProp: function filterByProp(prop, arr, value) {
    return arr.filter(function (obj, index) {
      return obj[prop] !== value;
    });
  },
  insertItem: function insertItem(item, index) {
    var arr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (index !== 0) {
      return [].concat((0, _toConsumableArray3.default)(arr.slice(0, index)), [Object.assign({}, item)], (0, _toConsumableArray3.default)(arr.slice(index)));
    } else {
      return [Object.assign({}, item)].concat((0, _toConsumableArray3.default)(arr));
    }
  }
};

exports.default = ImArrayUtil;
//# sourceMappingURL=ImArrayUtil.js.map