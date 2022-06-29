"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _MenuTopic = _interopRequireDefault(require("./MenuTopic"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _react = require("react");

const S_MP_LEVEL_2 = {
  paddingLeft: 6
},
      COLOR_OPEN = "#80c040",
      _isArr = Array.isArray;

const MenuItems = _ref => {
  let {
    items
  } = _ref;
  return items.map((item, index) => _isArr(item.items) ? /*#__PURE__*/(0, _react.createElement)(_MenuTopic.default, { ...item,
    key: index,
    style: S_MP_LEVEL_2,
    openColor: COLOR_OPEN
  }) : /*#__PURE__*/(0, _react.createElement)(_MenuItem.default, { ...item,
    key: index
  }));
};

var _default = MenuItems;
exports.default = _default;
//# sourceMappingURL=MenuItems.js.map