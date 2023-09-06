"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ComponentActions = require("../../flux/actions/ComponentActions");
var _BrowserActions = require("../../flux/actions/BrowserActions");
var _styleFn = require("../styleFn");
var _hotkeys = require("../hotkeys/hotkeys");
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _useFnFocus = _interopRequireDefault(require("../hooks/useFnFocus"));
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _SvgSettings = _interopRequireDefault(require("../zhn/svg/SvgSettings"));
var _SvgInfo = _interopRequireDefault(require("../zhn/svg/SvgInfo"));
var _ModalSlider = _interopRequireDefault(require("../zhn-modal-slider/ModalSlider"));
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
  CL_HEADER_BAR = (0, _styleFn.crContainerCl)(CL_HEADER),
  CL_ICON = CL_HEADER + "__icon-erc",
  CL_LABEL = CL_HEADER + "__app-label",
  CL_HEADER_BT = CL_HEADER + "__bt",
  CL_NDL = CL_HEADER_BT + " hbt-ndl",
  CL_EUROSTAT = CL_HEADER_BT + " hbt-eurostat",
  CL_WATCH = CL_HEADER_BT + " hbt-watch",
  CL_ABOUT = CL_HEADER_BT + " hbt-about",
  CL_BTS_RIGHT = CL_HEADER_BT + "s-right",
  CL_BROWSER_MENU = "popup-menu " + CL_HEADER + "__panel-browser",
  S_SVG_BT = {
    verticalAlign: 'middle',
    margin: '0 8px 3px 8px'
  },
  MODEL = (0, _BrowserModel.default)();
const HeaderBar = _ref => {
  let {
    showSettings
  } = _ref;
  const [isTopics, toggleTopics] = (0, _useToggle.default)(),
    [refBt, _toggleTopics] = (0, _useFnFocus.default)(toggleTopics);
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
      className: CL_HEADER_BT,
      caption: "Topics",
      title: "Topics Menu",
      hotKey: _hotkeys.HK_TOPICS,
      onClick: _toggleTopics
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      className: CL_EUROSTAT,
      caption: "Eurostat",
      title: "Eurostat Browser",
      hotKey: _hotkeys.HK_EUROSTAT_BROWSER,
      onClick: _BrowserActions.BrowserActions.showEurostat
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      className: CL_NDL,
      caption: "NDL",
      title: "Nasdaq Data Link Browser",
      hotKey: _hotkeys.HK_NDL_BROWSER,
      onClick: _BrowserActions.BrowserActions.showNdl
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
      className: CL_WATCH,
      caption: "Watch",
      title: "Watch List Browser",
      hotKey: _hotkeys.HK_WATCHLIST_BROWSER,
      onClick: _BrowserActions.BrowserActions.showWatch
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_HotBar.default, {
      closeDialogAction: _ComponentActions.CAT_CLOSE_DIALOG,
      onShowDialog: _ComponentActions.ComponentActions.showDialog
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_BTS_RIGHT,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LimitRemainingLabel.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
        isPrimary: true,
        title: "User Settings Dialog",
        hotKey: _hotkeys.HK_SETTINGS,
        timeout: 500,
        onClick: showSettings,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgSettings.default, {
          style: S_SVG_BT
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
        className: CL_ABOUT,
        title: "About Web Application ERC",
        hotKey: _hotkeys.HK_ABOUT,
        timeout: 0,
        onClick: _ComponentActions.ComponentActions.showAbout,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgInfo.default, {
          style: S_SVG_BT
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalSlider.default, {
      isShow: isTopics,
      className: CL_BROWSER_MENU,
      model: MODEL,
      onClose: _toggleTopics
    })]
  });
};
var _default = HeaderBar;
exports.default = _default;
//# sourceMappingURL=HeaderBar.js.map