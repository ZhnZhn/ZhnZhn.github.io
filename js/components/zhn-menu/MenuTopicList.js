"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _MenuTopic = _interopRequireDefault(require("./MenuTopic"));
var _jsxRuntime = require("react/jsx-runtime");
const MenuTopicList = _ref => {
  let {
    refFirstItem,
    menu,
    itemStyle,
    topicStyle
  } = _ref;
  return (0, _uiApi.safeMap)(menu, (menuTopicProps, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTopic.default, {
    ...menuTopicProps,
    itemStyle: itemStyle,
    topicStyle: topicStyle,
    refFirstItem: index === 0 ? refFirstItem : void 0
  }, index));
};
var _default = exports.default = MenuTopicList;
//# sourceMappingURL=MenuTopicList.js.map