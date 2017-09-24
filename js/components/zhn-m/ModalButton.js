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

var _CaptionInput = require('./CaptionInput');

var _CaptionInput2 = _interopRequireDefault(_CaptionInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  BT: 'bt-flat',
  BT_DIV: 'bt-flat__div',
  BT_SPAN: 'bt-flat__span'
};

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
          _props$className = _props.className,
          className = _props$className === undefined ? '' : _props$className,
          rootStyle = _props.rootStyle,
          _props$clDiv = _props.clDiv,
          clDiv = _props$clDiv === undefined ? CL.BT_DIV : _props$clDiv,
          title = _props.title,
          caption = _props.caption,
          accessKey = _props.accessKey,
          children = _props.children,
          onClick = _props.onClick,
          _btCl = (CL.BT + ' ' + className).trim();

      return _react2.default.createElement(
        'button',
        {
          ref: function ref(n) {
            return _this2.rootNode = n;
          },
          className: _btCl,
          style: rootStyle,
          type: 'button',
          tabIndex: 0,
          title: title,
          accessKey: accessKey,
          onClick: onClick
        },
        _react2.default.createElement(
          'div',
          { className: clDiv },
          _react2.default.createElement(
            _CaptionInput2.default,
            {
              className: CL.BT_SPAN,
              caption: caption,
              accessKey: accessKey
            },
            children
          )
        )
      );
    }
  }]);
  return ModalButton;
}(_react.Component);

exports.default = ModalButton;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-m\ModalButton.js.map