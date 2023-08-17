"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useFnFocus = _interopRequireDefault(require("../hooks/useFnFocus"));
var _Color = require("../styles/Color");
var _Comp = _interopRequireDefault(require("../Comp"));
var _Button = _interopRequireDefault(require("../zhn/Button"));
var _ValueMovingBadge = _interopRequireDefault(require("./ValueMovingBadge"));
var _ValueDate = _interopRequireDefault(require("./ValueDate"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const {
  SvgMore,
  ModalSlider,
  SvgCheckBox,
  SvgClose
} = _Comp.default;
const TH_ID = 'ELEMENT';
const CL_ITEM_HEADER = 'item-header',
  CL_MORE = "popup-menu charts__menu-more",
  CL_CAPTION = 'not-selected text-clip bt-left bt',
  COLOR_SVG_MORE = '#777777',
  S_BT_MORE = {
    position: 'relative',
    top: 4,
    left: 2
  },
  S_SVG_MORE = {
    stroke: COLOR_SVG_MORE,
    fill: COLOR_SVG_MORE
  },
  S_MODAL_SLIDER = {
    display: 'inline-block'
  },
  S_CHECK_BOX = {
    position: 'relative',
    top: 2,
    margin: '0 6px 0 8px'
  },
  S_CAPTION = {
    color: '#a487d4',
    width: 125,
    padding: '4px 0 2px 4px'
  },
  S_CAPTION_CLOSE = {
    color: 'grey'
  },
  S_CAPTION_WIDTH = {
    width: void 0,
    maxWidth: 'calc(100% - 60px)'
  },
  S_CLOSE = {
    position: 'absolute',
    right: 0,
    top: 6
  };
const MenuMore = _ref => {
  let {
    isMore,
    moreModel,
    sliderStyle,
    onToggle
  } = _ref;
  const [refBtSvg, toggleFocus] = (0, _useFnFocus.default)(onToggle);
  return moreModel ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(SvgMore, {
      ref: refBtSvg,
      style: S_BT_MORE,
      svgStyle: S_SVG_MORE,
      onClick: onToggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ModalSlider, {
      isShow: isMore,
      rootStyle: S_MODAL_SLIDER,
      className: CL_MORE,
      style: sliderStyle,
      model: moreModel,
      onClose: toggleFocus
    })]
  }) : null;
};
const Header = _ref2 => {
  let {
    isOpen,
    onCheck,
    onUnCheck,
    itemCaption,
    itemValue,
    itemTime,
    onToggle,
    valueMoving,
    isAdminMode,
    crValueMoving,
    refVm,
    moreModel,
    onClose
  } = _ref2;
  const [isMore, _toggleMore] = (0, _useToggle.default)(false),
    TS = (0, _useTheme.default)(TH_ID),
    _captionStyle = (0, _styleFn.crStyle3)(S_CAPTION, !isOpen && S_CAPTION_CLOSE, !valueMoving && S_CAPTION_WIDTH),
    _btTitle = itemCaption.length > 15 ? itemCaption : void 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_ITEM_HEADER,
    style: TS.ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(MenuMore, {
      isMore: isMore,
      moreModel: moreModel,
      sliderStyle: TS.BORDER,
      onToggle: _toggleMore
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgCheckBox, {
      style: S_CHECK_BOX,
      color: _Color.GREEN_COLOR,
      checkedColor: TS.ROOT.backgroundColor,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
      className: CL_CAPTION,
      style: _captionStyle,
      title: _btTitle,
      onClick: onToggle,
      children: itemCaption
    }), valueMoving ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValueMovingBadge.default, {
      ref: refVm,
      isAdminMode: isAdminMode,
      initialVm: valueMoving,
      crValueMoving: crValueMoving
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValueDate.default, {
      value: itemValue,
      strDate: itemTime
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgClose, {
      style: S_CLOSE,
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
exports.default = _default;
//# sourceMappingURL=Header.js.map