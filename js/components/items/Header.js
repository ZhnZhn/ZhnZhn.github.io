"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Color = _interopRequireDefault(require("../styles/Color"));

var _use = _interopRequireDefault(require("../hooks/use"));

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
const {
  crStyle,
  useTheme,
  useToggle,
  useFnFocus
} = _use.default;
const TH_ID = 'ELEMENT';
const CL_CAPTION = 'not-selected text-clip bt-left bt',
      CL_MORE = "popup-menu charts__menu-more";
const S = {
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

const ItemTime = ({
  itemTime
}) => itemTime ? /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  style: S.TIME,
  children: itemTime
}) : null;

const MenuMore = ({
  isMore,
  moreModel,
  sliderStyle,
  onToggle
}) => {
  const [refBtSvg, toggleFocus] = useFnFocus(onToggle);
  if (!moreModel) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(SvgMore, {
      ref: refBtSvg,
      style: S.BT_MORE,
      svgStyle: S.SVG_MORE,
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

const Header = ({
  isOpen,
  onCheck,
  onUnCheck,
  itemCaption,
  itemTitle,
  itemTime,
  onToggle,
  valueMoving,
  isAdminMode,
  crValueMoving,
  refVm,
  moreModel,
  onClose
}) => {
  const [isMore, _toggleMore] = useToggle(false),
        TS = useTheme(TH_ID),
        _captionStyle = crStyle([S.CAPTION_OPEN, !isOpen && S.CAPTION_CLOSE, !valueMoving && S.CAPTION_WIDTH]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: { ...S.ROOT,
      ...TS.ROOT
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(MenuMore, {
      isMore: isMore,
      moreModel: moreModel,
      sliderStyle: TS.BORDER,
      onToggle: _toggleMore
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgCheckBox, {
      style: S.CHECK_BOX,
      color: _Color.default.GREEN,
      checkedColor: TS.ROOT.backgroundColor,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: CL_CAPTION,
      title: itemTitle,
      style: _captionStyle,
      onClick: onToggle,
      children: itemCaption
    }), valueMoving ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValueMovingBadge.default, {
      ref: refVm,
      isAdminMode: isAdminMode,
      initialVm: valueMoving,
      crValueMoving: crValueMoving
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
exports.default = _default;
//# sourceMappingURL=Header.js.map