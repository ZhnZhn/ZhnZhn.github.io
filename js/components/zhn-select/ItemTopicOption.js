"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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
  return _react["default"].createElement("div", null, _react["default"].createElement(_ItemOption["default"], props), _react["default"].createElement("div", {
    style: S.TOPIC
  }, item.topic));
};

var _default = ItemTopicOption;
exports["default"] = _default;
//# sourceMappingURL=ItemTopicOption.js.map