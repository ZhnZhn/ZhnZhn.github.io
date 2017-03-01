'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var Styles = {
  browser: {
    paddingRight: '0'
  },
  scrollDiv: {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px',
    paddingBottom: '4px'
  }
};

var MenuBrowserDynamic = function (_Component) {
  _inherits(MenuBrowserDynamic, _Component);

  function MenuBrowserDynamic(props) {
    _classCallCheck(this, MenuBrowserDynamic);

    var _this = _possibleConstructorReturn(this, (MenuBrowserDynamic.__proto__ || Object.getPrototypeOf(MenuBrowserDynamic)).call(this));

    _this._loadMenu = function () {
      var _this$props = _this.props,
          browserType = _this$props.browserType,
          caption = _this$props.caption,
          sourceMenuUrl = _this$props.sourceMenuUrl,
          onLoadMenu = _this$props.onLoadMenu;

      onLoadMenu({ browserType: browserType, caption: caption, sourceMenuUrl: sourceMenuUrl });
    };

    _this._onStore = function (actionType, data) {
      var _this$props2 = _this.props,
          browserType = _this$props2.browserType,
          store = _this$props2.store,
          showAction = _this$props2.showAction,
          updateAction = _this$props2.updateAction,
          loadCompletedAction = _this$props2.loadCompletedAction;

      if (actionType === showAction && data === browserType) {
        _this._handleShow();
      } else if (actionType === loadCompletedAction && data.browserType === browserType) {
        _this.setState({ menuItems: data.menuItems, isLoaded: true });
      } else if (actionType === updateAction && data === browserType) {
        _this.setState({ menuItems: store.getBrowserMenu(browserType) });
      }
    };

    _this._handleHide = function () {
      _this.setState({ isShow: false });
    };

    _this._handleShow = function () {
      _this.setState({ isShow: true });
    };

    _this._renderMenuParts = function () {
      var menuItems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return menuItems.map(function (menuPart, index) {
        return _react2.default.createElement(_MenuPart2.default, _extends({ key: index }, menuPart));
      });
    };

    _this.state = {
      isShow: props.isInitShow ? true : false,
      isLoaded: false,
      menuItems: []
    };
    return _this;
  }

  _createClass(MenuBrowserDynamic, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.unsubscribe = this.props.store.listen(this._onStore);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._loadMenu();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (!nextState.isLoaded && nextState.isShow) {
        this._loadMenu();
      }
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
        { isShow: isShow, style: Styles.browser },
        _react2.default.createElement(_BrowserCaption2.default, {
          caption: caption,
          onClose: this._handleHide
        }),
        _react2.default.createElement(
          _ScrollPane2.default,
          { style: Styles.scrollDiv },
          this._renderMenuParts(menuItems),
          children
        )
      );
    }
  }]);

  return MenuBrowserDynamic;
}(_react.Component);

exports.default = MenuBrowserDynamic;
//# sourceMappingURL=MenuBrowserDynamic.js.map