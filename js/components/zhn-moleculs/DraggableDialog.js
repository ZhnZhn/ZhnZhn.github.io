"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _useMenuMore = _interopRequireDefault(require("../hooks/useMenuMore"));
var _fUseKey = require("../hooks/fUseKey");
var _useXYMovable = _interopRequireDefault(require("../hooks/useXYMovable"));
var _useDialogFocus = _interopRequireDefault(require("./useDialogFocus"));
var _BtSvgX = require("../zhn/BtSvgX");
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _MenuMore = _interopRequireDefault(require("./MenuMore"));
var _Dialog = require("./Dialog.Style");
var _jsxRuntime = require("react/jsx-runtime");
const CL_DRAGGABLE_DIALOG = (0, _styleFn.crDialogCn)("draggable-dialog"),
  CL_EL = (0, _styleFn.crElementCn)(),
  S_DIALOG_DIV = {
    ..._Dialog.S_ROOT_DIV,
    position: 'absolute',
    top: 30,
    left: 50,
    zIndex: 10
  };
const CommandButtons = _ref => {
  let {
    buttons,
    onLoad,
    onShow,
    onClose
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: _Dialog.S_COMMAND_DIV,
    children: [buttons, (0, _uiApi.isFn)(onLoad) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      style: _Dialog.S_BT_LOAD,
      caption: "Load",
      title: "Load item",
      onClick: onLoad
    }, "load"), (0, _uiApi.isFn)(onShow) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      timeout: 0,
      caption: "Show",
      title: "Show items",
      onClick: onShow
    }, "show"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      timeout: 0,
      caption: "Close",
      title: "Close dialog",
      onClick: onClose
    }, "close")]
  });
};
const FN_NOOP = () => {};
const DraggableDialog = _ref2 => {
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
  const [refBtMenuMore, isMenuMore, toggleMenuMore] = (0, _useMenuMore.default)(),
    refRoot = (0, _useDialogFocus.default)(isShow, refBtMenuMore),
    _hKeyDown = (0, _fUseKey.useKeyEscape)(onClose),
    [_className, _showHideStyle] = (0, _styleFn.crShowHide)(isShow, CL_DRAGGABLE_DIALOG);
  (0, _useXYMovable.default)(refRoot);

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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_EL,
      style: _Dialog.S_CAPTION_DIV,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuMore.default, {
        ref: refBtMenuMore,
        isMore: isMenuMore,
        menuModel: menuModel,
        toggle: toggleMenuMore
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: _styleFn.CL_NOT_SELECTED,
        children: caption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgX.BtSvgClose, {
        style: _Dialog.S_SVG_CLOSE,
        onClick: onClose
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: children
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(CommandButtons, {
      buttons: commandButtons,
      onLoad: onLoad,
      onShow: onShow,
      onClose: onClose
    })]
  });
};
var _default = exports.default = DraggableDialog;
//# sourceMappingURL=DraggableDialog.js.map