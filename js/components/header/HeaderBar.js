"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _compStore = require("../../flux/stores/compStore");
var _browserStore = require("../../flux/stores/browserStore");
var _styleFn = require("../styleFn");
var _hotkeys = require("../hotkeys/hotkeys");
var _useToggle = require("../hooks/useToggle");
var _useFocus = require("../hooks/useFocus");
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _SvgIcon = require("../zhn/svg/SvgIcon");
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
  CL_NDL = "hbt-ndl",
  CL_EUROSTAT = "hbt-eurostat",
  CL_WATCH = "hbt-watch",
  CL_ABOUT = "hbt-about",
  CL_BTS_RIGHT = `${CL_HEADER}__bts-right`,
  CL_BROWSER_MENU = `popup-menu ${CL_HEADER}__panel-browser`,
  S_SVG_BT = {
    verticalAlign: 'middle',
    margin: '0 8px 3px 8px'
  },
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
      refBt: refBt,
      isArrow: true,
      timeout: 0,
      caption: "Topics",
      title: "Topics Menu",
      hotKey: _hotkeys.HK_TOPICS,
      onClick: _toggleTopics
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      className: CL_EUROSTAT,
      caption: "Eurostat",
      title: "Eurostat Browser",
      hotKey: _hotkeys.HK_EUROSTAT_BROWSER,
      onClick: _browserStore.showEurostat
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      className: CL_NDL,
      caption: "DBN",
      title: "DBnomics Browser",
      hotKey: _hotkeys.HK_DBN_BROWSER,
      onClick: _browserStore.showDbn
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      className: CL_WATCH,
      caption: "Watch",
      title: "Watch List Browser",
      hotKey: _hotkeys.HK_WATCHLIST_BROWSER,
      onClick: _browserStore.showWatch
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_HotBar.default, {
      useMsCloseDialog: _compStore.useMsCloseDialog,
      onShowDialog: _compStore.showDialog
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_BTS_RIGHT,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LimitRemainingLabel.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
        isPrimary: true,
        title: "User Settings Dialog",
        hotKey: _hotkeys.HK_SETTINGS,
        timeout: 500,
        onClick: showSettings,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgIcon.SvgSettings, {
          style: S_SVG_BT
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
        className: CL_ABOUT,
        title: "About Web Application ERC",
        hotKey: _hotkeys.HK_ABOUT,
        timeout: 0,
        onClick: _compStore.showAbout,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgIcon.SvgInfo, {
          style: S_SVG_BT
        })
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