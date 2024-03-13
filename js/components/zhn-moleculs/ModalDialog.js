"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _fUseKey = require("../hooks/fUseKey");
var _useDialogFocus = _interopRequireDefault(require("./useDialogFocus"));
var _RowFlex = require("../dialogs/rows/RowFlex");
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _FocusTrap = _interopRequireDefault(require("./FocusTrap"));
var _DialogCaption = _interopRequireDefault(require("./DialogCaption"));
var _Dialog = require("./Dialog.Style");
var _jsxRuntime = require("react/jsx-runtime");
const CL_MODAL_DIALOG = (0, _styleFn.crDialogCn)('modal-dialog'),
  S_ROOT_DIV_MODAL = {
    ..._Dialog.S_ROOT_DIV,
    display: 'block',
    position: 'absolute',
    top: '20%',
    left: '50%',
    width: 380,
    marginLeft: -190,
    zIndex: 10
  };
const CommandButtons = _ref => {
  let {
    refBtClose,
    commandButtons,
    withoutClose,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_RowFlex.RowFlexEnd, {
    children: [commandButtons, !withoutClose && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      refBt: refBtClose,
      caption: "Close",
      title: "Close Modal Dialog",
      timeout: 0,
      onClick: onClose
    }, "close")]
  });
};
const FN_NOOP = () => {};
const _hClickDialog = evt => {
  evt.stopPropagation();
};
const ModalDialog = _ref2 => {
  let {
    refFocusFirts,
    refFocusLast,
    isShow,
    style,
    menuModel,
    caption,
    styleCaption,
    commandButtons,
    withoutClose,
    isWithButton = true,
    children,
    timeout = 450,
    onClose = FN_NOOP
  } = _ref2;
  const refBtClose = (0, _uiApi.useRef)(),
    refBtMenuMore = (0, _uiApi.useRef)(),
    refRoot = (0, _useDialogFocus.default)(isShow, refBtMenuMore),
    _hKeyDown = (0, _fUseKey.useKeyEscape)(onClose),
    [_className, _showHideStyle] = (0, _styleFn.crShowHide)(isShow, CL_MODAL_DIALOG);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FocusTrap.default, {
    refEl: refRoot,
    refFirst: refFocusFirts || refBtMenuMore,
    refLast: refFocusLast || refBtClose,
    style: _showHideStyle,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ...(0, _a11yFn.crDialogRole)(isShow, caption),
      ref: refRoot,
      className: _className,
      style: {
        ...S_ROOT_DIV_MODAL,
        ...style,
        ..._showHideStyle
      },
      onClick: _hClickDialog,
      onKeyDown: _hKeyDown,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCaption.default, {
        refBtMenuMore: refBtMenuMore,
        menuModel: menuModel,
        caption: caption,
        onClose: onClose
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: children
      }), isWithButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(CommandButtons, {
        refBtClose: !withoutClose && isShow ? refBtClose : void 0,
        commandButtons: commandButtons,
        withoutClose: withoutClose,
        onClose: onClose
      })]
    })
  });
};
var _default = exports.default = ModalDialog;
//# sourceMappingURL=ModalDialog.js.map