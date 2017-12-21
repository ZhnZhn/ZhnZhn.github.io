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

var MenuTitle = function (_Component) {
  (0, _inherits3.default)(MenuTitle, _Component);

  function MenuTitle() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MenuTitle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuTitle.__proto__ || Object.getPrototypeOf(MenuTitle)).call.apply(_ref, [this].concat(args))), _this), _this._refNode = function (n) {
      return _this._node = n;
    }, _this.focus = function () {
      if (_this._node) {
        _this._node.focus();
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MenuTitle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$title = _props.title,
          title = _props$title === undefined ? '' : _props$title,
          onClick = _props.onClick;

      return _react2.default.createElement(
        'div',
        {
          ref: this._refNode,
          className: CL.ITEM,
          style: _Style2.default.TITLE,
          role: 'menuitem',
          tabIndex: '0',
          onClick: onClick,
          onKeyPress: function onKeyPress(evt) {
            evt.preventDefault();
            var which = evt.which;

            if (which === 13 || which === 32) {
              onClick();
            }
          }
        },
        title,
        _react2.default.createElement(
          'span',
          { style: _Style2.default.TITLE_ARROW },
          '<'
        )
      );
    }
  }]);
  return MenuTitle;
}(_react.Component);

exports.default = MenuTitle;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-slider\MenuTitle.js.map