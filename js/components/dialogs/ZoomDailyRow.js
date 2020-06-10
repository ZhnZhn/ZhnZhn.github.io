"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var S = {
  PERIOD_BTS: {
    paddingTop: 8,
    paddingLeft: 8
  },
  BT: {
    color: '#1b2836'
  }
};

var ZoomDailyRow = function ZoomDailyRow(_ref) {
  var onZoom1M = _ref.onZoom1M,
      onZoom3M = _ref.onZoom3M,
      onZoom6M = _ref.onZoom6M,
      onZoomYTD = _ref.onZoomYTD,
      onZoom1Y = _ref.onZoom1Y;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: S.PERIOD_BTS
  }, /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].Button.Flat, {
    rootStyle: S.BT,
    key: "1M",
    caption: "1M",
    onClick: onZoom1M
  }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].Button.Flat, {
    rootStyle: S.BT,
    key: "3M",
    caption: "3M",
    onClick: onZoom3M
  }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].Button.Flat, {
    rootStyle: S.BT,
    key: "6M",
    caption: "6M",
    onClick: onZoom6M
  }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].Button.Flat, {
    rootStyle: S.BT,
    key: "YTD",
    caption: "YTD",
    onClick: onZoomYTD
  }), /*#__PURE__*/_react["default"].createElement(_DialogCell["default"].Button.Flat, {
    rootStyle: S.BT,
    key: "1Y",
    caption: "1Y",
    onClick: onZoom1Y
  }));
};

var _default = ZoomDailyRow;
exports["default"] = _default;
//# sourceMappingURL=ZoomDailyRow.js.map