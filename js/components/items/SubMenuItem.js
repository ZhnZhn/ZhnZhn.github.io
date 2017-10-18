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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  ACTIVE: {
    color: '#a487d4',
    fontWeight: 'bold'
  }
};

var SubMenuItem = function (_Component) {
  (0, _inherits3.default)(SubMenuItem, _Component);

  function SubMenuItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SubMenuItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SubMenuItem.__proto__ || Object.getPrototypeOf(SubMenuItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isActive: false
    }, _this._handleClick = function () {
      _this.props.onClick();
      _this.setState(function (prev) {
        return { isActive: !prev.isActive };
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SubMenuItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          isNotActive = _props.isNotActive,
          onClick = _props.onClick;

      if (typeof onClick !== 'function') {
        return null;
      }

      var isActive = this.state.isActive,
          _style = isActive && !isNotActive ? STYLE.ACTIVE : null;


      return _react2.default.createElement(
        'div',
        {
          className: 'bt-sub-item',
          style: _style,
          onClick: this._handleClick
        },
        caption
      );
    }
  }]);
  return SubMenuItem;
}(_react.Component);

process.env.NODE_ENV !== "production" ? SubMenuItem.propTypes = {
  caption: _propTypes2.default.string,
  onClick: _propTypes2.default.func
} : void 0;
exports.default = SubMenuItem;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\items\SubMenuItem.js.map