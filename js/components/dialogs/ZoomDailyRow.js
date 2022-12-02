"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _jsxRuntime = require("react/jsx-runtime");

const S_PERIOD_BTS = {
  paddingTop: 8,
  paddingLeft: 8
},
      S_BT = {
  color: '#1b2836'
};

const ZoomDailyRow = _ref => {
  let {
    onZoom1M,
    onZoom3M,
    onZoom6M,
    onZoomYTD,
    onZoom1Y
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_PERIOD_BTS,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      style: S_BT,
      caption: "1M",
      onClick: onZoom1M
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      style: S_BT,
      caption: "3M",
      onClick: onZoom3M
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      style: S_BT,
      caption: "6M",
      onClick: onZoom6M
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      style: S_BT,
      caption: "YTD",
      onClick: onZoomYTD
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      style: S_BT,
      caption: "1Y",
      onClick: onZoom1Y
    })]
  });
};

var _default = ZoomDailyRow;
exports.default = _default;
//# sourceMappingURL=ZoomDailyRow.js.map