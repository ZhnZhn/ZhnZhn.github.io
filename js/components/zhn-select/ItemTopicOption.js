"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ItemOption = _interopRequireDefault(require("./ItemOption"));

var _jsxRuntime = require("react/jsx-runtime");

const S_TOPIC = {
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#a487d4'
};

const ItemTopicOption = props => {
  const {
    item
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemOption.default, { ...props
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: S_TOPIC,
      children: item.topic
    })]
  });
};

var _default = ItemTopicOption;
exports.default = _default;
//# sourceMappingURL=ItemTopicOption.js.map