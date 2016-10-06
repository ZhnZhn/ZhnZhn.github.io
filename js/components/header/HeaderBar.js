'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    position: 'relative',
    zIndex: 50
  },
  appLabel: {
    display: 'inline-block',
    color: '#80c040',
    marginLeft: '35px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var BrowserConfig = {
  EUROSTAT: {
    browserType: 'ES',
    caption: 'European Statistics',
    sourceMenuUrl: './data/eurostat/source-menu.json'
  },
  GOOGLE: {
    browserType: 'QD',
    caption: 'Quandl Google Stocks',
    sourceMenuUrl: './data/google/source-menu.json'
  },
  YAHOO: {
    browserType: 'QY',
    caption: 'Quandl Yahoo Stocks',
    sourceMenuUrl: './data/yahoo/source-menu.json'
  },
  PREMIUM_SAMPLE: {
    browserType: 'QPS',
    caption: 'Quandl Premium Sample',
    sourceMenuUrl: './data/quandl-sample/source-menu.json'
  },
  FRANCE_STATISTICS: {
    browserType: 'QFS',
    caption: 'Quandl France Statistics',
    sourceMenuUrl: './data/france-statistics/source-menu.json'
  }
};

var HeaderBar = _react2.default.createClass({
  displayName: 'HeaderBar',
  getInitialState: function getInitialState() {
    return {
      isDS: false
    };
  },
  _handlerClickQuandl: function _handlerClickQuandl() {
    _BrowserActions2.default.showBrowser(_Type.BrowserType.QUANDL);
    this.setState({ isDS: false });
  },
  _handlerClickDynamic: function _handlerClickDynamic(browserConfig) {
    _BrowserActions2.default.showBrowserDynamic(browserConfig);
    this.setState({ isDS: false });
  },
  _handlerClickWatch: function _handlerClickWatch() {
    _BrowserActions2.default.showBrowser(_Type.BrowserType.WATCH_LIST);
    this.setState({ isDS: false });
  },
  _handlerClickDS: function _handlerClickDS() {
    this.setState({ isDS: !this.state.isDS });
  },
  render: function render() {
    var store = this.props.store;
    var isDS = this.state.isDS;

    return _react2.default.createElement(
      'div',
      { className: 'header', style: styles.rootDiv },
      _react2.default.createElement(_ProgressLoading2.default, { store: store }),
      _react2.default.createElement(_IconLogoErc2.default, null),
      _react2.default.createElement(_AppLabel2.default, {
        style: styles.appLabel,
        caption: 'ERC v. 0.11.0'
      }),
      _react2.default.createElement(
        _ToolBarButton2.default,
        {
          type: 'TypeA',
          caption: 'DS',
          title: 'Data Source Browsers',
          onClick: this._handlerClickDS
        },
        _react2.default.createElement('span', { className: 'arrow-down' })
      ),
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeA',
        caption: 'Quandl',
        title: 'Quandl Economic Browser',
        onClick: this._handlerClickQuandl
      }),
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeA',
        caption: 'Eurostat',
        title: 'European Statistics Browser',
        onClick: this._handlerClickDynamic.bind(null, BrowserConfig.EUROSTAT)
      }),
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeA',
        caption: 'Watch',
        title: 'Watch List Browser',
        onClick: this._handlerClickWatch
      }),
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeA',
        style: { float: 'right', marginRight: '20px' },
        caption: 'About',
        title: 'Description about application ERC',
        onClick: _ComponentActions2.default.showAbout
      }),
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeA',
        style: { float: 'right' },
        caption: 'Settings',
        title: 'Application settings',
        onClick: _ComponentActions2.default.showModalDialog.bind(null, _Type.ModalDialog.SETTINGS)
      }),
      _react2.default.createElement(_LimitRemainingLabel2.default, {
        store: store,
        style: { float: 'right', paddingTop: '5px' }
      }),
      _react2.default.createElement(_PanelBrowsers2.default, {
        isShow: isDS,
        browserConfig: BrowserConfig,
        onClickQuandl: this._handlerClickQuandl,
        onClickDynamic: this._handlerClickDynamic,
        onClickWatch: this._handlerClickWatch
      })
    );
  }
});

exports.default = HeaderBar;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\HeaderBar.js.map