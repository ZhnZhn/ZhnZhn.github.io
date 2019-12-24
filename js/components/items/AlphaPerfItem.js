"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _TableItem = _interopRequireDefault(require("./TableItem"));

var S = {
  TH_MORE: {
    paddingLeft: 12,
    textAlign: 'left'
  }
};

var AlphaPerfItem = function AlphaPerfItem(_ref) {
  var config = _ref.config,
      onCloseItem = _ref.onCloseItem;
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_TableItem["default"], {
    thMoreStyle: S.TH_MORE,
    config: config.m,
    onCloseItem: onCloseItem
  }), _react["default"].createElement(_TableItem["default"], {
    thMoreStyle: S.TH_MORE,
    config: config.y,
    onCloseItem: onCloseItem
  }));
};

var _default = AlphaPerfItem;
exports["default"] = _default;
//# sourceMappingURL=AlphaPerfItem.js.map