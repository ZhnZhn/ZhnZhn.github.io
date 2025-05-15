"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("./uiApi");
var _styleFn = require("./styleFn");
var _LocationSearch = require("../flux/logic/LocationSearch");
var _settingStore = require("../flux/stores/settingStore");
var _ComponentActions = require("../flux/actions/ComponentActions");
var _browserStore = require("../flux/stores/browserStore");
var _itemStore = require("../flux/stores/itemStore");
var _useHotKeysHandler = _interopRequireDefault(require("./hotkeys/useHotKeysHandler"));
var _HeaderBar = _interopRequireDefault(require("./header/HeaderBar"));
var _BrowserContainer = _interopRequireDefault(require("./browser-container/BrowserContainer"));
var _About = _interopRequireDefault(require("./about/About"));
var _CompContainer = _interopRequireDefault(require("./zhn-containers/CompContainer"));
var _DialogContainer = _interopRequireDefault(require("./dialogs/DialogContainer"));
var _checkBuild = _interopRequireDefault(require("./checkBuild"));
var _jsxRuntime = require("react/jsx-runtime");
const BUILD_DATE = "15-05-2025",
  CL_COMP_CONTAINER = (0, _styleFn.crFlexRowCn)("app-container");
const _showSettings = (0, _uiApi.bindTo)(_ComponentActions.showSettings, (0, _settingStore.exportSettingFn)());
const AppErc = () => {
  (0, _uiApi.useEffect)(() => {
    (0, _LocationSearch.showAskDialogIf)();
    (0, _checkBuild.default)(BUILD_DATE, _ComponentActions.showReload);
  }, []);
  (0, _useHotKeysHandler.default)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_HeaderBar.default, {
      showSettings: _showSettings
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_COMP_CONTAINER,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserContainer.default, {
        useMsInitBrowser: _browserStore.useMsInitBrowser
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_About.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompContainer.default, {
        useMsInit: _itemStore.useMsInit
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogContainer.default, {})]
  });
};
var _default = exports.default = AppErc;
//# sourceMappingURL=AppErc.js.map