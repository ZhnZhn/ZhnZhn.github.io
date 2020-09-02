"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _useListen = _interopRequireDefault(require("./hooks/useListen"));

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

var _uiTheme = _interopRequireDefault(require("./styles/uiTheme"));

var _ThemeContext = _interopRequireDefault(require("./hoc/ThemeContext"));

var _checkBuild = _interopRequireDefault(require("./checkBuild"));

var BUILD_DATE = '02-09-2020';
var CL = "component-container";

var showSettings = _ComponentActions["default"].showSettings.bind(null, _ChartStore["default"].exportSettingFn());

var AppErc = function AppErc() {
  var _useState = (0, _react.useState)(_uiTheme["default"]),
      theme = _useState[0],
      setTheme = _useState[1];

  (0, _useListen["default"])(_ChartStore["default"], function (actionType, themeName) {
    if (actionType === _ComponentActions.ComponentActionTypes.CHANGE_THEME) {
      theme.setThemeName(themeName);
      setTheme((0, _extends2["default"])({}, theme));
    }
  });
  (0, _react.useEffect)(function () {
    _LocationSearch["default"].load();

    (0, _checkBuild["default"])(BUILD_DATE, _ComponentActions["default"].showReload);
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_ThemeContext["default"].Provider, {
    value: theme
  }, /*#__PURE__*/_react["default"].createElement(_HeaderBar["default"], {
    store: _ChartStore["default"],
    showSettings: showSettings
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: CL
  }, /*#__PURE__*/_react["default"].createElement(_BrowserContainer["default"], {
    store: _ChartStore["default"],
    initBrowserAction: _BrowserActions.BrowserActionTypes.INIT_BROWSER_DYNAMIC,
    showDialogAction: _ComponentActions.ComponentActionTypes.SHOW_DIALOG,
    onCloseDialog: _ComponentActions["default"].closeDialog
  }), /*#__PURE__*/_react["default"].createElement(_About["default"], {
    store: _ChartStore["default"],
    isInitShow: true
  }), /*#__PURE__*/_react["default"].createElement(_CompContainer["default"], {
    store: _ChartStore["default"],
    addAction: _ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART
  })), /*#__PURE__*/_react["default"].createElement(_DialogContainer["default"], {
    store: _ChartStore["default"]
  }));
};

var _default = AppErc;
exports["default"] = _default;
//# sourceMappingURL=AppErc.js.map