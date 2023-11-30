"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("./uiApi");
var _LocationSearch = _interopRequireDefault(require("../flux/logic/LocationSearch"));
var _ChartStore = _interopRequireDefault(require("../flux/stores/ChartStore"));
var _ComponentActions = require("../flux/actions/ComponentActions");
var _browserStore = require("../flux/stores/browserStore");
var _ChartActions = require("../flux/actions/ChartActions");
var _useHotKeysHandler = _interopRequireDefault(require("./hotkeys/useHotKeysHandler"));
var _HeaderBar = _interopRequireDefault(require("./header/HeaderBar"));
var _BrowserContainer = _interopRequireDefault(require("./browser-container/BrowserContainer"));
var _About = _interopRequireDefault(require("./about/About"));
var _CompContainer = _interopRequireDefault(require("./zhn-containers/CompContainer"));
var _DialogContainer = _interopRequireDefault(require("./dialogs/DialogContainer"));
var _checkBuild = _interopRequireDefault(require("./checkBuild"));
var _jsxRuntime = require("react/jsx-runtime");
const BUILD_DATE = '30-11-2023',
  CL_COMP_CONTAINER = "component-container";
const showSettings = (0, _uiApi.bindTo)(_ComponentActions.ComponentActions.showSettings, _ChartStore.default.exportSettingFn());
const AppErc = () => {
  (0, _uiApi.useEffect)(() => {
    _LocationSearch.default.load();
    (0, _checkBuild.default)(BUILD_DATE, _ComponentActions.ComponentActions.showReload);
  }, []);
  (0, _useHotKeysHandler.default)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderBar.default, {
      showSettings: showSettings
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_COMP_CONTAINER,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserContainer.default, {
        useMsInitBrowser: _browserStore.useMsInitBrowser
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_About.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompContainer.default, {
        addAction: _ChartActions.CHAT_INIT_AND_SHOW
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogContainer.default, {
      store: _ChartStore.default
    })]
  });
};
var _default = exports.default = AppErc;
//# sourceMappingURL=AppErc.js.map