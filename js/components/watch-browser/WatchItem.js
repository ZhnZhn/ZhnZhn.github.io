"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _isKeyEnter = _interopRequireDefault(require("../zhn/isKeyEnter"));
var _BtSvgX = require("../zhn/BtSvgX");
var _DivEllipsis = _interopRequireDefault(require("../zhn/DivEllipsis"));
var _jsxRuntime = require("react/jsx-runtime");
const S_ITEM_DIV = {
    position: 'relative',
    padding: '5px 40px 5px 0'
  },
  S_CAPTION = {
    width: '100%',
    maxWidth: 250,
    height: 28,
    verticalAlign: 'middle'
  },
  S_SVG_CLOSE = {
    top: 8
  };
const EMPTY_ITEM_CAPTION = 'Not Found';
const WatchItem = _ref => {
  let {
    item,
    className,
    onClick,
    onClose,
    isDraggable,
    dndHandlers,
    option
  } = _ref;
  const {
      caption = EMPTY_ITEM_CAPTION
    } = item || {},
    _btClose = isDraggable ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgX.BtSvgClose, {
      style: S_SVG_CLOSE,
      onClick: (0, _uiApi.bindTo)(onClose, option)
    }) : null
    /*eslint-disable react-hooks/exhaustive-deps */,
    _hClick = (0, _uiApi.useCallback)(() => onClick(item), [item])
    //onClick
    /*eslint-enable react-hooks/exhaustive-deps */,
    _hKeyUp = (0, _uiApi.useCallback)(evt => {
      if ((0, _isKeyEnter.default)(evt)) {
        _hClick();
      }
    }, [_hClick]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    role: "menuitem",
    tabIndex: "0",
    className: className,
    style: S_ITEM_DIV,
    onClick: _hClick,
    onKeyUp: _hKeyUp,
    ...dndHandlers,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DivEllipsis.default, {
      style: S_CAPTION,
      text: caption
    }), _btClose]
  });
};
var _default = exports.default = WatchItem;
//# sourceMappingURL=WatchItem.js.map