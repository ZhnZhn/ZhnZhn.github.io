'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonTab = (_temp = _class = function (_Component) {
  _inherits(ButtonTab, _Component);

  function ButtonTab(props) {
    _classCallCheck(this, ButtonTab);

    var _this = _possibleConstructorReturn(this, (ButtonTab.__proto__ || Object.getPrototypeOf(ButtonTab)).call(this));

    _this._handleClick = function () {
      _this.props.onClick();
      _this.setState({ isShow: !_this.state.isShow });
    };

    _this.state = {
      isShow: props.isShow
    };
    return _this;
  }

  _createClass(ButtonTab, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.isShow !== this.state.isShow) {
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
}(_react.Component), _class.propTypes = {
  isShow: _react.PropTypes.bool,
  caption: _react.PropTypes.string,
  style: _react.PropTypes.object,
  onClick: _react.PropTypes.func
}, _temp);
exports.default = ButtonTab;
//# sourceMappingURL=ButtonTab.js.map