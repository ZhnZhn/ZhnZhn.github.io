'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ProgressLoading = require('./ProgressLoading');

var _ProgressLoading2 = _interopRequireDefault(_ProgressLoading);

var _AppLabel = require('./AppLabel');

var _AppLabel2 = _interopRequireDefault(_AppLabel);

var _IconLogoErc = require('./IconLogoErc');

var _IconLogoErc2 = _interopRequireDefault(_IconLogoErc);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  rootDiv: {
    position: 'relative',
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
  }
};

var HeaderBar = function (_Component) {
  _inherits(HeaderBar, _Component);

  function HeaderBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HeaderBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HeaderBar.__proto__ || Object.getPrototypeOf(HeaderBar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isDS: false
    }, _this._handleClickQuandl = function () {
      //BrowserActions.showBrowser(BrowserType.QUANDL);
      _BrowserActions2.default.showBrowser(_Type.BrowserType.ECONOMIC);
      _this.setState({ isDS: false });
    }, _this._handleClickDynamic = function (browserConfig) {
      _BrowserActions2.default.showBrowserDynamic(browserConfig);
      _this.setState({ isDS: false });
    }, _this._handleClickWatch = function () {
      _BrowserActions2.default.showBrowser(_Type.BrowserType.WATCH_LIST);
      _this.setState({ isDS: false });
    }, _this._handleClickDS = function () {
      _this.setState({ isDS: !_this.state.isDS });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HeaderBar, [{
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
          title: 'ERC : Economic RESTful Client v0.12.0'
        }),
        _react2.default.createElement(_AppLabel2.default, {
          className: 'header__app-label',
          caption: 'ERC v0.12.0'
        }),
        _react2.default.createElement(
          _ToolBarButton2.default,
          {
            style: { marginTop: '8px', marginLeft: '10px' },
            type: 'TypeA',
            caption: 'DS',
            title: 'Data Source Browsers',
            onClick: this._handleClickDS
          },
          _react2.default.createElement('span', { className: 'arrow-down' })
        ),
        _react2.default.createElement(_ToolBarButton2.default, {
          style: { marginTop: '8px' },
          type: 'TypeA',
          caption: 'Quandl',
          title: 'Quandl Economic Browser',
          onClick: this._handleClickQuandl
        }),
        _react2.default.createElement(_ToolBarButton2.default, {
          style: { marginTop: '8px' },
          type: 'TypeA',
          caption: 'Eurostat',
          title: 'European Statistics Browser',
          onClick: this._handleClickDynamic.bind(null, _BrowserConfig2.default[_Type.BrowserType.EUROSTAT])
        }),
        _react2.default.createElement(_ToolBarButton2.default, {
          style: { marginTop: '8px' },
          type: 'TypeA',
          caption: 'Watch',
          title: 'Watch List Browser',
          onClick: this._handleClickWatch
        }),
        _react2.default.createElement(_ToolBarButton2.default, {
          type: 'TypeA',
          style: { float: 'right', marginRight: '20px', marginTop: '8px' },
          caption: 'About',
          title: 'Description about application ERC',
          onClick: _ComponentActions2.default.showAbout
        }),
        _react2.default.createElement(_ToolBarButton2.default, {
          type: 'TypeA',
          style: { float: 'right', marginTop: '8px' },
          caption: 'Settings',
          title: 'Application settings',
          onClick: _ComponentActions2.default.showModalDialog.bind(null, _Type.ModalDialog.SETTINGS)
        }),
        _react2.default.createElement(_LimitRemainingLabel2.default, {
          store: store,
          style: { float: 'right', paddingTop: '14px' }
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