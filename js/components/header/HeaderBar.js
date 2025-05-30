"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _compStore = require("../../flux/stores/compStore");
var _browserStore = require("../../flux/stores/browserStore");
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _hotkeys = require("../hotkeys/hotkeys");
var _useToggle = require("../hooks/useToggle");
var _useFocus = require("../hooks/useFocus");
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _FlatButtonSvg = require("../zhn-m/FlatButtonSvg");
var _ModalSlider = require("../zhn-modal-slider/ModalSlider");
var _ProgressLoading = _interopRequireDefault(require("./ProgressLoading"));
var _AppLabel = _interopRequireDefault(require("./AppLabel"));
var _IconLogoErc = _interopRequireDefault(require("./IconLogoErc"));
var _HotBar = _interopRequireDefault(require("./HotBar"));
var _LimitRemainingLabel = _interopRequireDefault(require("./LimitRemainingLabel"));
var _BrowserModel = _interopRequireDefault(require("./BrowserModel"));
var _jsxRuntime = require("react/jsx-runtime");
const LOGO_TITLE = "Web app ERC (Economic RESTful Client)",
  CAPTION = "ERC v0.18.0",
  CL_HEADER = "header",
  CL_HEADER_BAR = (0, _styleFn.crContainerCn)(CL_HEADER),
  CL_ICON = `${CL_HEADER}__icon-erc`,
  CL_LABEL = `${CL_HEADER}__app-label`,
  CL_DBN = "bt-dbn",
  CL_EUROSTAT = "bt-eurostat",
  CL_WATCH = "bt-watch",
  CL_ABOUT = "bt-about",
  CL_BTS_RIGHT = `${CL_HEADER}__bts-right`,
  CL_BROWSER_MENU = `${CL_HEADER}__panel-browser`,
  _crTitleOpen = strNoun => `Open ${strNoun}`,
  _crBtFlatProps = (caption, title, hotKey, className) => ({
    ...(0, _a11yFn.crBtAriaLabelProps)(title),
    caption,
    hotKey,
    className
  }),
  BT_TOPICS_PROPS = _crBtFlatProps("Topics", _crTitleOpen("Topics Menu"), _hotkeys.HK_TOPICS),
  BT_EUROSTAT_PROPS = _crBtFlatProps("Eurostat", _crTitleOpen("Eurostat Browser"), _hotkeys.HK_EUROSTAT_BROWSER, CL_EUROSTAT),
  BT_DBN_PROPS = _crBtFlatProps("DBN", _crTitleOpen("DBnomics Browser"), _hotkeys.HK_DBN_BROWSER, CL_DBN),
  BT_WATCH_PROPS = _crBtFlatProps("Watch", _crTitleOpen("Watch List Browser"), _hotkeys.HK_WATCHLIST_BROWSER, CL_WATCH),
  BT_SETTINGS_PROPS = (0, _a11yFn.crBtAriaLabelProps)(_crTitleOpen("Settings")),
  BT_ABOUT_PROPS = (0, _a11yFn.crBtAriaLabelProps)(_crTitleOpen("About")),
  MODEL = (0, _BrowserModel.default)();
const HeaderBar = _ref => {
  let {
    showSettings
  } = _ref;
  const [isTopics, toggleTopics] = (0, _useToggle.useToggle)(),
    [refBt, _toggleTopics] = (0, _useFocus.useFnFocus)(toggleTopics);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_HEADER_BAR,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressLoading.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconLogoErc.default, {
      className: CL_ICON,
      title: LOGO_TITLE
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_AppLabel.default, {
      className: CL_LABEL,
      caption: CAPTION
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      ...BT_TOPICS_PROPS,
      timeout: 0,
      refBt: refBt,
      isArrow: true,
      onClick: _toggleTopics
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      ...BT_EUROSTAT_PROPS,
      onClick: _browserStore.showEurostat
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      ...BT_DBN_PROPS,
      onClick: _browserStore.showDbn
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      ...BT_WATCH_PROPS,
      onClick: _browserStore.showWatch
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_HotBar.default, {
      useMsCloseDialog: _compStore.useMsCloseDialog,
      onShowDialog: _compStore.showDialog
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_BTS_RIGHT,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LimitRemainingLabel.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButtonSvg.FlatButtonSettings, {
        ...BT_SETTINGS_PROPS,
        hotKey: _hotkeys.HK_SETTINGS,
        timeout: 500,
        onClick: showSettings
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButtonSvg.FlatButtonInfo, {
        ...BT_ABOUT_PROPS,
        className: CL_ABOUT,
        hotKey: _hotkeys.HK_ABOUT,
        onClick: _compStore.showAbout
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalSlider.ModalSlider, {
      isShow: isTopics,
      className: CL_BROWSER_MENU,
      model: MODEL,
      onClose: _toggleTopics
    })]
  });
};
var _default = exports.default = HeaderBar;
//# sourceMappingURL=HeaderBar.js.map