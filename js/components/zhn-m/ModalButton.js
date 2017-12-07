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
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ModalButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ModalButton.__proto__ || Object.getPrototypeOf(ModalButton)).call.apply(_ref, [this].concat(args))), _this), _this._refNode = function (n) {
      return _this.rootNode = n;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
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
      var _props = this.props,
          _props$className = _props.className,
          className = _props$className === undefined ? '' : _props$className,
          rootStyle = _props.rootStyle,
          _props$clDiv = _props.clDiv,
          clDiv = _props$clDiv === undefined ? CL.BT_DIV : _props$clDiv,
          _props$title = _props.title,
          title = _props$title === undefined ? '' : _props$title,
          caption = _props.caption,
          accessKey = _props.accessKey,
          children = _props.children,
          onClick = _props.onClick,
          _className = (CL.BT + ' ' + className).trim(),
          _title = accessKey ? title + ' [' + accessKey + ']' : title;

      return _react2.default.createElement(
        'button',
        {
          type: 'button',
          ref: this._refNode,
          className: _className,
          style: rootStyle,
          accessKey: accessKey,
          title: _title,
          tabIndex: 0,
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