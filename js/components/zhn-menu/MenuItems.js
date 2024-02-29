"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _MenuTopic = _interopRequireDefault(require("./MenuTopic"));
var _MenuItem = _interopRequireDefault(require("./MenuItem"));
var _react = require("react");
const S_MP_LEVEL_2 = {
    paddingLeft: 6
  },
  COLOR_OPEN = "#80c040";
const MenuItems = _ref => {
  let {
    items,
    itemStyle
  } = _ref;
  return (0, _uiApi.safeMap)(items, (item, index) => (0, _uiApi.isArr)(item.items) ? /*#__PURE__*/(0, _react.createElement)(_MenuTopic.default, {
    ...item,
    key: index,
    style: S_MP_LEVEL_2,
    openColor: COLOR_OPEN,
    topicStyle: itemStyle
  }) : /*#__PURE__*/(0, _react.createElement)(_MenuItem.default, {
    ...item,
    style: itemStyle,
    key: index
  }));
};
var _default = exports.default = MenuItems;
//# sourceMappingURL=MenuItems.js.map