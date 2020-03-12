"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _isKeyEnter = _interopRequireDefault(require("./isKeyEnter"));

var _LabelNew = _interopRequireDefault(require("./LabelNew"));

var _MenuBadge = _interopRequireDefault(require("./MenuBadge"));

var CL_ROW = "row__topic not-selected";

var _hKeyDown = function _hKeyDown(onClick, event) {
  if ((0, _isKeyEnter["default"])(event)) {
    onClick();
  }
};

var MenuItems = function MenuItems(_ref) {
  var items = _ref.items;
  return items.map(function (item, index) {
    var title = item.title,
        counter = item.counter,
        isNew = item.isNew,
        onClick = item.onClick;
    return _react["default"].createElement("div", {
      key: index,
      className: CL_ROW,
      onClick: onClick,
      tabIndex: "0",
      role: "menuitem",
      onKeyDown: _hKeyDown.bind(null, onClick)
    }, title, counter !== 0 ? _react["default"].createElement(_MenuBadge["default"], {
      counter: counter,
      isOpen: item.isOpen,
      onClick: item.onBadgeClick,
      onBadgeClose: item.onBadgeClose
    }) : null, isNew ? _react["default"].createElement(_LabelNew["default"], null) : null);
  });
};

var _default = MenuItems;
exports["default"] = _default;
//# sourceMappingURL=MenuItems.js.map