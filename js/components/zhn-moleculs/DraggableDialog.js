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

var _Interact = _interopRequireDefault(require("../../utils/Interact"));

var _Dialog = _interopRequireDefault(require("./Dialog.Style"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const {
  useToggle,
  useKeyEscape,
  useTheme
} = _use.default;
const TH_ID = 'DRAGGABLE_DIALOG';
const CL = {
  ROOT: "draggable-dialog",
  SHOWING: 'show-popup',
  NOT_SELECTED: 'not-selected'
};
const S = { ..._Dialog.default,
  ROOT_DIV_DRAG: {
    position: 'absolute',
    top: 30,
    left: 50,
    zIndex: 10
  },
  CHILDREN_DIV: {
    cursor: 'default'
  }
};

const _isFn = fn => typeof fn === 'function';

const CommandButtons = ({
  buttons,
  onShow,
  onClose
}) => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
  style: S.COMMAND_DIV,
  children: [buttons, _isFn(onShow) && /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
    timeout: 0,
    style: S.BT,
    caption: "Show",
    title: "Show Item Container" //accessKey="s"
    ,
    onClick: onShow
  }, "show"), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
    timeout: 0,
    style: S.BT,
    caption: "Close",
    title: "Close Draggable Dialog" //accessKey="c"
    ,
    onClick: onClose
  }, "close")]
});

const _getCurrent = ref => ref.current;

const DF_ON_CLOSE = () => {};

const DraggableDialog = /*#__PURE__*/(0, _react.forwardRef)(({
  isShow,
  menuModel,
  caption,
  children,
  commandButtons,
  onShowChart,
  onFront,
  onClose = DF_ON_CLOSE
}, ref) => {
  const _refRootDiv = (0, _react.useRef)(),
        _refBtMore = (0, _react.useRef)(),
        _refPrevFocused = (0, _react.useRef)(),
        _refIsShow = (0, _react.useRef)(isShow),
        _focus = (0, _react.useCallback)(() => {
    _refPrevFocused.current = document.activeElement;
    (0, _focusNode.default)(_getCurrent(_refBtMore) || _getCurrent(_refRootDiv));
  }, []),
        _focusPrev = (0, _react.useCallback)(() => {
    (0, _focusNode.default)(_getCurrent(_refPrevFocused));
    _refPrevFocused.current = null;
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
        TS = useTheme(TH_ID),
        _styleShow = isShow ? S.SHOW : S.HIDE,
        _className = (0, _crCn.default)(CL.ROOT, [isShow, CL.SHOWING]);
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(() => {
    _Interact.default.makeDragable(_refRootDiv.current);

    _focus();
  }, []);
  (0, _react.useEffect)(() => {
    if (isShow && !_refIsShow.current) {
      _focus();
    }

    _refIsShow.current = isShow;
  }, [isShow]);
  /* _focus */

  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _react.useImperativeHandle)(ref, () => ({
    focus: _focus,
    focusPrev: _focusPrev
  }));
  return (
    /*#__PURE__*/

    /*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
    (0, _jsxRuntime.jsxs)("div", {
      ref: _refRootDiv,
      role: "dialog",
      tabIndex: "-1",
      "aria-label": caption,
      "aria-hidden": !isShow,
      className: _className,
      style: { ...S.ROOT_DIV,
        ...S.ROOT_DIV_DRAG,
        ..._styleShow,
        ...TS.ROOT,
        ...TS.EL_BORDER
      },
      onClick: onFront,
      onKeyDown: _hKeyDown,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: { ...S.CAPTION_DIV,
          ...TS.EL
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuMore.default, {
          ref: _refBtMore,
          isMore: isMore,
          menuModel: menuModel,
          TS: TS,
          toggle: toggleIsMore
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: CL.NOT_SELECTED,
          children: caption
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgClose.default, {
          style: S.SVG_CLOSE,
          onClose: _hClose
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: S.CHILDREN_DIV,
        children: children
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(CommandButtons, {
        buttons: commandButtons,
        onShow: onShowChart,
        onClose: _hClose
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
  onShowChart: PropTypes.func,
  onFront: PropTypes.func,
  onClose: PropTypes.func
}
*/

var _default = DraggableDialog;
exports.default = _default;
//# sourceMappingURL=DraggableDialog.js.map