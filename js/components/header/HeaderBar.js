"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ComponentActions = _interopRequireWildcard(require("../../flux/actions/ComponentActions"));

var _BrowserActions = _interopRequireDefault(require("../../flux/actions/BrowserActions"));

var _LoadingProgressActions = require("../../flux/actions/LoadingProgressActions");

var _use = _interopRequireDefault(require("../hooks/use"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ProgressLoading = _interopRequireDefault(require("./ProgressLoading"));

var _AppLabel = _interopRequireDefault(require("./AppLabel"));

var _IconLogoErc = _interopRequireDefault(require("./IconLogoErc"));

var _HotBar = _interopRequireDefault(require("./HotBar"));

var _LimitRemainingLabel = _interopRequireDefault(require("./LimitRemainingLabel"));

var _BrowserModel = _interopRequireDefault(require("./BrowserModel"));

var FlatButton = _Comp["default"].FlatButton,
    ModalButton = _Comp["default"].ModalButton,
    SvgSettings = _Comp["default"].SvgSettings,
    SvgInfo = _Comp["default"].SvgInfo,
    ModalSlider = _Comp["default"].ModalSlider;
var useTheme = _use["default"].useTheme,
    useToggle = _use["default"].useToggle,
    useFnFocus = _use["default"].useFnFocus;
var LOGO_TITLE = "Web app ERC (Economic RESTful Client)",
    CAPTION = "ERC v0.17.0";
var ID = 'HEADER_BAR';
var CL = {
  HEADER: "header",
  ICON: "header__icon-erc",
  LABEL: "header__app-label",
  BM: "popup-menu header__panel-browser",
  TOPICS: "header__bt-topics",
  ARROW: "arrow-down",
  QUANDL: "header__bt-quandl",
  EUROSTAT: "header__bt-eurostat",
  WATCH: "header__bt-watch",
  BTS_RIGHT: "header__bts-right",
  ABOUT: "header__bt-about",
  BROWSER_MENU: "popup-menu header__panel-browser"
};
var STYLE = {
  SVG_BT: {
    position: 'relative',
    top: -1,
    verticalAlign: 'middle',
    marginLeft: 8,
    marginRight: 8
  }
};
var MODEL = (0, _BrowserModel["default"])();

var HeaderBar = function HeaderBar(_ref) {
  var store = _ref.store,
      showSettings = _ref.showSettings;

  var _useToggle = useToggle(false),
      isTopics = _useToggle[0],
      toggleTopics = _useToggle[1],
      _useFnFocus = useFnFocus(toggleTopics),
      refBt = _useFnFocus[0],
      _toggleTopics = _useFnFocus[1],
      TS = useTheme(ID);

  return _react["default"].createElement("div", {
    className: CL.HEADER,
    style: TS.ROOT
  }, _react["default"].createElement(_ProgressLoading["default"], {
    store: store,
    ACTIONS: _LoadingProgressActions.T
  }), _react["default"].createElement(_IconLogoErc["default"], {
    className: CL.ICON,
    title: LOGO_TITLE
  }), _react["default"].createElement(_AppLabel["default"], {
    className: CL.LABEL,
    caption: CAPTION
  }), _react["default"].createElement(ModalButton, {
    refBt: refBt,
    className: CL.TOPICS,
    rootStyle: TS.BT,
    caption: "Topics",
    title: "Click to open topics menu",
    accessKey: "t",
    onClick: _toggleTopics
  }, _react["default"].createElement("span", {
    className: CL.ARROW
  })), _react["default"].createElement(FlatButton, {
    className: CL.QUANDL,
    style: TS.BT,
    caption: "Quandl",
    title: "Quandl Browser",
    accessKey: "q",
    onClick: _BrowserActions["default"].showQuandl
  }), _react["default"].createElement(FlatButton, {
    className: CL.EUROSTAT,
    style: TS.BT,
    caption: "Eurostat",
    title: "Eurostat Statistics Browser",
    accessKey: "u",
    onClick: _BrowserActions["default"].showEurostat
  }), _react["default"].createElement(FlatButton, {
    className: CL.WATCH,
    style: TS.BT,
    caption: "Watch",
    title: "Watch List Browser",
    accessKey: "w",
    onClick: _BrowserActions["default"].showWatch
  }), _react["default"].createElement(_HotBar["default"], {
    store: store,
    closeDialogAction: _ComponentActions.ComponentActionTypes.CLOSE_DIALOG,
    onShowDialog: _ComponentActions["default"].showDialog
  }), _react["default"].createElement("div", {
    className: CL.BTS_RIGHT
  }, _react["default"].createElement(_LimitRemainingLabel["default"], {
    store: store
  }), _react["default"].createElement(FlatButton, {
    style: TS.BT,
    isPrimary: true,
    title: "User Settings Dialog",
    accessKey: "s",
    timeout: 500,
    onClick: showSettings
  }, _react["default"].createElement(SvgSettings, {
    style: STYLE.SVG_BT
  })), _react["default"].createElement(FlatButton, {
    className: CL.ABOUT,
    style: TS.BT,
    title: "About Web Application ERC",
    accessKey: "a",
    timeout: 0,
    onClick: _ComponentActions["default"].showAbout
  }, _react["default"].createElement(SvgInfo, {
    style: STYLE.SVG_BT
  }))), _react["default"].createElement(ModalSlider, {
    isShow: isTopics,
    className: CL.BROWSER_MENU,
    INIT_ID: "page_0",
    model: MODEL,
    onClose: _toggleTopics
  }));
};

var _default = HeaderBar;
exports["default"] = _default;
//# sourceMappingURL=HeaderBar.js.map