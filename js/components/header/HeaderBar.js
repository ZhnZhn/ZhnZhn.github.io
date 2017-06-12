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

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _LimitRemainingLabel = require('./LimitRemainingLabel');

var _LimitRemainingLabel2 = _interopRequireDefault(_LimitRemainingLabel);

var _PanelBrowsers = require('./PanelBrowsers');

var _PanelBrowsers2 = _interopRequireDefault(_PanelBrowsers);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _BrowserActions = require('../../flux/actions/BrowserActions');

var _BrowserActions2 = _interopRequireDefault(_BrowserActions);

var _BrowserConfig = require('../../constants/BrowserConfig');

var _BrowserConfig2 = _interopRequireDefault(_BrowserConfig);

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGO_TITLE = "ERC: Economic RESTful Client v0.14.0",
    CAPTION = "ERC v0.14.0";

var styles = {
  rootDiv: {
    position: 'relative',
    boxShadow: '0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.6)',
    zIndex: 1050
  },
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
  btDS: {
    marginTop: '8px',
    marginLeft: '10px'
  },
  bt: {
    marginTop: '8px'
  },
  btAbout: {
    float: 'right',
    marginRight: '20px',
    marginTop: '8px'
  },
  btSettings: {
    float: 'right',
    marginTop: '8px'
  },
  lbLimit: {
    float: 'right',
    paddingTop: '14px'
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

    _this._handleClickWatch = function () {
      _BrowserActions2.default.showBrowser(_Type.BrowserType.WATCH_LIST);
      _this.setState({ isDS: false });
    };

    _this._handleClickDS = function () {
      _this.setState({ isDS: !_this.state.isDS });
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
        { className: 'header', style: styles.rootDiv },
        _react2.default.createElement(_ProgressLoading2.default, { store: store }),
        _react2.default.createElement(_IconLogoErc2.default, {
          className: 'header__icon-erc',
          title: LOGO_TITLE
        }),
        _react2.default.createElement(_AppLabel2.default, {
          className: 'header__app-label',
          caption: CAPTION
        }),
        _react2.default.createElement(
          _ActionButton2.default,
          {
            style: styles.btDS,
            type: 'TypeA',
            caption: 'DS',
            title: 'Data Source Browsers',
            onClick: this._handleClickDS
          },
          _react2.default.createElement('span', { className: 'arrow-down' })
        ),
        _react2.default.createElement(_ActionButton2.default, {
          style: styles.bt,
          type: 'TypeA',
          caption: 'Quandl',
          title: 'Quandl Economic Browser',
          onClick: this._handleClickQuandl
        }),
        _react2.default.createElement(_ActionButton2.default, {
          style: styles.bt,
          type: 'TypeA',
          caption: 'Eurostat',
          title: 'European Statistics Browser',
          onClick: this._handleClickDynamic.bind(null, _BrowserConfig2.default[_Type.BrowserType.EUROSTAT])
        }),
        _react2.default.createElement(_ActionButton2.default, {
          style: styles.bt,
          type: 'TypeA',
          caption: 'Watch',
          title: 'Watch List Browser',
          onClick: this._handleClickWatch
        }),
        _react2.default.createElement(_ActionButton2.default, {
          type: 'TypeA',
          style: styles.btAbout,
          caption: 'About',
          title: 'Description about application ERC',
          onClick: _ComponentActions2.default.showAbout
        }),
        _react2.default.createElement(_ActionButton2.default, {
          type: 'TypeA',
          style: styles.btSettings,
          caption: 'Settings',
          title: 'Application settings',
          onClick: this._handleDialogSettings
        }),
        _react2.default.createElement(_LimitRemainingLabel2.default, {
          store: store,
          style: styles.lbLimit
        }),
        _react2.default.createElement(_PanelBrowsers2.default, {
          className: 'header__panel-browser',
          isShow: isDS,
          BROWSER: _Type.BrowserType,
          browserConfig: _BrowserConfig2.default,
          onClickQuandl: this._handleClickQuandl,
          onClickDynamic: this._handleClickDynamic,
          onClickWatch: this._handleClickWatch
        })
      );
    }
  }]);
  return HeaderBar;
}(_react.Component);

exports.default = HeaderBar;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\HeaderBar.js.map