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

var _MenuTab = require('./MenuTab');

var _MenuTab2 = _interopRequireDefault(_MenuTab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuTabItem = function (_Component) {
  (0, _inherits3.default)(MenuTabItem, _Component);

  function MenuTabItem(props) {
    (0, _classCallCheck3.default)(this, MenuTabItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MenuTabItem.__proto__ || Object.getPrototypeOf(MenuTabItem)).call(this));

    _this._handleClickTab = function () {
      _this.setState({ isShow: !_this.state.isShow });
    };

    _this._handleCloseTab = function (event) {
      if (!_this.tabNode.contains(event.target)) {
        _this.setState({ isShow: false });
      }
    };

    _this._handleRegTab = function (node) {
      _this.tabNode = node;
    };

    _this._renderChildren = function (children, isShow) {
      return _react2.default.Children.map(children, function (child) {
        return _react2.default.cloneElement(child, {
          isShow: isShow,
          onClose: _this._handleCloseTab
        });
      });
    };

    _this.state = {
      isShow: false
    };
    return _this;
  }

  (0, _createClass3.default)(MenuTabItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          caption = _props.caption,
          children = _props.children,
          isShow = this.state.isShow;

      return _react2.default.createElement(
        _MenuTab2.default,
        {
          style: style,
          isShow: isShow,
          caption: caption,
          onClick: this._handleClickTab,
          onReg: this._handleRegTab
        },
        this._renderChildren(children, isShow)
      );
    }
  }]);
  return MenuTabItem;
}(_react.Component);

exports.default = MenuTabItem;
//# sourceMappingURL=MenuTabItem.js.map