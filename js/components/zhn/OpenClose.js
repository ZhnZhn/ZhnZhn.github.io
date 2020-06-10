"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Color = _interopRequireDefault(require("../styles/Color"));

var _isKeyEnter = _interopRequireDefault(require("./isKeyEnter"));

//import PropTypes from 'prop-types'
var CL = {
  ROOT: 'zhn-oc',
  SHOW_POPUP: 'show-popup',
  NOT_SELECTED: 'not-selected'
};
var DF = {
  OPEN_COLOR: _Color["default"].TITLE,
  CLOSE_COLOR: _Color["default"].BLANK
};
var S = {
  ROOT_DIV: {
    lineHeight: 2
  },
  ROOT_SVG: {
    display: 'inline-block',
    width: 16,
    height: 16,
    marginLeft: 8
  },
  CAPTION: {
    color: _Color["default"].TITLE,
    paddingLeft: 4,
    verticalAlign: 'top',
    fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },
  INLINE_BLOCK: {
    display: 'inline-block'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};
var PATH_OPEN = "M 2,14 L 14,14 14,2 2,14";
var PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

var _crConf = function _crConf(_ref) {
  var isOpen = _ref.isOpen,
      openColor = _ref.openColor,
      closeColor = _ref.closeColor;
  return isOpen ? {
    _pathV: PATH_OPEN,
    _fillV: openColor,
    _rootChildStyle: S.BLOCK,
    _rootChildCl: CL.SHOW_POPUP
  } : {
    _pathV: PATH_CLOSE,
    _fillV: closeColor,
    _rootChildStyle: S.NONE,
    _rootChildCl: null
  };
};

var OpenClose = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(OpenClose, _Component);

  /*
  static propTypes = {
    isClose: PropTypes.bool,
      rootStyle: PropTypes.object,
    ocStyle: PropTypes.object,
    caption: PropTypes.string,
    captionStyle: PropTypes.object,
    openColor: PropTypes.string,
    closeColor: PropTypes.string,
    CompAfter: PropTypes.node,
    childStyle: PropTypes.object
  }
  */
  function OpenClose(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hClick = function () {
      _this.setState(function (prev) {
        return {
          isOpen: !prev.isOpen
        };
      });
    };

    _this._hKeyDown = function (event) {
      if ((0, _isKeyEnter["default"])(event)) {
        _this._hClick();
      }
    };

    var isClose = props.isClose;
    _this.state = {
      isOpen: isClose ? false : true
    };
    return _this;
  }

  var _proto = OpenClose.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        rootStyle = _this$props.rootStyle,
        ocStyle = _this$props.ocStyle,
        caption = _this$props.caption,
        captionStyle = _this$props.captionStyle,
        openColor = _this$props.openColor,
        closeColor = _this$props.closeColor,
        CompAfter = _this$props.CompAfter,
        childStyle = _this$props.childStyle,
        children = _this$props.children,
        isOpen = this.state.isOpen,
        _crConf2 = _crConf({
      isOpen: isOpen,
      openColor: openColor,
      closeColor: closeColor
    }),
        _pathV = _crConf2._pathV,
        _fillV = _crConf2._fillV,
        _rootChildStyle = _crConf2._rootChildStyle,
        _rootChildCl = _crConf2._rootChildCl;

    return /*#__PURE__*/_react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.ROOT_DIV, rootStyle)
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: CL.NOT_SELECTED
    }, /*#__PURE__*/_react["default"].createElement("div", {
      role: "menuitem",
      tabIndex: "0",
      className: CL.ROOT,
      style: ocStyle,
      onClick: this._hClick,
      onKeyDown: this._hKeyDown
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: S.ROOT_SVG
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      viewBox: "0 0 16 16",
      width: "100%",
      height: "100%",
      preserveAspectRatio: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: S.INLINE_BLOCK
    }, /*#__PURE__*/_react["default"].createElement("path", {
      fill: _fillV,
      strokeWidth: "1",
      stroke: openColor,
      d: _pathV
    }))), /*#__PURE__*/_react["default"].createElement("span", {
      style: (0, _extends2["default"])({}, S.CAPTION, captionStyle)
    }, caption)), CompAfter), /*#__PURE__*/_react["default"].createElement("div", {
      className: _rootChildCl,
      style: (0, _extends2["default"])({}, childStyle, _rootChildStyle)
    }, children));
  };

  return OpenClose;
}(_react.Component);

OpenClose.defaultProps = {
  openColor: DF.OPEN_COLOR,
  closeColor: DF.CLOSE_COLOR
};
var _default = OpenClose;
exports["default"] = _default;
//# sourceMappingURL=OpenClose.js.map