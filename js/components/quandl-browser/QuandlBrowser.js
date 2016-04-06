'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuBrowser = require('../zhn/MenuBrowser');

var _MenuBrowser2 = _interopRequireDefault(_MenuBrowser);

var _DataBrowser = require('./DataBrowser');

var _DataBrowser2 = _interopRequireDefault(_DataBrowser);

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
      menuItems: _DataBrowser2.default,
      showAction: _ComponentActions.ComponentActionTypes.SHOW_BROWSER,
      browserType: _Type.BrowserType.QUANDL,
      store: store
    });
  }
});
/*
<DialogContainer3
   id="QE"
   store={store}
   initAction={ComponentActionTypes.INIT_AND_SHOW_DIALOG}
   showAction={ComponentActionTypes.SHOW_DIALOG}
/>
*/

exports.default = QuandlBrowser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\QuandlBrowser.js.map