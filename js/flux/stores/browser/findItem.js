"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _isArr = Array.isArray;

var _findOrCheckItem = function _findOrCheckItem(item, chartType) {
  if (_isArr(item.items)) {
    for (var _iterator = item.items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var subItem = _ref;

      if (subItem.id === chartType) {
        return subItem;
      }
    }
  } else if (item.id === chartType) {
    return item;
  }
};

var findItem = function findItem(menu, chartType) {
  if (!_isArr(menu)) {
    return;
  }

  for (var _iterator2 = menu, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var topics = _ref2;
    var items = topics.items;

    if (_isArr(items)) {
      for (var _iterator3 = items, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var item = _ref3;

        var _item = _findOrCheckItem(item, chartType);

        if (_item) {
          return _item;
        }
      }
    }
  }
};

var _default = findItem;
exports["default"] = _default;
//# sourceMappingURL=findItem.js.map