'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  ROOT: {
    display: 'inline-block',
    cursor: 'pointer'
  }
};

var SpanButton = function (_Component) {
  (0, _inherits3.default)(SpanButton, _Component);

  function SpanButton() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SpanButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SpanButton.__proto__ || Object.getPrototypeOf(SpanButton)).call.apply(_ref, [this].concat(args))), _this), _this._hKeyDown = function (event) {
      if (event.key === 'Enter' || event.key === " ") {
        event.preventDefault();
        _this.props.onClick();
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SpanButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          _props$caption = _props.caption,
          caption = _props$caption === undefined ? '' : _props$caption,
          onClick = _props.onClick,
          rest = (0, _objectWithoutProperties3.default)(_props, ['style', 'caption', 'onClick']);

      return _react2.default.createElement(
        'span',
        (0, _extends3.default)({
          role: 'button',
          tabIndex: '0',
          style: (0, _extends3.default)({}, S.ROOT, style),
          onClick: onClick,
          onKeyDown: this._hKeyDown
        }, rest),
        caption
      );
    }
  }]);
  return SpanButton;
}(_react.Component);

exports.default = SpanButton;
//# sourceMappingURL=SpanButton.js.map