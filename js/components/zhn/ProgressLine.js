"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var CL = "progress-line";
var T = {
  WIDTH: 'width 350ms linear',
  OPACITY: 'opacity 250ms linear'
};

var _crStyle = function _crStyle(backgroundColor, opacity, width, transition) {
  return {
    backgroundColor: backgroundColor,
    width: width,
    opacity: opacity,
    transition: transition
  };
};

var ProgressLine = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ProgressLine, _Component);

  function ProgressLine() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.wasCompleted = false;
    _this.idCompleted = null;
    _this.wasOpacied = false;
    _this.idOpacied = null;
    return _this;
  }

  var _proto = ProgressLine.prototype;

  /*
  constructor(props){
    super();
    this.wasCompleted = false;
    this.idCompleted = null;
    this.wasOpacied = false;
    this.idOpacied = null;
  }
  */
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.idCompleted) {
      clearTimeout(this.idCompleted);
    }

    if (this.idOpacied) {
      clearTimeout(this.idOpacied);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    if (this.wasCompleted) {
      this.idCompleted = setTimeout(function () {
        _this2.idCompleted = null;

        _this2.forceUpdate();
      }, 800);
    } else if (this.wasOpacied) {
      this.idOpacied = setTimeout(function () {
        _this2.idOpacied = null;

        _this2.forceUpdate();
      }, 800);
    }
  };

  _proto.render = function render() {
    var color = this.props.color;

    var _style;

    if (this.wasOpacied) {
      _style = _crStyle(color, 1, 0);
      this.wasOpacied = false;
    } else if (this.wasCompleted) {
      _style = _crStyle(color, 0, '100%', T.OPACITY);
      this.wasCompleted = false;
      this.wasOpacied = true;
    } else {
      var completed = this.props.completed;

      if (completed < 0) {
        completed = 0;
      } else if (completed >= 100) {
        completed = 100;
        this.wasCompleted = true;
      }

      _style = _crStyle(color, 1, completed + '%', T.WIDTH);
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: CL,
      style: _style
    });
  };

  return ProgressLine;
}(_react.Component);

ProgressLine.defaultProps = {
  color: '#2f7ed8'
};
var _default = ProgressLine;
exports["default"] = _default;
//# sourceMappingURL=ProgressLine.js.map