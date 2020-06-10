"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _crItems = function _crItems(json, optionJsonProp) {
  var _arr = json[optionJsonProp];
  return _arr[0] && _arr[0].s != null ? _arr.map(function (_ref) {
    var c = _ref.c,
        v = _ref.v,
        s = _ref.s;
    return {
      c: c + " (" + s + ")",
      v: v,
      s: s
    };
  }) : _arr;
};

var _notNullOrUndef = function _notNullOrUndef(v) {
  return v != null;
};

var _crPropCaption = function _crPropCaption(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
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