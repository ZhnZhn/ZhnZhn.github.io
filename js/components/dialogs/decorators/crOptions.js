"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _isArr = Array.isArray;

var _crCvItems = function _crCvItems(arr) {
  return arr.map(function (_ref) {
    var c = _ref.c,
        v = _ref.v,
        restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["c", "v"]);
    return (0, _extends2["default"])({
      c: c + " (" + v + ")",
      v: v
    }, restProps);
  });
};

var _crSItems = function _crSItems(arr) {
  return arr.map(function (_ref2) {
    var c = _ref2.c,
        v = _ref2.v,
        s = _ref2.s;
    return {
      c: c + " (" + s + ")",
      v: v,
      s: s
    };
  });
};

var _crNbqItems = function _crNbqItems(arr) {
  var items = [];
  arr.forEach(function (_ref3) {
    var n = _ref3.n,
        b = _ref3.b,
        q = _ref3.q;

    if (_isArr(q)) {
      q.forEach(function (to) {
        var s = b + "/" + to;
        items.push({
          c: n + " (" + s + ")",
          s: s
        });
      });
    }
  });
  return items;
};

var REG_BLANKS = /\s/g;

var _crCpItems = function _crCpItems(arr) {
  return arr.map(function (_ref4) {
    var c = _ref4.c,
        v = _ref4.v,
        id = _ref4.id;
    return {
      c: c + " (" + v + ")",
      v: id || (v + "-" + (c || '').replace(REG_BLANKS, '-')).toLowerCase()
    };
  });
};

var _crItems = function _crItems(json, optionJsonProp) {
  var _arr = json[optionJsonProp];

  if (json.isCv) {
    return _crCvItems(_arr);
  }

  if (json.isNbq) {
    return _crNbqItems(_arr);
  }

  if (json.isCp) {
    return _crCpItems(_arr);
  }

  return _arr[0] && _arr[0].s != null ? _crSItems(_arr) : _arr;
};

var _notNullOrUndef = function _notNullOrUndef(v) {
  return v != null;
};

var _crPropCaption = function _crPropCaption(arr) {
  if (!_isArr(arr) || arr.length === 0) {
    return;
  }

  var _items = arr[0];

  if (_notNullOrUndef(_items.caption)) {
    return;
  }

  if (_notNullOrUndef(_items.c)) {
    return 'c';
  }
};

var crOptions = function crOptions(json, optionJsonProp) {
  var items = _crItems(json, optionJsonProp),
      propCaption = _crPropCaption(items);

  return {
    items: items,
    propCaption: propCaption
  };
};

var _default = crOptions;
exports["default"] = _default;
//# sourceMappingURL=crOptions.js.map