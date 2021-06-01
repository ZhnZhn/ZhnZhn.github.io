"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _Color = _interopRequireDefault(require("../styles/Color"));

var _use = _interopRequireDefault(require("../hooks/use"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ValueMovingBadge = _interopRequireDefault(require("./ValueMovingBadge"));

//import PropTypes from "prop-types";
var SvgMore = _Comp["default"].SvgMore,
    ModalSlider = _Comp["default"].ModalSlider,
    SvgCheckBox = _Comp["default"].SvgCheckBox,
    SvgClose = _Comp["default"].SvgClose;
var crStyle = _use["default"].crStyle,
    useTheme = _use["default"].useTheme,
    useToggle = _use["default"].useToggle,
    useFnFocus = _use["default"].useFnFocus;
var TH_ID = 'ELEMENT';
var CL_CAPTION = 'not-selected text-clip bt-left',
    CL_MORE = "popup-menu charts__menu-more";
var S = {
  ROOT: {
    backgroundColor: '#1b2836',
    height: 'auto',
    width: '100%',
    paddingRight: 42,
    paddingBottom: 2,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2
  },
  BT_MORE: {
    position: 'relative',
    top: 3,
    left: 2
  },
  SVG_MORE: {
    stroke: '#777777',
    fill: '#777777'
  },
  ROOT_MORE: {
    display: 'inline-block'
  },
  CHECK_BOX: {
    position: 'relative',
    top: 1,
    marginRight: 8,
    marginLeft: 8
  },
  CAPTION_OPEN: {
    color: '#a487d4',
    width: 125,
    paddingTop: 4,
    paddingBottom: 2
  },
  CAPTION_CLOSE: {
    color: 'gray'
  },
  CAPTION_WIDTH: {
    width: void 0,
    //maxWidth: 250,
    maxWidth: 'calc(100% - 60px)'
  },
  TIME: {
    color: '#fdb316',
    paddingLeft: 16,
    fontWeight: 'bold'
  },
  CLOSE: {
    position: 'absolute',
    right: 0,
    top: 4
  }
};

var ItemTime = function ItemTime(_ref) {
  var itemTime = _ref.itemTime;
  return !itemTime ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    style: S.TIME,
    children: itemTime
  });
};

var MenuMore = function MenuMore(_ref2) {
  var isMore = _ref2.isMore,
      moreModel = _ref2.moreModel,
      sliderStyle = _ref2.sliderStyle,
      onToggle = _ref2.onToggle;

  var _useFnFocus = useFnFocus(onToggle),
      refBtSvg = _useFnFocus[0],
      toggleFocus = _useFnFocus[1];

  if (!moreModel) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(SvgMore, {
      style: S.BT_MORE,
      svgStyle: S.SVG_MORE,
      btRef: refBtSvg,
      onClick: onToggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ModalSlider, {
      isShow: isMore,
      rootStyle: S.ROOT_MORE,
      className: CL_MORE,
      style: sliderStyle,
      model: moreModel,
      onClose: toggleFocus
    })]
  });
};

var Header = function Header(_ref3) {
  var isOpen = _ref3.isOpen,
      onCheck = _ref3.onCheck,
      onUnCheck = _ref3.onUnCheck,
      itemCaption = _ref3.itemCaption,
      itemTitle = _ref3.itemTitle,
      itemTime = _ref3.itemTime,
      onToggle = _ref3.onToggle,
      valueMoving = _ref3.valueMoving,
      isAdminMode = _ref3.isAdminMode,
      crValueMoving = _ref3.crValueMoving,
      regCompVm = _ref3.regCompVm,
      moreModel = _ref3.moreModel,
      onClose = _ref3.onClose;

  var _useToggle = useToggle(false),
      isMore = _useToggle[0],
      _toggleMore = _useToggle[1],
      TS = useTheme(TH_ID),
      _captionStyle = crStyle([S.CAPTION_OPEN, !isOpen && S.CAPTION_CLOSE, !valueMoving && S.CAPTION_WIDTH]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, S.ROOT, TS.ROOT),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(MenuMore, {
      isMore: isMore,
      moreModel: moreModel,
      sliderStyle: TS.BORDER,
      onToggle: _toggleMore
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgCheckBox, {
      style: S.CHECK_BOX,
      color: _Color["default"].GREEN,
      checkedColor: TS.ROOT.backgroundColor,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: CL_CAPTION,
      title: itemTitle,
      style: _captionStyle,
      onClick: onToggle,
      children: itemCaption
    }), valueMoving ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValueMovingBadge["default"], {
      valueMoving: valueMoving,
      isAdminMode: isAdminMode,
      crValueMoving: crValueMoving,
      regCompVm: regCompVm
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemTime, {
      itemType: itemTime
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgClose, {
      style: S.CLOSE,
      onClose: onClose
    })]
  });
};
/*
Header.propTypes = {
  isOpen : PropTypes.bool.isRequired,
  chartType : PropTypes.string.isRequired,
  moreModel: PropTypes.object,
  onCheck : PropTypes.func.isRequired,
  onUnCheck : PropTypes.func.isRequired,
  itemCaption : PropTypes.string.isRequired,
  itemTitle : PropTypes.string.isRequired,
  itemTime : PropTypes.string,
  onToggle : PropTypes.func.isRequired,
  valueMoving : PropTypes.object,
  isAdminMode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  crValueMoving: PropTypes.func,
  onClose : PropTypes.func.isRequired
}
*/


var _default = Header;
exports["default"] = _default;
//# sourceMappingURL=Header.js.map