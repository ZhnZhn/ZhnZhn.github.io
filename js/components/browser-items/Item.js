"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _isKeyEnter = _interopRequireDefault(require("../zhn/isKeyEnter"));

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
  var _hKeyDown = (0, _react.useCallback)(function (evt) {
    if ((0, _isKeyEnter["default"])(evt)) {
      onClickItem(item);
    }
  }, []);
  /*eslint-enable react-hooks/exhaustive-deps*/


  return _react["default"].createElement("div", {
    role: "menuitem",
    tabIndex: "0",
    className: className,
    style: S.ITEM_DIV,
    onClick: onClickItem.bind(null, item),
    onKeyDown: _hKeyDown
  }, _react["default"].createElement("span", {
    style: S.ITEM_SPAN
  }, caption), children);
};

var _default = Item;
exports["default"] = _default;
//# sourceMappingURL=Item.js.map