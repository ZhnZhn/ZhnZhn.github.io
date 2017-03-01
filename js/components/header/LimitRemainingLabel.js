'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STYLE = {
  LABEL: {
    display: 'inline-block',
    color: '#2f7ed8',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var LimitRemainingLabel = function (_Component) {
  _inherits(LimitRemainingLabel, _Component);

  function LimitRemainingLabel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LimitRemainingLabel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LimitRemainingLabel.__proto__ || Object.getPrototypeOf(LimitRemainingLabel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: ''
    }, _this._onStore = function (value) {
      if (!(value == null)) {
        _this.setState({ value: value });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LimitRemainingLabel, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var store = this.props.store;

      this.unsubscribe = store.listenWithLimitRemaining(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var style = this.props.style,
          value = this.state.value;


      return _react2.default.createElement(
        'span',
        { style: Object.assign({}, STYLE.LABEL, style) },
        value
      );
    }
  }]);

  return LimitRemainingLabel;
}(_react.Component);

exports.default = LimitRemainingLabel;
//# sourceMappingURL=LimitRemainingLabel.js.map