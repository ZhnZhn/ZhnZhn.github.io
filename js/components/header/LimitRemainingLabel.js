"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var S = {
  LABEL: {
    display: 'inline-block',
    color: '#2f7ed8',
    paddingRight: 8,
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var LimitRemainingLabel = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(LimitRemainingLabel, _Component);

  function LimitRemainingLabel() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      value: ''
    };

    _this._onStore = function (value) {
      if (!(value == null)) {
        _this.setState({
          value: value
        });
      }
    };

    return _this;
  }

  var _proto = LimitRemainingLabel.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var store = this.props.store;
    this.unsubscribe = store.listenLimitRemaining(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var style = this.props.style,
        value = this.state.value;
    return /*#__PURE__*/_react["default"].createElement("span", {
      style: (0, _extends2["default"])({}, S.LABEL, style)
    }, value);
  };

  return LimitRemainingLabel;
}(_react.Component);

var _default = LimitRemainingLabel;
exports["default"] = _default;
//# sourceMappingURL=LimitRemainingLabel.js.map