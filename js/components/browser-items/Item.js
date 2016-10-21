'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var caption = props.caption;
  var className = props.className;
  var item = props.item;
  var onClickItem = props.onClickItem;
  var children = props.children;

  return _react2.default.createElement(
    'div',
    {
      className: className,
      style: STYLE.ITEM_DIV,
      onClick: onClickItem.bind(null, item)
    },
    _react2.default.createElement(
      'span',
      { style: STYLE.ITEM_SPAN },
      caption
    ),
    children
  );
};

exports.default = Item;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-items\Item.js.map