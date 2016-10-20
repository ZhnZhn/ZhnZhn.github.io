'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ITEM_DIV: {
    position: 'relative',
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

var _handlerClickItem = function _handlerClickItem(item, modalDialogType) {
  _ComponentActions2.default.showModalDialog(modalDialogType, item);
};

var Item = function Item(_ref) {
  var caption = _ref.caption;
  var className = _ref.className;
  var item = _ref.item;
  var modalDialogType = _ref.modalDialogType;
  var children = _ref.children;

  return _react2.default.createElement(
    'div',
    {
      className: className,
      style: STYLE.ITEM_DIV,
      onClick: _handlerClickItem.bind(null, item, modalDialogType)
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