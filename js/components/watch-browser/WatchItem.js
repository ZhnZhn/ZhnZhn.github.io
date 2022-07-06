"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _isKeyEnter = _interopRequireDefault(require("../zhn/isKeyEnter"));

var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));

var _DivEllipsis = _interopRequireDefault(require("../zhn/DivEllipsis"));

var _jsxRuntime = require("react/jsx-runtime");

const S_ITEM_DIV = {
  position: 'relative',
  paddingRight: 40,
  paddingTop: 5,
  paddingBottom: 5
},
      S_CAPTION = {
  width: '100%',
  maxWidth: 250,
  height: 28,
  verticalAlign: 'middle'
},
      S_SVG_CLOSE = {
  position: 'absolute',
  top: 10,
  right: 0
};
const EMPTY_ITEM_CAPTION = 'Not Found'; //onClick={ComponentActions.showModalDialog.bind(null, ModalDialog.LOAD_ITEM, item)}

const WatchItem = _ref => {
  let {
    item,
    className,
    isModeEdit,
    option,
    onClick,
    onClose,
    onDragStart,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop
  } = _ref;

  const {
    caption = EMPTY_ITEM_CAPTION
  } = item || {},
        _btClose = isModeEdit ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose.default, {
    style: S_SVG_CLOSE,
    onClose: onClose.bind(null, option)
  }) : null
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hClick = (0, _react.useCallback)(() => onClick(item), [item]) //onClick

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _hKeyUp = (0, _react.useCallback)(evt => {
    if ((0, _isKeyEnter.default)(evt)) {
      _hClick();
    }
  }, [_hClick]),
        _dndOptions = isModeEdit ? {
    draggable: true,
    onDragStart: onDragStart.bind(null, option),
    onDrop: onDrop.bind(null, option),
    onDragOver,
    onDragEnter,
    onDragLeave
  } : void 0;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    role: "menuitem",
    tabIndex: "0",
    className: className,
    style: S_ITEM_DIV,
    onClick: _hClick,
    ..._dndOptions,
    onKeyUp: _hKeyUp,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
      style: S_CAPTION,
      text: caption
    }), _btClose]
  });
};

var _default = WatchItem;
exports.default = _default;
//# sourceMappingURL=WatchItem.js.map