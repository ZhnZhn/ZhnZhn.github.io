"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

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

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const BUILD_DATE = '20-08-2021';
const CL = "component-container";

const showSettings = _ComponentActions.default.showSettings.bind(null, _ChartStore.default.exportSettingFn());

const AppErc = () => {
  const [theme, setTheme] = (0, _react.useState)(_uiTheme.default);
  (0, _useListen.default)(_ChartStore.default, (actionType, themeName) => {
    if (actionType === _ComponentActions.ComponentActionTypes.CHANGE_THEME) {
      theme.setThemeName(themeName);
      setTheme({ ...theme
      });
    }
  });
  (0, _react.useEffect)(() => {
    _LocationSearch.default.load();

    (0, _checkBuild.default)(BUILD_DATE, _ComponentActions.default.showReload);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ThemeContext.default.Provider, {
    value: theme,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderBar.default, {
      store: _ChartStore.default,
      showSettings: showSettings
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserContainer.default, {
        store: _ChartStore.default,
        initBrowserAction: _BrowserActions.BrowserActionTypes.INIT_BROWSER_DYNAMIC,
        showDialogAction: _ComponentActions.ComponentActionTypes.SHOW_DIALOG,
        onCloseDialog: _ComponentActions.default.closeDialog
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_About.default, {
        store: _ChartStore.default,
        isInitShow: true
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompContainer.default, {
        store: _ChartStore.default,
        addAction: _ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogContainer.default, {
      store: _ChartStore.default
    })]
  });
};

var _default = AppErc;
exports.default = _default;
//# sourceMappingURL=AppErc.js.map