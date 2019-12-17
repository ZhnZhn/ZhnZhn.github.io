"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var S = {
  LOAD: {
    color: '#607D8B'
  },
  SHOW: {
    color: 'rgb(35, 47, 59)'
  }
};

var Load = function Load(_ref) {
  var onClick = _ref.onClick;
  return _react["default"].createElement(_FlatButton["default"], {
    rootStyle: S.LOAD,
    caption: "Load",
    title: "Load Item to Pane Container" //accessKey="l"
    ,
    onClick: onClick
  });
};

var Show = function Show(_ref2) {
  var onClick = _ref2.onClick;
  return _react["default"].createElement(_FlatButton["default"], {
    rootStyle: S.SHOW,
    caption: "Show",
    title: "Show Pane Container" //accessKey="s"
    ,
    onClick: onClick
  });
};

var _default = {
  Load: Load,
  Show: Show,
  Flat: _FlatButton["default"]
};
exports["default"] = _default;
//# sourceMappingURL=Button.js.map