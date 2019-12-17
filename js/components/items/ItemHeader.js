"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

var _SvgClose = _interopRequireDefault(require("../zhn/SvgClose"));

var TH_ID = 'ELEMENT';
var CL = "not-selected shadow-right";
var MAX_LENGTH = 45;
var S = {
  ROOT: {
    backgroundColor: '#1b2836',
    paddingTop: '6px',
    paddingLeft: '10px',
    paddingRight: '42px',
    paddingBottom: '6px',
    height: 'auto',
    width: '100%',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    position: 'relative',
    boxShadow: '0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)'
  },
  CAPTION: {
    display: 'inline-block',
    cursor: 'pointer',
    width: '380px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    //overflow: 'inherit'
    overflow: 'hidden'
  },
  OPEN: {
    color: 'rgba(164, 135, 212, 1)'
  },
  CLOSE: {
    color: 'gray'
  },
  SVG_CLOSE: {
    position: 'absolute',
    right: 0,
    top: '4px'
  }
};

var ItemHeader =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ItemHeader, _Component);

  function ItemHeader() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._hKeyPress = function (evt) {
      evt.preventDefault();
      var which = evt.which;

      if (which === 13 || which === 32) {
        _this.props.onClick();
      }
    };

    return _this;
  }

  var _proto = ItemHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        theme = _this$props.theme,
        isOpen = _this$props.isOpen,
        rootStyle = _this$props.rootStyle,
        captionStyle = _this$props.captionStyle,
        caption = _this$props.caption,
        title = _this$props.title,
        children = _this$props.children,
        onClick = _this$props.onClick,
        onClose = _this$props.onClose,
        TS = theme.getStyle(TH_ID),
        _title = title || caption.length > MAX_LENGTH ? caption : undefined,
        _styleCaption = isOpen ? (0, _extends2["default"])({}, S.CAPTION, {}, captionStyle, {}, S.OPEN) : (0, _extends2["default"])({}, S.CAPTION, {}, captionStyle, {}, S.CLOSE);

    return _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, S.ROOT, {}, rootStyle, {}, TS.ROOT)
    }, _react["default"].createElement("span", {
      className: CL,
      title: _title,
      style: _styleCaption,
      onClick: onClick,
      tabIndex: "0",
      role: "button",
      onKeyPress: this._hKeyPress
    }, caption), children, _react["default"].createElement(_SvgClose["default"], {
      style: S.SVG_CLOSE,
      onClose: onClose
    }));
  };

  return ItemHeader;
}(_react.Component);

ItemHeader.defaultProps = {
  caption: ''
};

var _default = (0, _withTheme["default"])(ItemHeader);

exports["default"] = _default;
//# sourceMappingURL=ItemHeader.js.map