"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _MenuTopic = _interopRequireDefault(require("./MenuTopic"));
var _MenuItem = _interopRequireDefault(require("./MenuItem"));
var _jsxRuntime = require("react/jsx-runtime");
const S_MP_LEVEL_2 = {
    paddingLeft: 6
  },
  COLOR_OPEN = "#80c040";
const MenuItems = props => (0, _uiApi.safeMap)(props.items, (item, index) => (0, _uiApi.isArr)(item.items) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTopic.default, {
  ...item,
  style: S_MP_LEVEL_2,
  openColor: COLOR_OPEN,
  itemStyle: props.itemStyle,
  topicStyle: props.topicStyle
}, index) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuItem.default, {
  ...item,
  style: props.itemStyle
}, index));
var _default = exports.default = MenuItems;
//# sourceMappingURL=MenuItems.js.map