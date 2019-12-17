"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var STYLE = {
  ITEM_DIV: {
    position: 'relative',
    minWidth: '350px',
    paddingRight: '10px',
    lineHeight: 1.4,
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  ITEM_SPAN: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '100%',
    //maxWidth: '250px',
    //direction: "ltr",
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};

var Item = function Item(props) {
  var caption = props.caption,
      className = props.className,
      item = props.item,
      onClickItem = props.onClickItem,
      children = props.children;
  return _react["default"].createElement("div", {
    className: className,
    style: STYLE.ITEM_DIV,
    onClick: onClickItem.bind(null, item)
  }, _react["default"].createElement("span", {
    style: STYLE.ITEM_SPAN
  }, caption), children);
};

var _default = Item;
exports["default"] = _default;
//# sourceMappingURL=Item.js.map