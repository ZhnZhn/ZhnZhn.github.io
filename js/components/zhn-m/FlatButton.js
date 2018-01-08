'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

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
var S = {
  PRIMARY: {
    color: '#607d8b'
  }
};
var POINTER_EVENTS = 'pointer-events';

var FlatButton = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(FlatButton, _Component);

  function FlatButton() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FlatButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FlatButton.__proto__ || Object.getPrototypeOf(FlatButton)).call.apply(_ref, [this].concat(args))), _this), _this._setPointerEvents = function () {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';

      if (_this && _this.rootNode && _this.rootNode.style) {
        _this.rootNode.style[POINTER_EVENTS] = value;
      }
    }, _this._hClick = function (event) {
      _this._setPointerEvents('none');
      var _this$props = _this.props,
          timeout = _this$props.timeout,
          onClick = _this$props.onClick;

      setTimeout(_this._setPointerEvents, timeout);
      onClick(event);
    }, _this._refNode = function (node) {
      return _this.rootNode = node;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FlatButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          rootStyle = _props.rootStyle,
          _props$clDiv = _props.clDiv,
          clDiv = _props$clDiv === undefined ? CL.BT_DIV : _props$clDiv,
          isPrimary = _props.isPrimary,
          _props$title = _props.title,
          title = _props$title === undefined ? '' : _props$title,
          caption = _props.caption,
          accessKey = _props.accessKey,
          children = _props.children,
          _style = isPrimary ? (0, _extends3.default)({}, rootStyle, S.PRIMARY) : rootStyle,
          _className = className ? CL.BT + ' ' + className : CL.BT,
          _title = accessKey ? title + ' [' + accessKey + ']' : title;

      return _react2.default.createElement(
        'button',
        {
          type: 'button',
          ref: this._refNode,
          className: _className,
          style: _style,
          accessKey: accessKey,
          tabIndex: 0,
          title: _title,
          onClick: this._hClick
        },
        _react2.default.createElement(
          'div',
          { className: clDiv },
          _react2.default.createElement(_CaptionInput2.default, {
            className: CL.BT_SPAN,
            caption: caption,
            accessKey: accessKey
          }),
          children
        )
      );
    }
  }]);
  return FlatButton;
}(_react.Component), _class.defaultProps = {
  timeout: 3000
}, _temp2);
exports.default = FlatButton;
//# sourceMappingURL=FlatButton.js.map