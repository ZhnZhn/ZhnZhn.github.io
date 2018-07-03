'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _ProgressLoading = require('./ProgressLoading');

var _ProgressLoading2 = _interopRequireDefault(_ProgressLoading);

var _AppLabel = require('./AppLabel');

var _AppLabel2 = _interopRequireDefault(_AppLabel);

var _IconLogoErc = require('./IconLogoErc');

var _IconLogoErc2 = _interopRequireDefault(_IconLogoErc);

var _FlatButton = require('../zhn-m/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _ModalButton = require('../zhn-m/ModalButton');

var _ModalButton2 = _interopRequireDefault(_ModalButton);

var _HotBar = require('./HotBar');

var _HotBar2 = _interopRequireDefault(_HotBar);

var _LimitRemainingLabel = require('./LimitRemainingLabel');

var _LimitRemainingLabel2 = _interopRequireDefault(_LimitRemainingLabel);

var _ModalSlider = require('../zhn-modal-slider/ModalSlider');

var _ModalSlider2 = _interopRequireDefault(_ModalSlider);

var _BrowserModel = require('./BrowserModel');

var _BrowserModel2 = _interopRequireDefault(_BrowserModel);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _BrowserActions = require('../../flux/actions/BrowserActions');

var _BrowserActions2 = _interopRequireDefault(_BrowserActions);

var _LoadingProgressActions = require('../../flux/actions/LoadingProgressActions');

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGO_TITLE = "Web app ERC (Economic RESTful Client)",
    CAPTION = "ERC v0.15.0";

var ID = 'HEADER_BAR';

var CL = {
  HEADER: "header",
  ICON: 'header__icon-erc',
  LABEL: "header__app-label",
  BM: "popup-menu header__panel-browser",
  TOPICS: "header__bt-topics",
  ARROW: "arrow-down",
  QUANDL: "header__bt-quandl",
  EUROSTAT: "header__bt-eurostat",
  WATCH: "header__bt-watch",
  SETTINGS: "header__bt-settins",
  ABOUT: "header__bt-about",

  BROWSER_MENU: "popup-menu header__panel-browser"
};

var MODEL = (0, _BrowserModel2.default)();

var HeaderBar = function (_Component) {
  (0, _inherits3.default)(HeaderBar, _Component);

  function HeaderBar(props) {
    (0, _classCallCheck3.default)(this, HeaderBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderBar.__proto__ || Object.getPrototypeOf(HeaderBar)).call(this));

    _this._onRegDS = function (dsNode) {
      _this.dsNode = dsNode;
    };

    _this._hClickDS = function () {
      _this.setState({ isDS: !_this.state.isDS });
    };

    _this._hCloseDS = function (event) {
      if (!_this.dsNode.contains(event.target)) {
        _this.setState({ isDS: false });
      }
    };

    _this._hToggleDS = function () {
      _this.setState(function (prevState) {
        return {
          isDS: !prevState.isDS
        };
      });
    };

    _this._hDialogSettings = function () {
      _ComponentActions2.default.showModalDialog(_Type.ModalDialog.SETTINGS, _this._settingFn);
    };

    _this._settingFn = props.store.exportSettingFn();

    _this._hShowEconomic = _BrowserActions2.default.showBrowserDynamic.bind(null, _Type.BrowserType.ECONOMIC);
    _this._hShowEurostat = _BrowserActions2.default.showBrowserDynamic.bind(null, _Type.BrowserType.EUROSTAT);
    _this._hShowWatch = _BrowserActions2.default.showBrowserDynamic.bind(null, _Type.BrowserType.WATCH_LIST);

    _this.state = {
      isDS: false
    };
    return _this;
  }

  (0, _createClass3.default)(HeaderBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          store = _props.store,
          theme = _props.theme,
          isDS = this.state.isDS,
          S = theme.getStyle(ID);

      return _react2.default.createElement(
        'div',
        { className: CL.HEADER, style: S.ROOT },
        _react2.default.createElement(_ProgressLoading2.default, { store: store, ACTIONS: _LoadingProgressActions.T }),
        _react2.default.createElement(_IconLogoErc2.default, {
          className: CL.ICON,
          title: LOGO_TITLE
        }),
        _react2.default.createElement(_AppLabel2.default, {
          className: CL.LABEL,
          caption: CAPTION
        }),
        _react2.default.createElement(
          _ModalButton2.default,
          {
            className: CL.TOPICS,
            rootStyle: S.BT,
            caption: 'Topics',
            title: 'Click to open topics menu',
            accessKey: 't',
            onClick: this._hClickDS,
            onReg: this._onRegDS
          },
          _react2.default.createElement('span', { className: CL.ARROW })
        ),
        _react2.default.createElement(_FlatButton2.default, {
          className: CL.QUANDL,
          rootStyle: S.BT,
          caption: 'Quandl',
          title: 'Quandl: World Economy Browser',
          accessKey: 'q',
          onClick: this._hShowEconomic
        }),
        _react2.default.createElement(_FlatButton2.default, {
          className: CL.EUROSTAT,
          rootStyle: S.BT,
          caption: 'Eurostat',
          title: 'Eurostat Statistics Browser',
          accessKey: 'u',
          onClick: this._hShowEurostat
        }),
        _react2.default.createElement(_FlatButton2.default, {
          className: CL.WATCH,
          rootStyle: S.BT,
          caption: 'Watch',
          title: 'Watch List Browser',
          accessKey: 'w',
          onClick: this._hShowWatch
        }),
        _react2.default.createElement(_HotBar2.default, {
          store: store,
          closeDialogAction: _ComponentActions.ComponentActionTypes.CLOSE_DIALOG,
          onShowDialog: _ComponentActions2.default.showDialog
        }),
        _react2.default.createElement(_FlatButton2.default, {
          className: CL.SETTINGS,
          rootStyle: S.BT,
          isPrimary: true,
          caption: 'Settings',
          title: 'User Settings Dialog',
          accessKey: 's',
          onClick: this._hDialogSettings
        }),
        _react2.default.createElement(_FlatButton2.default, {
          className: CL.ABOUT,
          rootStyle: S.BT,
          caption: 'About',
          title: 'About Web Application ERC',
          accessKey: 'a',
          onClick: _ComponentActions2.default.showAbout
        }),
        _react2.default.createElement(_LimitRemainingLabel2.default, {
          store: store,
          style: S.LIMIT
        }),
        _react2.default.createElement(_ModalSlider2.default, {
          isShow: isDS,
          className: CL.BROWSER_MENU,
          INIT_ID: 'page_0',
          model: MODEL,
          onClose: this._hToggleDS
        })
      );
    }
  }]);
  return HeaderBar;
}(_react.Component);

exports.default = (0, _withTheme2.default)(HeaderBar);
//# sourceMappingURL=HeaderBar.js.map