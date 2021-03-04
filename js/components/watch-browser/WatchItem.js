"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

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
var EMPTY_ITEM_CAPTION = 'Not Found'; //onClick={ComponentActions.showModalDialog.bind(null, ModalDialog.LOAD_ITEM, item)}

var WatchItem = function WatchItem(_ref) {
  var item = _ref.item,
      className = _ref.className,
      isModeEdit = _ref.isModeEdit,
      option = _ref.option,
      onClick = _ref.onClick,
      onClose = _ref.onClose,
      onDragStart = _ref.onDragStart,
      onDragEnter = _ref.onDragEnter,
      onDragOver = _ref.onDragOver,
      onDragLeave = _ref.onDragLeave,
      onDrop = _ref.onDrop;

  var _ref2 = item || {},
      _ref2$caption = _ref2.caption,
      caption = _ref2$caption === void 0 ? EMPTY_ITEM_CAPTION : _ref2$caption,
      _btClose = isModeEdit ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose["default"], {
    style: S.SVG_CLOSE,
    onClose: onClose.bind(null, option)
  }) : null,
      _hClick = (0, _react.useCallback)(function () {
    return onClick(item);
  }, [item]),
      _hKeyUp = (0, _react.useCallback)(function (evt) {
    if ((0, _isKeyEnter["default"])(evt)) {
      _hClick();
    }
  }, [_hClick]),
      _dndOptions = isModeEdit ? {
    draggable: true,
    onDragStart: onDragStart.bind(null, option),
    onDrop: onDrop.bind(null, option),
    onDragOver: onDragOver,
    onDragEnter: onDragEnter,
    onDragLeave: onDragLeave
  } : void 0;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", (0, _extends2["default"])({
    role: "menuitem",
    tabIndex: "0",
    className: className,
    style: S.ITEM_DIV,
    onClick: _hClick
  }, _dndOptions, {
    onKeyUp: _hKeyUp,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: S.ITEM_SPAN,
      children: caption
    }), _btClose]
  }));
};

var _default = WatchItem;
exports["default"] = _default;
//# sourceMappingURL=WatchItem.js.map