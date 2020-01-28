"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));

var STYLE = {
  ITEM_DIV: {
    position: 'relative',
    paddingRight: 40,
    //lineHeight : 1.4,
    paddingTop: 5,
    paddingBottom: 5
  },
  ITEM_SPAN: {
    display: 'inline-block',
    width: '100%',
    maxWidth: 250,
    height: 28,
    verticalAlign: 'middle',
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
      _btClose = isModeEdit ? _react["default"].createElement(_SvgClose["default"], {
    style: STYLE.SVG_CLOSE,
    onClose: onClose.bind(null, option)
  }) : null;

  return _react["default"].createElement("div", {
    className: className,
    style: STYLE.ITEM_DIV,
    onClick: onClick.bind(null, item) //onClick={ComponentActions.showModalDialog.bind(null, ModalDialog.LOAD_ITEM, item)}
    ,
    draggable: isModeEdit,
    onDragStart: isModeEdit ? onDragStart.bind(null, option) : void 0,
    onDrop: isModeEdit ? onDrop.bind(null, option) : void 0,
    onDragOver: isModeEdit ? onDragOver : void 0,
    onDragEnter: isModeEdit ? onDragEnter : void 0,
    onDragLeave: isModeEdit ? onDragLeave : void 0
  }, _react["default"].createElement("span", {
    style: STYLE.ITEM_SPAN
  }, caption), _btClose);
};

var _default = WatchItem;
exports["default"] = _default;
//# sourceMappingURL=WatchItem.js.map