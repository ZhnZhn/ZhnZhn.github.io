'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgClose = require('../zhn/SvgClose');

var _SvgClose2 = _interopRequireDefault(_SvgClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ITEM_DIV: {
    position: 'relative',
    paddingRight: '40px',
    lineHeight: 1.4,
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  ITEM_SPAN: {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '100%',
    maxWidth: '250px',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },

  SVG_CLOSE: {
    position: 'absolute',
    right: 0
  }

};

var WatchItem = function WatchItem(props) {
  var item = props.item,
      className = props.className,
      isModeEdit = props.isModeEdit,
      option = props.option,
      onClick = props.onClick,
      onClose = props.onClose,
      onDragStart = props.onDragStart,
      onDragEnter = props.onDragEnter,
      onDragOver = props.onDragOver,
      onDragLeave = props.onDragLeave,
      onDrop = props.onDrop,
      caption = item.caption,
      _btClose = isModeEdit ? _react2.default.createElement(_SvgClose2.default, {
    style: STYLE.SVG_CLOSE,
    onClose: onClose.bind(null, option)
  }) : null;

  return _react2.default.createElement(
    'div',
    {
      className: className,
      style: STYLE.ITEM_DIV,
      onClick: onClick.bind(null, item)
      //onClick={ComponentActions.showModalDialog.bind(null, ModalDialog.LOAD_ITEM, item)}
      , draggable: isModeEdit,
      onDragStart: isModeEdit ? onDragStart.bind(null, option) : void 0,
      onDrop: isModeEdit ? onDrop.bind(null, option) : void 0,
      onDragOver: isModeEdit ? onDragOver : void 0,
      onDragEnter: isModeEdit ? onDragEnter : void 0,
      onDragLeave: isModeEdit ? onDragLeave : void 0
    },
    _react2.default.createElement(
      'span',
      { style: STYLE.ITEM_SPAN },
      caption
    ),
    _btClose
  );
};

exports.default = WatchItem;
//# sourceMappingURL=WatchItem.js.map