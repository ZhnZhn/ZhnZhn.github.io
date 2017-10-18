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
  (0, _inherits3.default)(MenuBrowserDynamic, _Component);

  function MenuBrowserDynamic(props) {
    (0, _classCallCheck3.default)(this, MenuBrowserDynamic);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MenuBrowserDynamic.__proto__ || Object.getPrototypeOf(MenuBrowserDynamic)).call(this));

    _this._loadMenu = function () {
      var _this$props = _this.props,
          browserType = _this$props.browserType,
          caption = _this$props.caption,
          sourceMenuUrl = _this$props.sourceMenuUrl,
          dialogsId = _this$props.dialogsId,
          onLoadMenu = _this$props.onLoadMenu;

      onLoadMenu({ browserType: browserType, caption: caption, sourceMenuUrl: sourceMenuUrl, dialogsId: dialogsId });
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
        return _react2.default.createElement(_MenuPart2.default, (0, _extends3.default)({ key: index }, menuPart));
      });
    };

    _this.state = {
      isShow: props.isInitShow ? true : false,
      isLoaded: false,
      menuItems: []
    };
    return _this;
  }

  (0, _createClass3.default)(MenuBrowserDynamic, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.listen(this._onStore);
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\MenuBrowserDynamic.js.map