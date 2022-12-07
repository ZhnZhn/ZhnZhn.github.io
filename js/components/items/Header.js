"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _useFnFocus = _interopRequireDefault(require("../hooks/useFnFocus"));

var _Color = require("../styles/Color");

var _crStyle = _interopRequireDefault(require("../zhn-utils/crStyle"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ValueMovingBadge = _interopRequireDefault(require("./ValueMovingBadge"));

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
      CL_ITEM_TIME = 'item-time',
      S_BT_MORE = {
  position: 'relative',
  top: 3,
  left: 2
},
      S_SVG_MORE = {
  stroke: '#777777',
  fill: '#777777'
},
      S_MODAL_SLIDER = {
  display: 'inline-block'
},
      S_CHECK_BOX = {
  position: 'relative',
  top: 1,
  margin: '0 6px 0 8px'
},
      S_CAPTION = {
  color: '#a487d4',
  width: 125,
  padding: '4px 0 2px 4px'
},
      S_CAPTION_CLOSE = {
  color: 'gray'
},
      S_CAPTION_WIDTH = {
  width: void 0,
  maxWidth: 'calc(100% - 60px)'
},
      S_CLOSE = {
  position: 'absolute',
  right: 0,
  top: 4
};

const ItemTime = _ref => {
  let {
    itemTime
  } = _ref;
  return itemTime ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: CL_ITEM_TIME,
    children: itemTime
  }) : null;
};

const MenuMore = _ref2 => {
  let {
    isMore,
    moreModel,
    sliderStyle,
    onToggle
  } = _ref2;
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

const Header = _ref3 => {
  let {
    isOpen,
    onCheck,
    onUnCheck,
    itemCaption,
    itemTime,
    onToggle,
    valueMoving,
    isAdminMode,
    crValueMoving,
    refVm,
    moreModel,
    onClose
  } = _ref3;

  const [isMore, _toggleMore] = (0, _useToggle.default)(false),
        TS = (0, _useTheme.default)(TH_ID),
        _captionStyle = (0, _crStyle.default)(S_CAPTION, !isOpen && S_CAPTION_CLOSE, !valueMoving && S_CAPTION_WIDTH),
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: CL_CAPTION,
      title: _btTitle,
      style: _captionStyle,
      onClick: onToggle,
      children: itemCaption
    }), valueMoving ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValueMovingBadge.default, {
      ref: refVm,
      isAdminMode: isAdminMode,
      initialVm: valueMoving,
      crValueMoving: crValueMoving
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemTime, {
      itemTime: itemTime
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