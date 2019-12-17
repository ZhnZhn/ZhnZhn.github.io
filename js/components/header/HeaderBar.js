"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

var _ProgressLoading = _interopRequireDefault(require("./ProgressLoading"));

var _AppLabel = _interopRequireDefault(require("./AppLabel"));

var _IconLogoErc = _interopRequireDefault(require("./IconLogoErc"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _HotBar = _interopRequireDefault(require("./HotBar"));

var _LimitRemainingLabel = _interopRequireDefault(require("./LimitRemainingLabel"));

var _ModalSlider = _interopRequireDefault(require("../zhn-modal-slider/ModalSlider"));

var _BrowserModel = _interopRequireDefault(require("./BrowserModel"));

var _ComponentActions = _interopRequireWildcard(require("../../flux/actions/ComponentActions"));

var _BrowserActions = _interopRequireDefault(require("../../flux/actions/BrowserActions"));

var _LoadingProgressActions = require("../../flux/actions/LoadingProgressActions");

var _Type = require("../../constants/Type");

//import FlatButton from '../zhn-m/FlatButton'
//import ModalButton from '../zhn-m/ModalButton'
var FlatButton = _Comp["default"].FlatButton,
    ModalButton = _Comp["default"].ModalButton,
    SvgSettings = _Comp["default"].SvgSettings,
    SvgInfo = _Comp["default"].SvgInfo;
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

var HeaderBar =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(HeaderBar, _Component);

  function HeaderBar(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._onRegDS = function (dsNode) {
      _this.dsNode = dsNode;
    };

    _this._hToggleDS = function () {
      _this.setState(function (prevState) {
        return {
          isDS: !prevState.isDS
        };
      });
    };

    _this._hDialogSettings = function () {
      _ComponentActions["default"].showSettings(_this._settingFn);
    };

    _this._settingFn = props.store.exportSettingFn();
    _this._hShowEconomic = _BrowserActions["default"].showBrowserDynamic.bind(null, _Type.BrowserType.ECONOMIC);
    _this._hShowEurostat = _BrowserActions["default"].showBrowserDynamic.bind(null, _Type.BrowserType.EUROSTAT);
    _this._hShowWatch = _BrowserActions["default"].showBrowserDynamic.bind(null, _Type.BrowserType.WATCH_LIST);
    _this.state = {
      isDS: false
    };
    return _this;
  }

  var _proto = HeaderBar.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        store = _this$props.store,
        theme = _this$props.theme,
        isDS = this.state.isDS,
        S = theme.getStyle(ID);
    return _react["default"].createElement("div", {
      className: CL.HEADER,
      style: S.ROOT
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
      className: CL.TOPICS,
      rootStyle: S.BT,
      caption: "Topics",
      title: "Click to open topics menu",
      accessKey: "t",
      onClick: this._hToggleDS,
      onReg: this._onRegDS
    }, _react["default"].createElement("span", {
      className: CL.ARROW
    })), _react["default"].createElement(FlatButton, {
      className: CL.QUANDL,
      rootStyle: S.BT,
      caption: "Quandl",
      title: "Quandl: World Economy Browser",
      accessKey: "q",
      onClick: this._hShowEconomic
    }), _react["default"].createElement(FlatButton, {
      className: CL.EUROSTAT,
      rootStyle: S.BT,
      caption: "Eurostat",
      title: "Eurostat Statistics Browser",
      accessKey: "u",
      onClick: this._hShowEurostat
    }), _react["default"].createElement(FlatButton, {
      className: CL.WATCH,
      rootStyle: S.BT,
      caption: "Watch",
      title: "Watch List Browser",
      accessKey: "w",
      onClick: this._hShowWatch
    }), _react["default"].createElement(_HotBar["default"], {
      store: store,
      closeDialogAction: _ComponentActions.ComponentActionTypes.CLOSE_DIALOG,
      onShowDialog: _ComponentActions["default"].showDialog
    }), _react["default"].createElement("div", {
      className: CL.BTS_RIGHT
    }, _react["default"].createElement(_LimitRemainingLabel["default"], {
      store: store
    }), _react["default"].createElement(FlatButton, {
      rootStyle: S.BT,
      isPrimary: true,
      title: "User Settings Dialog",
      accessKey: "s",
      onClick: this._hDialogSettings
    }, _react["default"].createElement(SvgSettings, {
      style: STYLE.SVG_BT
    })), _react["default"].createElement(FlatButton, {
      className: CL.ABOUT,
      rootStyle: S.BT,
      title: "About Web Application ERC",
      accessKey: "a",
      onClick: _ComponentActions["default"].showAbout
    }, _react["default"].createElement(SvgInfo, {
      style: STYLE.SVG_BT
    }))), _react["default"].createElement(_ModalSlider["default"], {
      isShow: isDS,
      className: CL.BROWSER_MENU,
      INIT_ID: "page_0",
      model: MODEL,
      onClose: this._hToggleDS
    }));
  };

  return HeaderBar;
}(_react.Component);

var _default = (0, _withTheme["default"])(HeaderBar);

exports["default"] = _default;
//# sourceMappingURL=HeaderBar.js.map