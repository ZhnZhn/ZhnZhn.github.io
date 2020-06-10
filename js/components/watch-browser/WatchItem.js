"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _isKeyEnter = _interopRequireDefault(require("../zhn/isKeyEnter"));

var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));

var S = {
  ITEM_DIV: {
    position: 'relative',
    paddingRight: 40,
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
    top: 10,
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
      _btClose = isModeEdit ? /*#__PURE__*/_react["default"].createElement(_SvgClose["default"], {
    style: S.SVG_CLOSE,
    onClose: onClose.bind(null, option)
  }) : null,
      _hClick = (0, _react.useCallback)(function () {
    //onClick={ComponentActions.showModalDialog.bind(null, ModalDialog.LOAD_ITEM, item)}
    onClick(item);
  }, [item]),
      _hKeyUp = (0, _react.useCallback)(function (evt) {
    if ((0, _isKeyEnter["default"])(evt)) {
      onClick(item);
    }
  }, [item]),
      _dndOptions = isModeEdit ? {
    draggable: true,
    onDragStart: onDragStart.bind(null, option),
    onDrop: onDrop.bind(null, option),
    onDragOver: onDragOver,
    onDragEnter: onDragEnter,
    onDragLeave: onDragLeave
  } : void 0;

  return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
    role: "menuitem",
    tabIndex: "0",
    className: className,
    style: S.ITEM_DIV,
    onClick: _hClick
  }, _dndOptions, {
    onKeyUp: _hKeyUp
  }), /*#__PURE__*/_react["default"].createElement("span", {
    style: S.ITEM_SPAN
  }, caption), _btClose);
};

var _default = WatchItem;
exports["default"] = _default;
//# sourceMappingURL=WatchItem.js.map