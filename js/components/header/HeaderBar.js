'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _Type = require('../../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    position: 'relative',
    zIndex: 30
  }
};

//marginTop: '8px',
//marginLeft: '10px'
var HeaderBar = _react2.default.createClass({
  displayName: 'HeaderBar',
  getInitialState: function getInitialState() {
    this.fnBrowser = function (browserType) {
      return _ComponentActions2.default.showBrowser.bind(null, browserType);
    };
    return {};
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'header', style: styles.rootDiv },
      _react2.default.createElement(
        'span',
        {
          style: { color: '#80c040', paddingLeft: '10px', paddingRight: '10px', fontSize: '16px', fontWeight: 'bold', display: 'inline-block' },
          title: 'Economic Rest Client v. 0.10.0'
        },
        'ERC v. 0.10.0'
      ),
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
        onClick: this.fnBrowser(_Type.BrowserType.QUANDL_YAHOO)
      }),
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeA',
        caption: 'Google',
        title: 'Quandl Google Stocks Browser',
        onClick: this.fnBrowser(_Type.BrowserType.QUANDL_GOOGLE)
      }),
      _react2.default.createElement(_ToolBarButton2.default, {
        type: 'TypeA',
        caption: 'About',
        title: 'Description about application ERC',
        onClick: _ComponentActions2.default.showAbout
      })
    );
  }
});

exports.default = HeaderBar;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\HeaderBar.js.map