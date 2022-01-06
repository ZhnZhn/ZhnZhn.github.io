"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ComponentActions = _interopRequireWildcard(require("../../flux/actions/ComponentActions"));

var _BrowserActions = _interopRequireDefault(require("../../flux/actions/BrowserActions"));

var _hotkeys = require("../hotkeys/hotkeys");

var _use = _interopRequireDefault(require("../hooks/use"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ProgressLoading = _interopRequireDefault(require("./ProgressLoading"));

var _AppLabel = _interopRequireDefault(require("./AppLabel"));

var _IconLogoErc = _interopRequireDefault(require("./IconLogoErc"));

var _HotBar = _interopRequireDefault(require("./HotBar"));

var _LimitRemainingLabel = _interopRequireDefault(require("./LimitRemainingLabel"));

var _BrowserModel = _interopRequireDefault(require("./BrowserModel"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  FlatButton,
  SvgSettings,
  SvgInfo,
  ModalSlider
} = _Comp.default;
const {
  useTheme,
  useToggle,
  useFnFocus
} = _use.default;
const LOGO_TITLE = "Web app ERC (Economic RESTful Client)",
      CAPTION = "ERC v0.18.0",
      THEME_ID = 'HEADER_BAR',
      CL_HEADER = "header",
      CL_ICON = "header__icon-erc",
      CL_LABEL = "header__app-label",
      CL_TOPICS = "header__bt-topics",
      CL_QUANDL = "header__bt-quandl",
      CL_EUROSTAT = "header__bt-eurostat",
      CL_WATCH = "header__bt-watch",
      CL_BTS_RIGHT = "header__bts-right",
      CL_ABOUT = "header__bt-about",
      CL_BROWSER_MENU = "popup-menu header__panel-browser",
      S_SVG_BT = {
  verticalAlign: 'middle',
  margin: '0 8px 3px 8px'
},
      MODEL = (0, _BrowserModel.default)();

const HeaderBar = _ref => {
  let {
    showSettings
  } = _ref;
  const [isTopics, toggleTopics] = useToggle(false),
        [refBt, _toggleTopics] = useFnFocus(toggleTopics),
        TS = useTheme(THEME_ID);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_HEADER,
    style: TS.ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ProgressLoading.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconLogoErc.default, {
      className: CL_ICON,
      title: LOGO_TITLE
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_AppLabel.default, {
      className: CL_LABEL,
      caption: CAPTION
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(FlatButton, {
      refBt: refBt,
      isArrow: true,
      timeout: 0,
      className: CL_TOPICS,
      style: TS.BT,
      caption: "Topics",
      title: "Click to open topics menu",
      hotKey: _hotkeys.HK_TOPICS,
      onClick: _toggleTopics
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(FlatButton, {
      className: CL_QUANDL,
      style: TS.BT,
      caption: "Quandl",
      title: "Quandl Browser",
      hotKey: _hotkeys.HK_QUANDL_BROWSER,
      onClick: _BrowserActions.default.showQuandl
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(FlatButton, {
      className: CL_EUROSTAT,
      style: TS.BT,
      caption: "Eurostat",
      title: "Eurostat Browser",
      hotKey: _hotkeys.HK_EUROSTAT_BROWSER,
      onClick: _BrowserActions.default.showEurostat
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(FlatButton, {
      className: CL_WATCH,
      style: TS.BT,
      caption: "Watch",
      title: "Watch List Browser",
      hotKey: _hotkeys.HK_WATCHLIST_BROWSER,
      onClick: _BrowserActions.default.showWatch
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_HotBar.default, {
      btStyle: TS.BT_HOT,
      closeDialogAction: _ComponentActions.ComponentActionTypes.CLOSE_DIALOG,
      onShowDialog: _ComponentActions.default.showDialog
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: CL_BTS_RIGHT,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LimitRemainingLabel.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(FlatButton, {
        style: TS.BT,
        isPrimary: true,
        title: "User Settings Dialog",
        hotKey: _hotkeys.HK_SETTINGS,
        timeout: 500,
        onClick: showSettings,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgSettings, {
          style: S_SVG_BT
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(FlatButton, {
        className: CL_ABOUT,
        style: TS.BT,
        title: "About Web Application ERC",
        hotKey: _hotkeys.HK_ABOUT,
        timeout: 0,
        onClick: _ComponentActions.default.showAbout,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgInfo, {
          style: S_SVG_BT
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ModalSlider, {
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