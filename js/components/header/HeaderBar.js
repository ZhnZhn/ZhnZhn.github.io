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

var _BrowserMenu = require('./BrowserMenu');

var _BrowserMenu2 = _interopRequireDefault(_BrowserMenu);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _BrowserActions = require('../../flux/actions/BrowserActions');

var _BrowserActions2 = _interopRequireDefault(_BrowserActions);

var _LoadingProgressActions = require('../../flux/actions/LoadingProgressActions');

var _Type = require('../../constants/Type');

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGO_TITLE = "ERC: Economic RESTful Client v0.14.0",
    CAPTION = "ERC v0.14.0";

var styles = {
  appLabel: {
    display: 'inline-block',
    color: '#80c040',
    marginTop: '8px',
    marginLeft: '35px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  btRoot: {
    //color: 'rgb(35, 47, 59)'
    color: '#1b2836'
  },
  lbLimit: {
    float: 'right',
    paddingTop: '9px'
  }
};

var HeaderBar = function (_Component) {
  (0, _inherits3.default)(HeaderBar, _Component);

  function HeaderBar(props) {
    (0, _classCallCheck3.default)(this, HeaderBar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderBar.__proto__ || Object.getPrototypeOf(HeaderBar)).call(this));

    _this._handleClickQuandl = function () {
      _BrowserActions2.default.showBrowser(_Type.BrowserType.ECONOMIC);
      _this.setState({ isDS: false });
    };

    _this._handleClickDynamic = function (browserConfig) {
      _BrowserActions2.default.showBrowserDynamic(browserConfig);
      _this.setState({ isDS: false });
    };

    _this._handleClickAbout = function () {
      _ComponentActions2.default.showAbout();
      _this.setState({ isDS: false });
    };

    _this._onRegDS = function (dsNode) {
      _this.dsNode = dsNode;
    };

    _this._handleClickDS = function () {
      _this.setState({ isDS: !_this.state.isDS });
    };

    _this._handleCloseDS = function (event) {
      if (!_this.dsNode.contains(event.target)) {
        _this.setState({ isDS: false });
      }
    };

    _this._handleDialogSettings = function () {
      _ComponentActions2.default.showModalDialog(_Type.ModalDialog.SETTINGS, _this._settingFn);
    };

    _this._settingFn = props.store.exportSettingFn();
    _this.state = {
      isDS: false
    };
    return _this;
  }

  (0, _createClass3.default)(HeaderBar, [{
    key: 'render',
    value: function render() {
      var store = this.props.store,
          isDS = this.state.isDS;

      return _react2.default.createElement(
        'div',
        { className: 'header' },
        _react2.default.createElement(_ProgressLoading2.default, { store: store, ACTIONS: _LoadingProgressActions.T }),
        _react2.default.createElement(_IconLogoErc2.default, {
          className: 'header__icon-erc',
          title: LOGO_TITLE
        }),
        _react2.default.createElement(_AppLabel2.default, {
          className: 'header__app-label',
          caption: CAPTION
        }),
        _react2.default.createElement(
          _ModalButton2.default,
          {
            className: 'header__bt-topics',
            rootStyle: styles.btRoot,
            caption: 'Topics',
            title: 'Topics Data Set Browsers Menu',
            accessKey: 't',
            onClick: this._handleClickDS,
            onReg: this._onRegDS
          },
          _react2.default.createElement('span', { className: 'arrow-down' })
        ),
        _react2.default.createElement(_FlatButton2.default, {
          className: 'header__bt-quandl',
          rootStyle: styles.btRoot,
          caption: 'Quandl',
          title: 'Quandl: World Economy Browser',
          accessKey: 'q',
          onClick: this._handleClickQuandl
        }),
        _react2.default.createElement(_FlatButton2.default, {
          className: 'header__bt-eurostat',
          rootStyle: styles.btRoot,
          caption: 'Eurostat',
          title: 'Eurostat Statistics Browser',
          accessKey: 'u',
          onClick: this._handleClickDynamic.bind(null, _Type.BrowserType.EUROSTAT)
        }),
        _react2.default.createElement(_FlatButton2.default, {
          className: 'header__bt-watch',
          rootStyle: styles.btRoot,
          caption: 'Watch',
          title: 'Watch List Browser',
          accessKey: 'w',
          onClick: this._handleClickDynamic.bind(null, _Type.BrowserType.WATCH_LIST)
        }),
        _react2.default.createElement(_HotBar2.default, {
          store: store,
          closeDialogAction: _ComponentActions.ComponentActionTypes.CLOSE_DIALOG,
          onShowDialog: _ComponentActions2.default.showDialog
        }),
        _react2.default.createElement(_FlatButton2.default, {
          className: 'header__bt-settins',
          rootStyle: styles.btRoot,
          caption: 'Settings',
          title: 'User Settings Dialog',
          accessKey: 's',
          isPrimary: true,
          onClick: this._handleDialogSettings
        }),
        _react2.default.createElement(_FlatButton2.default, {
          className: 'header__bt-about',
          rootStyle: styles.btRoot,
          caption: 'About',
          title: 'About Web Application ERC',
          accessKey: 'a',
          onClick: _ComponentActions2.default.showAbout
        }),
        _react2.default.createElement(_LimitRemainingLabel2.default, {
          store: store,
          style: styles.lbLimit
        }),
        _react2.default.createElement(_BrowserMenu2.default, {
          className: 'header__panel-browser',
          isShow: isDS,
          model: _Model2.default,
          onClose: this._handleCloseDS,
          onClickQuandl: this._handleClickQuandl,
          onClickDynamic: this._handleClickDynamic,
          onClickAbout: this._handleClickAbout
        })
      );
    }
  }]);
  return HeaderBar;
}(_react.Component);

exports.default = HeaderBar;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\HeaderBar.js.map