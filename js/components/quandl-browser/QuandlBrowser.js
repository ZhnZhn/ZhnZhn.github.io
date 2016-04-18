'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuBrowser = require('../zhn/MenuBrowser');

var _MenuBrowser2 = _interopRequireDefault(_MenuBrowser);

var _Type = require('../../constants/Type');

var _DialogContainer = require('../zhn/DialogContainer3');

var _DialogContainer2 = _interopRequireDefault(_DialogContainer);

var _ComponentActions = require('../../flux/actions/ComponentActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuandlBrowser = _react2.default.createClass({
  displayName: 'QuandlBrowser',

  render: function render() {
    var store = this.props.store;

    return _react2.default.createElement(_MenuBrowser2.default, {
      caption: 'Quandl Economic',
      browserType: _Type.BrowserType.QUANDL,
      store: store,
      showAction: _ComponentActions.ComponentActionTypes.SHOW_BROWSER,
      updateAction: _ComponentActions.ComponentActionTypes.UPDATE_BROWSER_MENU
    });
  }
});

exports.default = QuandlBrowser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\QuandlBrowser.js.map