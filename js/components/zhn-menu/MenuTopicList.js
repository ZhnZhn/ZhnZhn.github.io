"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _MenuTopic = _interopRequireDefault(require("./MenuTopic"));
var _jsxRuntime = require("react/jsx-runtime");
const MenuTopicList = _ref => {
  let {
    menu,
    refFirstItem
  } = _ref;
  return (menu || []).map((menuTopicProps, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuTopic.default, {
    ...menuTopicProps,
    refFirstItem: index === 0 ? refFirstItem : void 0
  }, index));
};
var _default = MenuTopicList;
exports.default = _default;
//# sourceMappingURL=MenuTopicList.js.map