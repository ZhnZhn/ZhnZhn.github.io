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

var _fKeyPressed = function _fKeyPressed(onClick) {
  return function (evt) {
    evt.preventDefault();
    var which = evt.which;

    if (which === 13 || which === 32) {
      onClick();
    }
  };
};

var MenuAriaItem = function (_Component) {
  (0, _inherits3.default)(MenuAriaItem, _Component);

  function MenuAriaItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MenuAriaItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuAriaItem.__proto__ || Object.getPrototypeOf(MenuAriaItem)).call.apply(_ref, [this].concat(args))), _this), _this._ref = function (n) {
      return _this._node = n;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MenuAriaItem, [{
    key: 'componentDidMount',


    /*
    static propTypes = {
      onClick: PropTypes.func,
      onReg: PropTypes.func
    }
    */

    value: function componentDidMount() {
      var onReg = this.props.onReg;

      if (this._node && typeof onReg === 'function') {
        onReg(this._node);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          onClick = _props.onClick,
          onReg = _props.onReg,
          rest = (0, _objectWithoutProperties3.default)(_props, ['children', 'onClick', 'onReg']);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, rest, {
          ref: onReg ? this._ref : void 0,
          role: 'menuitem',
          tabIndex: '0',
          onClick: onClick,
          onKeyPress: _fKeyPressed(onClick)
        }),
        children
      );
    }
  }]);
  return MenuAriaItem;
}(_react.Component);

exports.default = MenuAriaItem;
//# sourceMappingURL=MenuAriaItem.js.map