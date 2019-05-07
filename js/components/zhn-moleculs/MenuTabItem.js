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

  function MenuTabItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MenuTabItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MenuTabItem.__proto__ || Object.getPrototypeOf(MenuTabItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isShow: false
    }, _this._hClickTab = function () {
      _this.setState(function (prevState) {
        return {
          isShow: !prevState.isShow
        };
      });
    }, _this._hCloseTab = function (event) {
      _this.setState({ isShow: false });
    }, _this._hRegTab = function (node) {
      _this.tabNode = node;
    }, _this._renderChildren = function (children, isShow) {
      return _react2.default.Children.map(children, function (child) {
        return _react2.default.cloneElement(child, {
          isShow: isShow,
          onClose: _this._hCloseTab
        });
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
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
          onClick: this._hClickTab,
          onReg: this._hRegTab
        },
        this._renderChildren(children, isShow)
      );
    }
  }]);
  return MenuTabItem;
}(_react.Component);

exports.default = MenuTabItem;
//# sourceMappingURL=MenuTabItem.js.map