"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S.PERIOD_BTS,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Button.Flat, {
      rootStyle: S.BT,
      caption: "1M",
      onClick: onZoom1M
    }, "1M"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Button.Flat, {
      rootStyle: S.BT,
      caption: "3M",
      onClick: onZoom3M
    }, "3M"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Button.Flat, {
      rootStyle: S.BT,
      caption: "6M",
      onClick: onZoom6M
    }, "6M"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Button.Flat, {
      rootStyle: S.BT,
      caption: "YTD",
      onClick: onZoomYTD
    }, "YTD"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Button.Flat, {
      rootStyle: S.BT,
      caption: "1Y",
      onClick: onZoom1Y
    }, "1Y")]
  });
};

var _default = ZoomDailyRow;
exports["default"] = _default;
//# sourceMappingURL=ZoomDailyRow.js.map