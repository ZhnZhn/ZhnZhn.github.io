"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _use = _interopRequireDefault(require("../hooks/use"));

var _utils = require("../zhn-utils/utils");

var _ModalSlider = _interopRequireDefault(require("../zhn-modal-slider/ModalSlider"));

var _SvgMore = _interopRequireDefault(require("../zhn/SvgMore"));

var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _Interact = _interopRequireDefault(require("../../utils/Interact"));

var _Dialog = _interopRequireDefault(require("./Dialog.Style"));

//import PropTypes from "prop-types";
var useToggle = _use["default"].useToggle,
    useKeyEscape = _use["default"].useKeyEscape,
    useTheme = _use["default"].useTheme;
var TH_ID = 'DRAGGABLE_DIALOG';
var CL = {
  ROOT: "draggable-dialog",
  SHOWING: 'show-popup',
  NOT_SELECTED: 'not-selected',
  MENU_MORE: 'popup-menu dialog__menu-more'
};
var S = (0, _extends2["default"])({}, _Dialog["default"], {
  ROOT_DIV_DRAG: {
    position: 'absolute',
    top: 30,
    left: 50,
    zIndex: 10
  },
  BT_MORE: {
    position: 'absolute',
    top: 1,
    left: 2
  },
  BT_MORE_SVG: {
    stroke: 'inherit',
    fill: 'inherit'
  },
  CHILDREN_DIV: {
    cursor: 'default'
  }
});

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var MenuMore = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var isMore = _ref.isMore,
      menuModel = _ref.menuModel,
      TS = _ref.TS,
      toggle = _ref.toggle;

  if (!menuModel) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_SvgMore["default"], {
    btRef: ref,
    style: S.BT_MORE,
    svgStyle: S.BT_MORE_SVG,
    onClick: toggle
  }), /*#__PURE__*/_react["default"].createElement(_ModalSlider["default"], {
    isShow: isMore,
    className: CL.MENU_MORE,
    style: TS.EL_BORDER,
    model: menuModel,
    onClose: toggle
  }));
});

var CommandButtons = function CommandButtons(_ref2) {
  var buttons = _ref2.buttons,
      onShow = _ref2.onShow,
      onClose = _ref2.onClose;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: S.COMMAND_DIV
  }, buttons, _isFn(onShow) && /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], {
    key: "show",
    timeout: 0,
    style: S.BT,
    caption: "Show",
    title: "Show Item Container" //accessKey="s"
    ,
    onClick: onShow
  }), /*#__PURE__*/_react["default"].createElement(_FlatButton["default"], {
    key: "close",
    timeout: 0,
    style: S.BT,
    caption: "Close",
    title: "Close Draggable Dialog" //accessKey="c"
    ,
    onClick: onClose
  }));
};

var _getCurrent = function _getCurrent(ref) {
  return ref.current;
};

var DF_ON_CLOSE = function DF_ON_CLOSE() {};

var DraggableDialog = /*#__PURE__*/(0, _react.forwardRef)(function (_ref3, ref) {
  var isShow = _ref3.isShow,
      menuModel = _ref3.menuModel,
      caption = _ref3.caption,
      children = _ref3.children,
      commandButtons = _ref3.commandButtons,
      onShowChart = _ref3.onShowChart,
      onFront = _ref3.onFront,
      _ref3$onClose = _ref3.onClose,
      onClose = _ref3$onClose === void 0 ? DF_ON_CLOSE : _ref3$onClose;

  var _refRootDiv = (0, _react.useRef)(),
      _refBtMore = (0, _react.useRef)(),
      _refPrevFocused = (0, _react.useRef)(),
      _refIsShow = (0, _react.useRef)(isShow),
      _focus = (0, _react.useCallback)(function () {
    _refPrevFocused.current = document.activeElement;
    (0, _utils.focusNode)(_getCurrent(_refBtMore) || _getCurrent(_refRootDiv));
  }, []),
      _focusPrev = (0, _react.useCallback)(function () {
    (0, _utils.focusNode)(_getCurrent(_refPrevFocused));
    _refPrevFocused.current = null;
  }, []),
      _hClose = (0, _react.useCallback)(function () {
    onClose();

    _focusPrev();
  }, [onClose]),
      _hKeyDown = useKeyEscape(_hClose, [_hClose]),
      _useToggle = useToggle(false),
      isMore = _useToggle[0],
      toggleIsMore = _useToggle[1],
      TS = useTheme(TH_ID),
      _styleShow = isShow ? S.SHOW : S.HIDE,
      _classShow = isShow ? CL.SHOWING : '',
      _className = CL.ROOT + " " + _classShow;
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(function () {
    _Interact["default"].makeDragable(_refRootDiv.current);

    _focus();
  }, []);
  (0, _react.useEffect)(function () {
    if (isShow && !_refIsShow.current) {
      _focus();
    }

    _refIsShow.current = isShow;
  }, [isShow]);
  /* _focus */

  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      focus: _focus,
      focusPrev: _focusPrev
    };
  });
  return (
    /*#__PURE__*/

    /*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
    _react["default"].createElement("div", {
      ref: _refRootDiv,
      role: "dialog",
      tabIndex: "-1",
      "aria-label": caption,
      "aria-hidden": !isShow,
      className: _className,
      style: (0, _extends2["default"])({}, S.ROOT_DIV, S.ROOT_DIV_DRAG, _styleShow, TS.ROOT, TS.EL_BORDER),
      onClick: onFront,
      onKeyDown: _hKeyDown
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.CAPTION_DIV, TS.EL)
    }, /*#__PURE__*/_react["default"].createElement(MenuMore, {
      ref: _refBtMore,
      isMore: isMore,
      menuModel: menuModel,
      TS: TS,
      toggle: toggleIsMore
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: CL.NOT_SELECTED
    }, caption), /*#__PURE__*/_react["default"].createElement(_SvgClose["default"], {
      style: S.SVG_CLOSE,
      onClose: _hClose
    })), /*#__PURE__*/_react["default"].createElement("div", {
      style: S.CHILDREN_DIV
    }, children), /*#__PURE__*/_react["default"].createElement(CommandButtons, {
      buttons: commandButtons,
      onShow: onShowChart,
      onClose: _hClose
    }))
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
  onShowChart: PropTypes.func,
  onFront: PropTypes.func,
  onClose: PropTypes.func
}
*/

var _default = DraggableDialog;
exports["default"] = _default;
//# sourceMappingURL=DraggableDialog.js.map