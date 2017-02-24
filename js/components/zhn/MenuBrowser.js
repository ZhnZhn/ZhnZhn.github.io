'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Browser = require('./Browser');

var _Browser2 = _interopRequireDefault(_Browser);

var _BrowserCaption = require('./BrowserCaption');

var _BrowserCaption2 = _interopRequireDefault(_BrowserCaption);

var _ScrollPane = require('./ScrollPane');

var _ScrollPane2 = _interopRequireDefault(_ScrollPane);

var _MenuPart = require('./MenuPart');

var _MenuPart2 = _interopRequireDefault(_MenuPart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var S = {
  BROWSER: {
    paddingRight: '0px'
  },
  SCROLL_DIV: {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px',
    paddingBottom: '4px'
  }
};

var MenuBrowser = (_temp = _class = function (_Component) {
  _inherits(MenuBrowser, _Component);

  function MenuBrowser(props) {
    _classCallCheck(this, MenuBrowser);

    var _this = _possibleConstructorReturn(this, (MenuBrowser.__proto__ || Object.getPrototypeOf(MenuBrowser)).call(this));

    _initialiseProps.call(_this);

    var store = props.store,
        browserType = props.browserType,
        isShow = props.isShow;

    _this.state = {
      isShow: isShow ? true : false,
      menuItems: store.getBrowserMenu(browserType)
    };
    return _this;
  }

  _createClass(MenuBrowser, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.unsubscribe = this.props.store.listen(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          children = _props.children,
          _state = this.state,
          menuItems = _state.menuItems,
          isShow = _state.isShow;

      return _react2.default.createElement(
        _Browser2.default,
        { isShow: isShow, style: S.BROWSER },
        _react2.default.createElement(_BrowserCaption2.default, {
          caption: caption,
          onClose: this._handleHide
        }),
        _react2.default.createElement(
          _ScrollPane2.default,
          { style: S.SCROLL_DIV },
          this._renderMenuParts(menuItems),
          children
        )
      );
    }
  }]);

  return MenuBrowser;
}(_react.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this._onStore = function (actionType, data) {
    var _props2 = _this2.props,
        browserType = _props2.browserType,
        store = _props2.store,
        showAction = _props2.showAction,
        updateAction = _props2.updateAction;

    if (actionType === showAction && data === browserType) {
      _this2._handleShow();
    } else if (actionType === updateAction && data === browserType) {
      _this2.setState({ menuItems: store.getBrowserMenu(browserType) });
    }
  };

  this._handleHide = function () {
    _this2.setState({ isShow: false });
  };

  this._handleShow = function () {
    _this2.setState({ isShow: true });
  };

  this._renderMenuParts = function (menuItems) {
    return menuItems.map(function (menuPart, index) {
      return _react2.default.createElement(_MenuPart2.default, _extends({ key: index }, menuPart));
    });
  };
}, _temp);
exports.default = MenuBrowser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\MenuBrowser.js.map