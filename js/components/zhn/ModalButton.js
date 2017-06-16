'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var ModalButton = function (_Component) {
  (0, _inherits3.default)(ModalButton, _Component);

  function ModalButton() {
    (0, _classCallCheck3.default)(this, ModalButton);
    return (0, _possibleConstructorReturn3.default)(this, (ModalButton.__proto__ || Object.getPrototypeOf(ModalButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(ModalButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onReg = this.props.onReg;

      if (typeof onReg === 'function') {
        onReg(this.rootNode);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          type = _props.type,
          style = _props.style,
          title = _props.title,
          caption = _props.caption,
          children = _props.children,
          onClick = _props.onClick;

      var _className = void 0;
      switch (type) {
        case 'TypeA':
          _className = 'button-type-a';break;
        case 'TypeC':
          _className = 'button-type-c';break;
        default:
          _className = 'button-type-b';
      }

      return _react2.default.createElement(
        'button',
        {
          ref: function ref(n) {
            return _this2.rootNode = n;
          },
          className: _className,
          style: style,
          title: title,
          onClick: onClick
        },
        caption,
        children
      );
    }
  }]);
  return ModalButton;
}(_react.Component);

exports.default = ModalButton;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ModalButton.js.map