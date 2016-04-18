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

var YahooBrowser = _react2.default.createClass({
   displayName: 'YahooBrowser',

   render: function render() {
      var store = this.props.store;

      return _react2.default.createElement(_MenuBrowser2.default, {
         caption: 'Quandl Yahoo Stocks',
         showAction: _ComponentActions.ComponentActionTypes.SHOW_BROWSER,
         browserType: _Type.BrowserType.QUANDL_YAHOO,
         store: store
      });
   }
});

exports.default = YahooBrowser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\yahoo-browser\YahooBrowser.js.map