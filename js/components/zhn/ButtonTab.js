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

var ButtonTab = function (_Component) {
  (0, _inherits3.default)(ButtonTab, _Component);

  function ButtonTab(props) {
    (0, _classCallCheck3.default)(this, ButtonTab);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ButtonTab.__proto__ || Object.getPrototypeOf(ButtonTab)).call(this));

    _this._handleClick = function () {
      _this.props.onClick();
      _this.setState({ isShow: !_this.state.isShow });
    };

    _this.state = {
      isShow: props.isShow
    };
    return _this;
  }

  (0, _createClass3.default)(ButtonTab, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps && nextProps.isShow !== this.state.isShow) {
        this.setState({ isShow: nextProps.isShow });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          style = _props.style,
          children = _props.children;

      var _rootClass = this.state.isShow ? 'button-tab button-tab--show not-selected' : 'button-tab not-selected';
      return _react2.default.createElement(
        'div',
        {
          className: _rootClass,
          style: Object.assign({}, style),
          onClick: this._handleClick
        },
        caption,
        children
      );
    }
  }]);
  return ButtonTab;
}(_react.Component);

process.env.NODE_ENV !== "production" ? ButtonTab.propTypes = {
  style: _react.PropTypes.object,
  isShow: _react.PropTypes.bool,
  caption: _react.PropTypes.string,
  onClick: _react.PropTypes.func
} : void 0;
exports.default = ButtonTab;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\ButtonTab.js.map