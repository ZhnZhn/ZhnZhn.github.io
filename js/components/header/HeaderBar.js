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

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _LimitRemainingLabel = require('./LimitRemainingLabel');

var _LimitRemainingLabel2 = _interopRequireDefault(_LimitRemainingLabel);

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
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var BrowserConfig = {
  GOOGLE: {
    browserType: 'QD',
    caption: 'Quandl Google Stocks',
    sourceMenuUrl: './data/google/source-menu.json'
  },
  YAHOO: {
    browserType: 'QY',
    caption: 'Quandl Yahoo Stocks',
    sourceMenuUrl: './data/yahoo/source-menu.json'
  }
};

var HeaderBar = _react2.default.createClass({
  displayName: 'HeaderBar',
  getInitialState: function getInitialState() {
    this.fnBrowser = function (browserType) {
      return _BrowserActions2.default.showBrowser.bind(null, browserType);
    };

    return {};
  },
  _handlerClickDynamic: function _handlerClickDynamic(browserConfig) {
    _BrowserActions2.default.showBrowserDynamic(browserConfig);
  },
  render: function render() {
    var store = this.props.store;

    return _react2.default.createElement(
      'div',
      { className: 'header', style: styles.rootDiv },
      _react2.default.createElement(_ProgressLoading2.default, { store: store }),
      _react2.default.createElement(_AppLabel2.default, {
        style: styles.appLabel,
        title: 'Economic Rest Client v. 0.10.0',
        caption: 'ERC v. 0.10.0'
      }),
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeA',
        caption: 'Quandl',
        title: 'Quandl DataSets Browser',
        onClick: this.fnBrowser(_Type.BrowserType.QUANDL)
      }),
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeA',
        caption: 'Yahoo',
        title: 'Quandl Yahoo Stocks Browser',
        onClick: this._handlerClickDynamic.bind(null, BrowserConfig.YAHOO)
      }),
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeA',
        caption: 'Google',
        title: 'Quandl Google Stocks Browser',
        onClick: this._handlerClickDynamic.bind(null, BrowserConfig.GOOGLE)
      }),
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeA',
        caption: 'Watch',
        title: 'Watch List Browser',
        onClick: this.fnBrowser(_Type.BrowserType.WATCH_LIST)
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
      })
    );
  }
});

exports.default = HeaderBar;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\HeaderBar.js.map