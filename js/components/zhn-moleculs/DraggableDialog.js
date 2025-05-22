"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _fUseKey = require("../hooks/fUseKey");
var _useXYMovable = _interopRequireDefault(require("../hooks/useXYMovable"));
var _useDialogFocus = _interopRequireDefault(require("./useDialogFocus"));
var _RowFlex = require("../dialogs/rows/RowFlex");
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _DialogCaption = _interopRequireDefault(require("./DialogCaption"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_DRAGGABLE_DIALOG = (0, _styleFn.crDialogCn)("draggable-dialog"),
  S_DIALOG_DIV = {
    ...(0, _styleFn.crAbsoluteTopLeftStyle)(30, 50),
    zIndex: 10
  },
  S_MR_57 = {
    marginRight: 57
  },
  BT_HOT_KEY_LOAD = "L",
  BT_HOT_KEY_OPEN = "O",
  BT_HOT_KEY_CLOSE = "C";
const CommandButtons = _ref => {
  let {
    onLoad,
    onShow,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlexReverseStart, {
    children: [(0, _uiApi.isFn)(onLoad) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      caption: "Load",
      title: "Load item",
      hotKey2: BT_HOT_KEY_LOAD,
      onClick: onLoad
    }, "load"), (0, _uiApi.isFn)(onShow) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      timeout: 0,
      caption: "Open",
      title: "Open items",
      hotKey2: BT_HOT_KEY_OPEN,
      onClick: onShow
    }, "open"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      timeout: 0,
      style: S_MR_57,
      caption: "Close",
      title: "Close dialog",
      hotKey2: BT_HOT_KEY_CLOSE,
      onClick: onClose
    }, "close")]
  });
};
const FN_NOOP = () => {};
const isExcludeElement = evt => ((0, _uiApi.getEventComposedPath)(evt)[1] || {}).className === _styleFn.CL_TOGGLE_ARROW;
const _applyHotKeyHandler = (evt, onFn) => {
  (0, _uiApi.stopDefaultFor)(evt);
  if ((0, _uiApi.isFn)(onFn)) {
    onFn();
  }
};
const DraggableDialog = _ref2 => {
  let {
    isFocusBtMenu = true,
    isShow,
    style,
    menuModel,
    caption,
    children,
    toTopLayer,
    onLoad,
    onShow,
    onClose = FN_NOOP
  } = _ref2;
  const refRoot = (0, _uiApi.useRef)(),
    refBtMenu = (0, _uiApi.useRef)(),
    _hKeyDown = evt => {
      if ((0, _fUseKey.isKeyEscape)(evt) || (0, _fUseKey.isHotKey)(evt, BT_HOT_KEY_CLOSE)) {
        _applyHotKeyHandler(evt, onClose);
      } else if ((0, _fUseKey.isHotKey)(evt, BT_HOT_KEY_LOAD)) {
        _applyHotKeyHandler(evt, onLoad);
      } else if ((0, _fUseKey.isHotKey)(evt, BT_HOT_KEY_OPEN)) {
        _applyHotKeyHandler(evt, onShow);
      }
    },
    [_className, _showHideStyle] = (0, _styleFn.crShowHide)(isShow, CL_DRAGGABLE_DIALOG);
  (0, _useDialogFocus.default)(isShow, isFocusBtMenu ? refBtMenu : void 0);
  (0, _useXYMovable.default)(refRoot, isExcludeElement);

  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ...(0, _a11yFn.crDialogRole)(isShow, caption),
    ref: refRoot,
    className: _className,
    style: {
      ...style,
      ...S_DIALOG_DIV,
      ..._showHideStyle
    },
    onClick: toTopLayer,
    onKeyDown: _hKeyDown,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCaption.default, {
      refBtMenuMore: refBtMenu,
      menuModel: menuModel,
      caption: caption,
      onClose: onClose
    }), children, /*#__PURE__*/(0, _jsxRuntime.jsx)(CommandButtons, {
      onLoad: onLoad,
      onShow: onShow,
      onClose: onClose
    })]
  });
};
var _default = exports.default = DraggableDialog;
//# sourceMappingURL=DraggableDialog.js.map