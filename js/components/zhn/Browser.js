"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

//import PropTypes from "prop-types";
var TH_ID = 'BROWSER';
var CL = {
  BROWSER: 'browser-container',
  SHOW: 'show-popup'
};
var S = {
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

var Browser =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(Browser, _Component);

  function Browser() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Browser.prototype;

  /*
  static propTypes = {
    theme: PropTypes.object
    isShow: PropTypes.bool,
    style: PropTypes.object
  }
  */
  _proto.render = function render() {
    var _this$props = this.props,
        theme = _this$props.theme,
        isShow = _this$props.isShow,
        style = _this$props.style,
        children = _this$props.children,
        TS = theme.getStyle(TH_ID),
        _styleOpen = isShow ? S.BLOCK : S.NONE,
        _clOpen = isShow ? CL.SHOW : '',
        _clRoot = CL.BROWSER + " " + _clOpen;

    return _react["default"].createElement("div", {
      className: _clRoot,
      style: (0, _extends2["default"])({}, style, {}, _styleOpen, {}, TS.ROOT)
    }, children);
  };

  return Browser;
}(_react.Component);

var _default = (0, _withTheme["default"])(Browser);

exports["default"] = _default;
//# sourceMappingURL=Browser.js.map