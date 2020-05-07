"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

var _SvgMore = _interopRequireDefault(require("../zhn/SvgMore"));

var _ModalSlider = _interopRequireDefault(require("../zhn-modal-slider/ModalSlider"));

var _SvgCheckBox = _interopRequireDefault(require("../zhn/SvgCheckBox"));

var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));

var _ValueMovingBadge = _interopRequireDefault(require("./ValueMovingBadge"));

//import PropTypes from "prop-types";
var TH_ID = 'ELEMENT';
var CL = 'not-selected shadow-right',
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
    marginRight: 10,
    marginLeft: 8
  },
  CAPTION_OPEN: {
    display: 'inline-block',
    color: '#a487d4',
    width: 125,
    textAlign: 'left',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  CAPTION_CLOSE: {
    color: 'gray'
  },
  CAPTION_WIDTH: {
    width: void 0,
    //maxWidth: 250,
    maxWidth: 'calc(100% - 55px)'
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
  if (!itemTime) return null;
  return _react["default"].createElement("span", {
    style: S.TIME
  }, itemTime);
};

var Header =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(Header, _Component);

  function Header() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      isMore: false
    };

    _this._toggleMore = function () {
      _this.setState(function (prevState) {
        return {
          isMore: !prevState.isMore
        };
      });
    };

    _this._renderMore = function (moreModel, TS) {
      if (!moreModel) {
        return null;
      }

      var isMore = _this.state.isMore;
      return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_SvgMore["default"], {
        style: S.BT_MORE,
        svgStyle: S.SVG_MORE,
        onClick: _this._toggleMore
      }), _react["default"].createElement(_ModalSlider["default"], {
        isShow: isMore,
        rootStyle: S.ROOT_MORE,
        className: CL_MORE,
        style: TS.BORDER,
        model: moreModel,
        onClose: _this._toggleMore
      }));
    };

    return _this;
  }

  var _proto = Header.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        theme = _this$props.theme,
        isOpen = _this$props.isOpen,
        onCheck = _this$props.onCheck,
        onUnCheck = _this$props.onUnCheck,
        itemCaption = _this$props.itemCaption,
        itemTitle = _this$props.itemTitle,
        itemTime = _this$props.itemTime,
        onToggle = _this$props.onToggle,
        valueMoving = _this$props.valueMoving,
        isAdminMode = _this$props.isAdminMode,
        crValueMoving = _this$props.crValueMoving,
        regCompVm = _this$props.regCompVm,
        moreModel = _this$props.moreModel,
        onClose = _this$props.onClose,
        TS = theme.getStyle(TH_ID),
        _openStyle = isOpen ? S.CAPTION_OPEN : (0, _extends2["default"])({}, S.CAPTION_OPEN, {}, S.CAPTION_CLOSE),
        _captionStyle = valueMoving ? _openStyle : (0, _extends2["default"])({}, _openStyle, {}, S.CAPTION_WIDTH);

    return _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.ROOT, {}, TS.ROOT)
    }, this._renderMore(moreModel, TS), _react["default"].createElement(_SvgCheckBox["default"], {
      initValue: false,
      style: S.CHECK_BOX,
      onCheck: onCheck,
      onUnCheck: onUnCheck
    }), _react["default"].createElement("button", {
      className: CL,
      title: itemTitle,
      style: _captionStyle,
      onClick: onToggle
    }, itemCaption), valueMoving ? _react["default"].createElement(_ValueMovingBadge["default"], {
      valueMoving: valueMoving,
      isAdminMode: isAdminMode,
      crValueMoving: crValueMoving,
      regCompVm: regCompVm
    }) : _react["default"].createElement(ItemTime, {
      itemType: itemTime
    }), _react["default"].createElement(_SvgClose["default"], {
      style: S.CLOSE,
      onClose: onClose
    }));
  };

  return Header;
}(_react.Component);
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


var _default = (0, _withTheme["default"])(Header);

exports["default"] = _default;
//# sourceMappingURL=Header.js.map