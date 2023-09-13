"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useToggleMenuMore = _interopRequireDefault(require("../hooks/useToggleMenuMore"));
var _useKeyEscape = _interopRequireDefault(require("../hooks/useKeyEscape"));
var _useXYMovable = _interopRequireDefault(require("../hooks/useXYMovable"));
var _useDialogFocus = _interopRequireDefault(require("./useDialogFocus"));
var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _MenuMore = _interopRequireDefault(require("./MenuMore"));
var _Dialog = require("./Dialog.Style");
var _jsxRuntime = require("react/jsx-runtime");
const CL_DRAGGABLE_DIALOG = (0, _styleFn.crDialogCn)("draggable-dialog"),
  CL_NOT_SELECTED = "not-selected",
  CL_EL = (0, _styleFn.crElementCn)(),
  S_DIALOG_DIV = {
    ..._Dialog.S_ROOT_DIV,
    position: 'absolute',
    top: 30,
    left: 50,
    zIndex: 10
  };
const _isFn = fn => typeof fn === 'function';
const CommandButtons = _ref => {
  let {
    buttons,
    onLoad,
    onShow,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _Dialog.S_COMMAND_DIV,
    children: [buttons, _isFn(onLoad) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      style: _Dialog.S_BT_LOAD,
      caption: "Load",
      title: "Load item",
      onClick: onLoad
    }, "load"), _isFn(onShow) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      timeout: 0,
      style: _Dialog.S_BT,
      caption: "Show",
      title: "Show items",
      onClick: onShow
    }, "show"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      timeout: 0,
      style: _Dialog.S_BT,
      caption: "Close",
      title: "Close dialog",
      onClick: onClose
    }, "close")]
  });
};
const FN_NOOP = () => {};
const DraggableDialog = (0, _uiApi.forwardRef)((_ref2, ref) => {
  let {
    isShow,
    style,
    menuModel,
    caption,
    children,
    commandButtons,
    toTopLayer,
    onLoad,
    onShow,
    onClose = FN_NOOP
  } = _ref2;
  const [refRoot, refBtMore] = (0, _useDialogFocus.default)(ref, isShow),
    _hKeyDown = (0, _useKeyEscape.default)(onClose),
    [isMenuMore, toggleIsMenuMore] = (0, _useToggleMenuMore.default)(refBtMore),
    [_className, _showHideStyle] = (0, _styleFn.crShowHide)(isShow, CL_DRAGGABLE_DIALOG);
  (0, _useXYMovable.default)(refRoot);
  return (
    /*#__PURE__*/
    /*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
    (0, _jsxRuntime.jsxs)("div", {
      ref: refRoot,
      role: "dialog",
      tabIndex: "-1",
      "aria-label": caption,
      "aria-hidden": !isShow,
      className: _className,
      style: {
        ...style,
        ...S_DIALOG_DIV,
        ..._showHideStyle
      },
      onClick: toTopLayer,
      onKeyDown: _hKeyDown,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: CL_EL,
        style: _Dialog.S_CAPTION_DIV,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuMore.default, {
          ref: refBtMore,
          isMore: isMenuMore,
          menuModel: menuModel,
          toggle: toggleIsMenuMore
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: CL_NOT_SELECTED,
          children: caption
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose.default, {
          style: _Dialog.S_SVG_CLOSE,
          onClose: onClose
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: children
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(CommandButtons, {
        buttons: commandButtons,
        onLoad: onLoad,
        onShow: onShow,
        onClose: onClose
      })]
    })
  );
});
var _default = DraggableDialog;
exports.default = _default;
//# sourceMappingURL=DraggableDialog.js.map