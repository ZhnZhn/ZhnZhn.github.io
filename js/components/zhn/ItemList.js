"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var ItemList = /*#__PURE__*/_react["default"].memo(function (_ref) {
  var items = _ref.items,
      _ref$pnId = _ref.pnId,
      pnId = _ref$pnId === void 0 ? 'id' : _ref$pnId,
      Item = _ref.Item;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, items.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(Item, {
      key: item[pnId],
      item: item
    });
  }));
});

var _default = ItemList;
exports["default"] = _default;
//# sourceMappingURL=ItemList.js.map