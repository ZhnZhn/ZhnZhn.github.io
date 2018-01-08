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

var _Style = require('./Style');

var _Style2 = _interopRequireDefault(_Style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  ITEM: 'menu-item'
};

var MenuItem = function (_Component) {
  (0, _inherits3.default)(MenuItem, _Component);

  function MenuItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MenuItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call.apply(_ref, [this].concat(args))), _this), _this._ref = function (n) {
      return _this._node = n;
    }, _this.focus = function () {
      if (_this._node) {
        _this._node.focus();
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MenuItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          item = _props.item,
          onClick = _props.onClick,
          text = item.text,
          type = item.type,
          _style = type === 'l' ? _Style2.default.ITEM_L : _Style2.default.ITEM_T;

      return _react2.default.createElement(
        'div',
        {
          ref: this._ref,
          className: CL.ITEM,
          style: _style,
          tabIndex: '0',
          role: 'menuitem',
          onClick: onClick,
          onKeyPress: function onKeyPress(evt) {
            evt.preventDefault();
            var which = evt.which;

            if (which === 13 || which === 32) {
              onClick();
            }
          }
        },
        text
      );
    }
  }]);
  return MenuItem;
}(_react.Component);

exports.default = MenuItem;
//# sourceMappingURL=MenuItem.js.map