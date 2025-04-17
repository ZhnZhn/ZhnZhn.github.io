"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useToggle = require("../hooks/useToggle");
var _useFocus = require("../hooks/useFocus");
var _Color = require("../styles/Color");
var _Button = _interopRequireDefault(require("../zhn/Button"));
var _BtSvgX = require("../zhn/BtSvgX");
var _SvgCheckBox = _interopRequireDefault(require("../zhn/SvgCheckBox"));
var _SvgMore = _interopRequireDefault(require("../zhn/SvgMore"));
var _ModalSlider = require("../zhn-modal-slider/ModalSlider");
var _ValueMovingBadge = _interopRequireDefault(require("./ValueMovingBadge"));
var _ValueDate = _interopRequireDefault(require("./ValueDate"));
var _Item = require("./Item.Style");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const CL_ITEM_HEADER = (0, _styleFn.crItemCaptionCn)("item-header"),
  S_BT_MORE = {
    position: 'relative',
    top: 4,
    left: 2
  },
  S_SVG_MORE = {
    stroke: _Item.COLOR_SVG_MORE,
    fill: _Item.COLOR_SVG_MORE
  },
  S_CHECK_BOX = {
    position: 'relative',
    top: 2,
    margin: '0 6px 0 8px'
  },
  S_CAPTION = {
    width: 125,
    padding: '4px 0 2px 4px'
  },
  S_CAPTION_WIDTH = {
    width: void 0,
    maxWidth: 'calc(100% - 60px)'
  };
const MenuMore = _ref => {
  let {
    isMore,
    moreModel,
    onToggle
  } = _ref;
  const [refBtSvg, toggleFocus] = (0, _useFocus.useFnFocus)(onToggle);
  return moreModel ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgMore.default, {
      refEl: refBtSvg,
      style: S_BT_MORE,
      svgStyle: S_SVG_MORE,
      onClick: onToggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalSlider.ModalSliderMemoIsShow, {
      isShow: isMore,
      rootStyle: _styleFn.S_INLINE,
      className: _styleFn.CL_CHARTS_MENU_MORE,
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
  const _captionId = (0, _uiApi.useId)(),
    [isMore, _toggleMore] = (0, _useToggle.useToggle)(false),
    _captionStyle = (0, _styleFn.crStyle2)(S_CAPTION, !valueMoving && S_CAPTION_WIDTH),
    _btTitle = itemCaption.length > 15 ? itemCaption : void 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_ITEM_HEADER,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(MenuMore, {
      isMore: isMore,
      moreModel: moreModel,
      onToggle: _toggleMore
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgCheckBox.default, {
      style: S_CHECK_BOX,
      color: _Color.GREEN_COLOR,
      labelId: _captionId,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
      id: _captionId,
      className: _Item.CL_HEADER_CAPTION,
      style: _captionStyle,
      title: _btTitle,
      onClick: onToggle,
      children: itemCaption
    }), valueMoving ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValueMovingBadge.default, {
      refEl: refVm,
      isAdminMode: isAdminMode,
      initialVm: valueMoving,
      crValueMoving: crValueMoving
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValueDate.default, {
      value: itemValue,
      strDate: itemTime
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgX.BtSvgClose, {
      style: _Item.S_BT_SVG_CLOSE,
      onClick: onClose
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
var _default = exports.default = Header;
//# sourceMappingURL=Header.js.map