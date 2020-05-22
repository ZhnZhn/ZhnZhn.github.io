"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _assign = Object.assign;

var crStyle = function crStyle(arr) {
  var _len = arr.length,
      style = {};

  for (var i = 0; i < _len; i++) {
    var _style = arr[i];

    if (_style) {
      _assign(style, _style);
    }
  }

  return style;
};

var _default = crStyle;
exports["default"] = _default;
//# sourceMappingURL=crStyle.js.map