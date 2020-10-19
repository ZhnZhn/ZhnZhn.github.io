"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var ItemList = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var items = _ref.items,
      _ref$pnId = _ref.pnId,
      pnId = _ref$pnId === void 0 ? 'id' : _ref$pnId,
      Item = _ref.Item;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: items.map(function (item) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(Item, {
        item: item
      }, item[pnId]);
    })
  });
});
var _default = ItemList;
exports["default"] = _default;
//# sourceMappingURL=ItemList.js.map