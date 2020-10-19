"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _use = _interopRequireDefault(require("../hooks/use"));

var _utils = require("../zhn-utils/utils");

var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _Dialog = _interopRequireDefault(require("./Dialog.Style"));

//import PropTypes from "prop-types";
var useKeyEscape = _use["default"].useKeyEscape,
    useTheme = _use["default"].useTheme,
    useForceUpdate = _use["default"].useForceUpdate;
var TH_ID = 'MODAL_DIALOG';
var CL = {
  MD: 'modal-dialog',
  SHOWING: 'show-popup',
  HIDING: 'hide-popup'
};
var S = (0, _extends2["default"])({}, _Dialog["default"], {
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
});

var CommandButtons = function CommandButtons(_ref) {
  var commandButtons = _ref.commandButtons,
      withoutClose = _ref.withoutClose,
      onClose = _ref.onClose;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S.COMMAND_DIV,
    children: [commandButtons, !withoutClose && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton["default"], {
      style: S.BT,
      caption: "Close",
      title: "Close Modal Dialog",
      onClick: onClose
    }, "close")]
  });
};

var DF_ON_CLOSE = function DF_ON_CLOSE() {};

var ModalDialog = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var isShow = _ref2.isShow,
      style = _ref2.style,
      caption = _ref2.caption,
      styleCaption = _ref2.styleCaption,
      commandButtons = _ref2.commandButtons,
      withoutClose = _ref2.withoutClose,
      _ref2$isWithButton = _ref2.isWithButton,
      isWithButton = _ref2$isWithButton === void 0 ? true : _ref2$isWithButton,
      children = _ref2.children,
      _ref2$timeout = _ref2.timeout,
      timeout = _ref2$timeout === void 0 ? 450 : _ref2$timeout,
      _ref2$onClose = _ref2.onClose,
      onClose = _ref2$onClose === void 0 ? DF_ON_CLOSE : _ref2$onClose;

  var _refRoot = (0, _react.useRef)(),
      _refPrevFocused = (0, _react.useRef)(),
      _refWasClosing = (0, _react.useRef)(false),
      _refIsShow = (0, _react.useRef)(isShow),
      _focus = (0, _react.useCallback)(function () {
    _refPrevFocused.current = document.activeElement;
    (0, _utils.focusNode)(_refRoot.current);
  }, []),
      _focusPrev = (0, _react.useCallback)(function () {
    (0, _utils.focusNode)(_refPrevFocused.current);
    _refPrevFocused.current = null;
  }, []),
      _hClick = (0, _react.useCallback)(function (event) {
    event.stopPropagation();
  }, [])
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
      _hClose = (0, _react.useCallback)(function () {
    onClose();

    _focusPrev();
  }, [onClose])
  /* _focusPrev */

  /*eslint-enable react-hooks/exhaustive-deps */
  ,
      _hKeyDown = useKeyEscape(_hClose, [_hClose]),
      forceUpdate = useForceUpdate()[1],
      TS = useTheme(TH_ID);
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(_focus, []);
  /* _focus */

  (0, _react.useEffect)(function () {
    if (!_refIsShow.current && isShow) {
      _focus();
    }

    _refIsShow.current = isShow;
  });
  /* _focus */

  (0, _react.useEffect)(function () {
    if (_refWasClosing.current) {
      setTimeout(forceUpdate, timeout);
    }
  });
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      focus: _focus,
      focusPrev: _focusPrev
    };
  }, []);
  /* focus, _focusPrev */

  /*eslint-enable react-hooks/exhaustive-deps */

  var _className, _style;

  if (_refWasClosing.current) {
    _style = S.HIDE;
    _refWasClosing.current = false;
  } else {
    _className = isShow ? CL.SHOWING : CL.HIDING;
    _style = isShow ? S.SHOW : S.HIDE_POPUP;

    if (!isShow) {
      _refWasClosing.current = true;
    }
  }

  return (
    /*#__PURE__*/

    /*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
    (0, _jsxRuntime.jsxs)("div", {
      ref: _refRoot,
      role: "dialog",
      tabIndex: "-1",
      "aria-label": caption,
      "aria-hidden": !isShow,
      className: CL.MD + " " + _className,
      style: (0, _extends2["default"])({}, S.ROOT_DIV, S.ROOT_DIV_MODAL, style, _style, TS.ROOT, TS.EL_BORDER),
      onClick: _hClick,
      onKeyDown: _hKeyDown,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: (0, _extends2["default"])({}, S.CAPTION_DIV, TS.EL),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          style: styleCaption,
          children: caption
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose["default"], {
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
exports["default"] = _default;
//# sourceMappingURL=ModalDialog.js.map