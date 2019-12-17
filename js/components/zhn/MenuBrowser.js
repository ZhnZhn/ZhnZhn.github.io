"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Browser = _interopRequireDefault(require("./Browser"));

var _BrowserCaption = _interopRequireDefault(require("./BrowserCaption"));

var _ScrollPane = _interopRequireDefault(require("./ScrollPane"));

var _MenuPart = _interopRequireDefault(require("./MenuPart"));

var CL_SCROLL = 'scroll-container-y scroll-menu';
var S = {
  BROWSER: {
    paddingRight: '0px'
  }
};

var MenuBrowser =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MenuBrowser, _Component);

  function MenuBrowser(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          browserType = _this$props.browserType,
          store = _this$props.store,
          showAction = _this$props.showAction,
          updateAction = _this$props.updateAction;

      if (actionType === showAction && data === browserType) {
        _this._handleShow();
      } else if (actionType === updateAction && data === browserType) {
        _this.setState({
          menuItems: store.getBrowserMenu(browserType)
        });
      }
    };

    _this._handleHide = function () {
      _this.setState({
        isShow: false
      });
    };

    _this._handleShow = function () {
      _this.setState({
        isShow: true
      });
    };

    _this._renderMenuParts = function (menuItems) {
      return menuItems.map(function (menuPart, index) {
        return _react["default"].createElement(_MenuPart["default"], (0, _extends2["default"])({
          key: index
        }, menuPart));
      });
    };

    var _store = props.store,
        _browserType = props.browserType,
        isShow = props.isShow;
    _this.state = {
      isShow: isShow ? true : false,
      menuItems: _store.getBrowserMenu(_browserType)
    };
    return _this;
  }

  var _proto = MenuBrowser.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        caption = _this$props2.caption,
        children = _this$props2.children,
        _this$state = this.state,
        menuItems = _this$state.menuItems,
        isShow = _this$state.isShow;
    return _react["default"].createElement(_Browser["default"], {
      isShow: isShow,
      style: S.BROWSER
    }, _react["default"].createElement(_BrowserCaption["default"], {
      caption: caption,
      onClose: this._handleHide
    }), _react["default"].createElement(_ScrollPane["default"], {
      className: CL_SCROLL
    }, this._renderMenuParts(menuItems), children));
  };

  return MenuBrowser;
}(_react.Component);

var _default = MenuBrowser;
exports["default"] = _default;
//# sourceMappingURL=MenuBrowser.js.map