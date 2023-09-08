"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useKeyEscape = _interopRequireDefault(require("../hooks/useKeyEscape"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _useDialogFocus = _interopRequireDefault(require("./useDialogFocus"));
var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _FocusTrap = _interopRequireDefault(require("./FocusTrap"));
var _MenuMore = _interopRequireDefault(require("./MenuMore"));
var _Dialog = require("./Dialog.Style");
var _jsxRuntime = require("react/jsx-runtime");
const TH_ID = 'MODAL_DIALOG',
  CL_MODAL_DIALOG = (0, _styleFn.crDialogCn)('modal-dialog'),
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _Dialog.S_COMMAND_DIV,
    children: [commandButtons, !withoutClose && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      refBt: refBtClose,
      style: _Dialog.S_BT,
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
const ModalDialog = (0, _uiApi.forwardRef)((_ref2, ref) => {
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
    [refRoot, refBtMore] = (0, _useDialogFocus.default)(ref, isShow),
    _hKeyDown = (0, _useKeyEscape.default)(onClose),
    [isMore, toggleIsMore] = (0, _useToggle.default)(false),
    TS = (0, _useTheme.default)(TH_ID),
    [_className, _showHideStyle] = (0, _styleFn.crShowHide)(isShow, CL_MODAL_DIALOG);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FocusTrap.default, {
    refEl: refRoot,
    refFirst: refFocusFirts || refBtMore,
    refLast: refFocusLast || refBtClose,
    style: _showHideStyle,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      ref: refRoot,
      role: "dialog",
      tabIndex: "-1",
      "aria-label": caption,
      "aria-hidden": !isShow,
      className: _className,
      style: {
        ...S_ROOT_DIV_MODAL,
        ...style,
        ..._showHideStyle
      },
      onClick: _hClickDialog,
      onKeyDown: _hKeyDown,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: {
          ..._Dialog.S_CAPTION_DIV,
          ...TS.EL
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuMore.default, {
          ref: refBtMore,
          isMore: isMore,
          menuModel: menuModel,
          TS: TS,
          toggle: toggleIsMore
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: styleCaption,
          children: caption
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose.default, {
          style: _Dialog.S_SVG_CLOSE,
          onClose: onClose
        })]
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
});
var _default = ModalDialog;
exports.default = _default;
//# sourceMappingURL=ModalDialog.js.map