"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _use = _interopRequireDefault(require("../hooks/use"));

var _useDialogFocus = _interopRequireDefault(require("./useDialogFocus"));

var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));

var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _MenuMore = _interopRequireDefault(require("./MenuMore"));

var _Interact = _interopRequireDefault(require("../../utils/Interact"));

var _Dialog = require("./Dialog.Style");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const {
  useToggle,
  useKeyEscape,
  useTheme
} = _use.default;
const TH_ID = 'DRAGGABLE_DIALOG',
      CL_DRAGGABLE_DIALOG = "draggable-dialog",
      CL_SHOWING = 'show-popup',
      CL_NOT_SELECTED = 'not-selected',
      S_DIALOG_DIV = { ..._Dialog.S_ROOT_DIV,
  position: 'absolute',
  top: 30,
  left: 50,
  zIndex: 10
},
      S_CHILDREN_DIV = {
  cursor: 'default'
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

const DraggableDialog = /*#__PURE__*/(0, _react.forwardRef)((_ref2, ref) => {
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
        _hKeyDown = useKeyEscape(onClose),
        [isMore, toggleIsMore] = useToggle(false),
        TS = useTheme(TH_ID),
        _className = (0, _crCn.default)(CL_DRAGGABLE_DIALOG, [isShow, CL_SHOWING]),
        _styleShow = isShow ? _Dialog.S_SHOW : _Dialog.S_HIDE;
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(() => {
    _Interact.default.makeDragable(refRoot.current);
  }, []); // refRoot

  /*eslint-enable react-hooks/exhaustive-deps */

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
      style: { ...style,
        ...S_DIALOG_DIV,
        ..._styleShow,
        ...TS.ROOT,
        ...TS.EL_BORDER
      },
      onClick: toTopLayer,
      onKeyDown: _hKeyDown,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: { ..._Dialog.S_CAPTION_DIV,
          ...TS.EL
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuMore.default, {
          ref: refBtMore,
          isMore: isMore,
          menuModel: menuModel,
          TS: TS,
          toggle: toggleIsMore
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: CL_NOT_SELECTED,
          children: caption
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose.default, {
          style: _Dialog.S_SVG_CLOSE,
          onClose: onClose
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: S_CHILDREN_DIV,
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
/*
DraggableDialog.propTypes = {
  isShow: PropTypes.bool,
  menuModel: PropTypes.object,
  caption: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  commandButtons: PropTypes.arrayOf(PropTypes.element),
  toTopLayer: PropTypes.func,
  onLoad: PropTypes.func,
  onShow: PropTypes.func,
  onClose: PropTypes.func
}
*/

var _default = DraggableDialog;
exports.default = _default;
//# sourceMappingURL=DraggableDialog.js.map