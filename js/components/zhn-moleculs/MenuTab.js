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

var CL = {
  SHOW: 'button-tab button-tab--show not-selected',
  NOT_SHOW: 'button-tab not-selected'
};

var MenuTab = function (_Component) {
  (0, _inherits3.default)(MenuTab, _Component);

  function MenuTab() {
    (0, _classCallCheck3.default)(this, MenuTab);
    return (0, _possibleConstructorReturn3.default)(this, (MenuTab.__proto__ || Object.getPrototypeOf(MenuTab)).apply(this, arguments));
  }

  (0, _createClass3.default)(MenuTab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onReg = this.props.onReg;

      if (typeof onReg === 'function') {
        onReg(this.btNode);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          isShow = _props.isShow,
          caption = _props.caption,
          style = _props.style,
          children = _props.children,
          onClick = _props.onClick,
          _rootClass = isShow ? CL.SHOW : CL.NOT_SHOW;

      return _react2.default.createElement(
        'div',
        {
          className: _rootClass,
          style: style
        },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(node) {
              return _this2.btNode = node;
            },
            onClick: onClick
          },
          _react2.default.createElement(
            'span',
            null,
            caption
          ),
          _react2.default.createElement('span', { className: 'arrow-down' })
        ),
        children
      );
    }
  }]);
  return MenuTab;
}(_react.Component);

exports.default = MenuTab;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-moleculs\MenuTab.js.map