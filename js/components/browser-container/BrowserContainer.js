'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _QuandlBrowser = require('../quandl-browser/QuandlBrowser');

var _QuandlBrowser2 = _interopRequireDefault(_QuandlBrowser);

var _YahooBrowser = require('../yahoo-browser/YahooBrowser');

var _YahooBrowser2 = _interopRequireDefault(_YahooBrowser);

var _GoogleBrowser = require('../google-browser/GoogleBrowser');

var _GoogleBrowser2 = _interopRequireDefault(_GoogleBrowser);

var _WatchBrowser = require('../watch-browser/WatchBrowser');

var _WatchBrowser2 = _interopRequireDefault(_WatchBrowser);

var _DialogContainer = require('../zhn/DialogContainer3');

var _DialogContainer2 = _interopRequireDefault(_DialogContainer);

var _ComponentActions = require('../../flux/actions/ComponentActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowserContainer = _react2.default.createClass({
  displayName: 'BrowserContainer',
  render: function render() {
    var store = this.props.store;

    return _react2.default.createElement(
      'div',
      { className: 'hrz-container' },
      _react2.default.createElement(_QuandlBrowser2.default, { store: store }),
      _react2.default.createElement(_YahooBrowser2.default, { store: store }),
      _react2.default.createElement(_GoogleBrowser2.default, { store: store }),
      _react2.default.createElement(_WatchBrowser2.default, { store: store }),
      _react2.default.createElement(_DialogContainer2.default, {
        maxDialog: 3,
        store: store,
        initAction: _ComponentActions.ComponentActionTypes.INIT_AND_SHOW_DIALOG,
        showAction: _ComponentActions.ComponentActionTypes.SHOW_DIALOG
      })
    );
  }
});

exports.default = BrowserContainer;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-container\BrowserContainer.js.map