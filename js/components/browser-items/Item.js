"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useKeyEnter = _interopRequireDefault(require("../hooks/useKeyEnter"));

var S = {
  ITEM_DIV: {
    position: 'relative',
    minWidth: 350,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    lineHeight: 1.4
  },
  ITEM_SPAN: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};

var Item = function Item(_ref) {
  var caption = _ref.caption,
      className = _ref.className,
      item = _ref.item,
      onClickItem = _ref.onClickItem,
      children = _ref.children;

  /*eslint-disable react-hooks/exhaustive-deps*/
  var _hClick = (0, _react.useCallback)(function () {
    return onClickItem(item);
  }, []);
  /*eslint-enable react-hooks/exhaustive-deps*/


  var _hKeyDown = (0, _useKeyEnter["default"])(_hClick);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    role: "menuitem",
    tabIndex: "0",
    className: className,
    style: S.ITEM_DIV,
    onClick: _hClick,
    onKeyDown: _hKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S.ITEM_SPAN,
      children: caption
    }), children]
  });
};

var _default = Item;
exports["default"] = _default;
//# sourceMappingURL=Item.js.map