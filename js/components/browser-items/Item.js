"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useKeyEnter = _interopRequireDefault(require("../hooks/useKeyEnter"));

var _EllipsisDiv = _interopRequireDefault(require("../zhn/EllipsisDiv"));

var _jsxRuntime = require("react/jsx-runtime");

const S_ITEM = {
  position: 'relative',
  minWidth: 350,
  padding: '5px 10px 5px 0',
  lineHeight: 1.4
},
      S_CAPTION = {
  verticalAlign: 'middle',
  width: '100%'
};

const Item = _ref => {
  let {
    caption,
    className,
    item,
    onClickItem,
    children
  } = _ref;

  /*eslint-disable react-hooks/exhaustive-deps*/
  const _hClick = (0, _react.useCallback)(() => onClickItem(item), []) //onClickItem, item

  /*eslint-enable react-hooks/exhaustive-deps*/
  ,
        _hKeyDown = (0, _useKeyEnter.default)(_hClick);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    role: "menuitem",
    tabIndex: "0",
    className: className,
    style: S_ITEM,
    onClick: _hClick,
    onKeyDown: _hKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_EllipsisDiv.default, {
      style: S_CAPTION,
      text: caption
    }), children]
  });
};

var _default = Item;
exports.default = _default;
//# sourceMappingURL=Item.js.map