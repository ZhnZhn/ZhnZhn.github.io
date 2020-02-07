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
    paddingRight: 0
  }
};

var MenuBrowserDynamic =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MenuBrowserDynamic, _Component);

  function MenuBrowserDynamic(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._loadMenu = function () {
      var _this$props = _this.props,
          browserType = _this$props.browserType,
          caption = _this$props.caption,
          sourceMenuUrl = _this$props.sourceMenuUrl,
          onLoadMenu = _this$props.onLoadMenu;
      onLoadMenu({
        browserType: browserType,
        caption: caption,
        sourceMenuUrl: sourceMenuUrl
      });
    };

    _this._onStore = function (actionType, data) {
      var _this$props2 = _this.props,
          browserType = _this$props2.browserType,
          store = _this$props2.store,
          showAction = _this$props2.showAction,
          updateAction = _this$props2.updateAction,
          loadCompletedAction = _this$props2.loadCompletedAction;

      if (data === browserType) {
        if (actionType === showAction) {
          _this._hShow();
        } else if (actionType === updateAction) {
          _this.setState({
            menuItems: store.getBrowserMenu(browserType)
          });
        }
      } else if ((data == null ? void 0 : data.browserType) === browserType && actionType === loadCompletedAction) {
        _this.setState({
          menuItems: data.menuItems,
          isLoaded: true
        });
      }
    };

    _this._hHide = function () {
      _this.setState({
        isShow: false
      });
    };

    _this._hShow = function () {
      _this.setState({
        isShow: true
      });
    };

    _this._renderMenuParts = function (menuItems) {
      if (menuItems === void 0) {
        menuItems = [];
      }

      return menuItems.map(function (menuPart, index) {
        return _react["default"].createElement(_MenuPart["default"], (0, _extends2["default"])({
          key: index
        }, menuPart));
      });
    };

    _this.state = {
      isShow: !!props.isInitShow,
      isLoaded: false,
      menuItems: []
    };
    return _this;
  }

  var _proto = MenuBrowserDynamic.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);

    this._loadMenu();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var _this$state = this.state,
        isLoaded = _this$state.isLoaded,
        isShow = _this$state.isShow;

    if (!isLoaded && isShow) {
      this._loadMenu();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        caption = _this$props3.caption,
        children = _this$props3.children,
        _this$state2 = this.state,
        menuItems = _this$state2.menuItems,
        isShow = _this$state2.isShow;
    return _react["default"].createElement(_Browser["default"], {
      isShow: isShow,
      style: S.BROWSER
    }, _react["default"].createElement(_BrowserCaption["default"], {
      caption: caption,
      onClose: this._hHide
    }), _react["default"].createElement(_ScrollPane["default"], {
      className: CL_SCROLL
    }, this._renderMenuParts(menuItems), children));
  };

  return MenuBrowserDynamic;
}(_react.Component);

var _default = MenuBrowserDynamic;
exports["default"] = _default;
//# sourceMappingURL=MenuBrowserDynamic.js.map