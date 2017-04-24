'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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
  (0, _inherits3.default)(MenuBrowser, _Component);

  function MenuBrowser(props) {
    (0, _classCallCheck3.default)(this, MenuBrowser);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MenuBrowser.__proto__ || Object.getPrototypeOf(MenuBrowser)).call(this));

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

  (0, _createClass3.default)(MenuBrowser, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
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
      return _react2.default.createElement(_MenuPart2.default, (0, _extends3.default)({ key: index }, menuPart));
    });
  };
}, _temp);
exports.default = MenuBrowser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\MenuBrowser.js.map