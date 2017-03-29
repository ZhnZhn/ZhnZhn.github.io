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

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = {
  SHOW_HIDE: {
    position: 'absolute', top: '0px', left: '0px'
  }
};

var ButtonParentTab = function (_Component) {
  (0, _inherits3.default)(ButtonParentTab, _Component);

  function ButtonParentTab(props) {
    (0, _classCallCheck3.default)(this, ButtonParentTab);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ButtonParentTab.__proto__ || Object.getPrototypeOf(ButtonParentTab)).call(this));

    _this._handleClick = function () {
      _this.setState({ isShow: !_this.state.isShow });
    };

    _this.state = {
      isShow: !!props.isShow
    };
    return _this;
  }

  (0, _createClass3.default)(ButtonParentTab, [{
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
          children = _props.children,
          isShow = this.state.isShow,
          _rootClass = isShow ? 'button-tab button-tab--show not-selected' : 'button-tab not-selected';

      return _react2.default.createElement(
        'div',
        {
          className: _rootClass,
          style: Object.assign({}, STYLE.ROOT, style)
        },
        _react2.default.createElement(
          'div',
          { onClick: this._handleClick },
          _react2.default.createElement(
            'span',
            null,
            caption
          ),
          _react2.default.createElement('span', { className: 'arrow-down' })
        ),
        _react2.default.createElement(
          _ShowHide2.default,
          {
            style: STYLE.SHOW_HIDE,
            isShow: isShow
          },
          children
        )
      );
    }
  }]);
  return ButtonParentTab;
}(_react.Component);

process.env.NODE_ENV !== "production" ? ButtonParentTab.propTypes = {
  style: _react.PropTypes.object,
  isShow: _react.PropTypes.bool,
  caption: _react.PropTypes.string,
  children: _react.PropTypes.element
} : void 0;
exports.default = ButtonParentTab;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-moleculs\ButtonParentTab.js.map