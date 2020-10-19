"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _ItemOption = _interopRequireDefault(require("./ItemOption"));

var S = {
  TOPIC: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'rgb(164, 135, 212)'
  }
};

var ItemTopicOption = function ItemTopicOption(props) {
  var item = props.item;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemOption["default"], (0, _extends2["default"])({}, props)), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S.TOPIC,
      children: item.topic
    })]
  });
};

var _default = ItemTopicOption;
exports["default"] = _default;
//# sourceMappingURL=ItemTopicOption.js.map