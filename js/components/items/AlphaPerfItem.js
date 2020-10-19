"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TableItem["default"], {
      thMoreStyle: S.TH_MORE,
      config: config.m,
      onCloseItem: onCloseItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TableItem["default"], {
      thMoreStyle: S.TH_MORE,
      config: config.y,
      onCloseItem: onCloseItem
    })]
  });
};

var _default = AlphaPerfItem;
exports["default"] = _default;
//# sourceMappingURL=AlphaPerfItem.js.map