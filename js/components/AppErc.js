"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _LocationSearch = _interopRequireDefault(require("../flux/logic/LocationSearch"));

var _ChartStore = _interopRequireDefault(require("../flux/stores/ChartStore"));

var _ComponentActions = _interopRequireWildcard(require("../flux/actions/ComponentActions"));

var _BrowserActions = require("../flux/actions/BrowserActions");

var _ChartActions = require("../flux/actions/ChartActions");

var _HeaderBar = _interopRequireDefault(require("./header/HeaderBar"));

var _BrowserContainer = _interopRequireDefault(require("./browser-container/BrowserContainer"));

var _About = _interopRequireDefault(require("./about/About"));

var _CompContainer = _interopRequireDefault(require("./zhn-containers/CompContainer"));

var _DialogContainer = _interopRequireDefault(require("./dialogs/DialogContainer"));

var _theme = _interopRequireDefault(require("./styles/theme"));

var _ThemeContext = _interopRequireDefault(require("./hoc/ThemeContext"));

var _checkBuild = _interopRequireDefault(require("./checkBuild"));

var BUILD_DATE = '15-05-2020';
var CL = "component-container";

var AppErc =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(AppErc, _Component);

  function AppErc() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      theme: _theme["default"]
    };

    _this._onStore = function (actionType, themeName) {
      if (actionType === _ComponentActions.ComponentActionTypes.CHANGE_THEME) {
        _this.setState(function (_ref) {
          var theme = _ref.theme;
          theme.setThemeName(themeName);
          return {
            theme: (0, _extends2["default"])({}, theme)
          };
        });
      }
    };

    return _this;
  }

  var _proto = AppErc.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubsribe = _ChartStore["default"].listen(this._onStore);

    _LocationSearch["default"].load();

    (0, _checkBuild["default"])(BUILD_DATE, _ComponentActions["default"].showReload);
  };

  _proto.componentWillUnmout = function componentWillUnmout() {
    this.unsubsribe();
  };

  _proto.render = function render() {
    var theme = this.state.theme;
    return _react["default"].createElement(_ThemeContext["default"].Provider, {
      value: theme
    }, _react["default"].createElement(_HeaderBar["default"], {
      store: _ChartStore["default"]
    }), _react["default"].createElement("div", {
      className: CL
    }, _react["default"].createElement(_BrowserContainer["default"], {
      store: _ChartStore["default"],
      initBrowserAction: _BrowserActions.BrowserActionTypes.INIT_BROWSER_DYNAMIC,
      showDialogAction: _ComponentActions.ComponentActionTypes.SHOW_DIALOG,
      onCloseDialog: _ComponentActions["default"].closeDialog
    }), _react["default"].createElement(_About["default"], {
      store: _ChartStore["default"],
      isShow: true
    }), _react["default"].createElement(_CompContainer["default"], {
      store: _ChartStore["default"],
      addAction: _ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART
    })), _react["default"].createElement(_DialogContainer["default"], {
      store: _ChartStore["default"]
    }));
  };

  return AppErc;
}(_react.Component);

var _default = AppErc;
exports["default"] = _default;
//# sourceMappingURL=AppErc.js.map