"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _MenuTopic = _interopRequireDefault(require("./MenuTopic"));
var _jsxRuntime = require("react/jsx-runtime");
const MenuTopicList = props => (0, _uiApi.safeMap)(props.menu, (menuTopicProps, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTopic.default, {
  ...menuTopicProps,
  itemStyle: props.itemStyle,
  topicStyle: props.topicStyle,
  refFirstItem: index === 0 ? props.refFirstItem : void 0
}, index));
var _default = exports.default = MenuTopicList;
//# sourceMappingURL=MenuTopicList.js.map