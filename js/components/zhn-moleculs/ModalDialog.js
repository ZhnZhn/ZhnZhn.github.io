"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _use = _interopRequireDefault(require("../hooks/use"));

var _focusNode = _interopRequireDefault(require("../zhn-utils/focusNode"));

var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));

var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _MenuMore = _interopRequireDefault(require("./MenuMore"));

var _Dialog = _interopRequireDefault(require("./Dialog.Style"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const {
  useKeyEscape,
  useToggle,
  useTheme
} = _use.default;
const TH_ID = 'MODAL_DIALOG';
const CL_MD = 'modal-dialog',
      CL_SHOWING = 'show-popup';
const S = { ..._Dialog.default,
  ROOT_DIV_MODAL: {
    display: 'block',
    position: 'absolute',
    top: '20%',
    //left: '30%',
    left: '50%',
    width: 380,
    marginLeft: -190,
    zIndex: 10
  },
  HIDE_POPUP: {
    opacity: 0,
    transform: 'scaleY(0)'
  }
};

const CommandButtons = ({
  commandButtons,
  withoutClose,
  onClose
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S.COMMAND_DIV,
    children: [commandButtons, !withoutClose && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      style: S.BT,
      caption: "Close",
      title: "Close Modal Dialog",
      onClick: onClose
    }, "close")]
  });
};

const DF_ON_CLOSE = () => {};

const ModalDialog = /*#__PURE__*/(0, _react.forwardRef)(({
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
  onClose = DF_ON_CLOSE
}, ref) => {
  const _refRoot = (0, _react.useRef)(),
        _refPrevFocused = (0, _react.useRef)(),
        _refIsShow = (0, _react.useRef)(isShow),
        _focus = (0, _react.useCallback)(() => {
    _refPrevFocused.current = document.activeElement;
    (0, _focusNode.default)(_refRoot.current);
  }, []),
        _focusPrev = (0, _react.useCallback)(() => {
    (0, _focusNode.default)(_refPrevFocused.current);
    _refPrevFocused.current = null;
  }, []),
        _hClick = (0, _react.useCallback)(event => {
    event.stopPropagation();
  }, [])
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        _hClose = (0, _react.useCallback)(() => {
    onClose();

    _focusPrev();
  }, [onClose])
  /* _focusPrev */

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
        _hKeyDown = useKeyEscape(_hClose, [_hClose]),
        [isMore, toggleIsMore] = useToggle(false),
        TS = useTheme(TH_ID);
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(_focus, []);
  /* _focus */

  (0, _react.useEffect)(() => {
    if (!_refIsShow.current && isShow) {
      _focus();
    }

    _refIsShow.current = isShow;
  });
  /* _focus */

  (0, _react.useImperativeHandle)(ref, () => ({
    focus: _focus,
    focusPrev: _focusPrev
  }), []);
  /* focus, _focusPrev */

  /*eslint-enable react-hooks/exhaustive-deps */

  const _style = isShow ? S.SHOW : S.HIDE,
        _className = (0, _crCn.default)(CL_MD, [isShow, CL_SHOWING]);

  return (
    /*#__PURE__*/

    /*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
    (0, _jsxRuntime.jsxs)("div", {
      ref: _refRoot,
      role: "dialog",
      tabIndex: "-1",
      "aria-label": caption,
      "aria-hidden": !isShow,
      className: _className,
      style: { ...S.ROOT_DIV,
        ...S.ROOT_DIV_MODAL,
        ...style,
        ..._style,
        ...TS.ROOT,
        ...TS.EL_BORDER
      },
      onClick: _hClick,
      onKeyDown: _hKeyDown,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: { ...S.CAPTION_DIV,
          ...TS.EL
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuMore.default, {
          isMore: isMore,
          menuModel: menuModel,
          TS: TS,
          toggle: toggleIsMore
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: styleCaption,
          children: caption
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose.default, {
          style: S.SVG_CLOSE,
          onClose: _hClose
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: children
      }), isWithButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(CommandButtons, {
        commandButtons: commandButtons,
        withoutClose: withoutClose,
        onClose: _hClose
      })]
    })
  );
});
/*
 ModalDialog.propTypes = {
   isShow: PropTypes.bool,
   isWithButton: PropTypes.bool,
   withoutClose: PropTypes.bool,
   style: PropTypes.object,
   caption: PropTypes.string,
   styleCaption: PropTypes.object,
   timeout: PropTypes.number,
   commandButtons: PropTypes.arrayOf(PropTypes.element),
   onClose: PropTypes.func
 }
 */

var _default = ModalDialog;
exports.default = _default;
//# sourceMappingURL=ModalDialog.js.map