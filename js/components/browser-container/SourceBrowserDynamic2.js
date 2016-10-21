'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuBrowserDynamic = require('../zhn/MenuBrowserDynamic2');

var _MenuBrowserDynamic2 = _interopRequireDefault(_MenuBrowserDynamic);

var _BrowserActions = require('../../flux/actions/BrowserActions');

var _BrowserActions2 = _interopRequireDefault(_BrowserActions);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SourceBrowserDynamic2 = _react2.default.createClass({
  displayName: 'SourceBrowserDynamic2',
  shouldComponentUpdate: function shouldComponentUpdate() {
    return false;
  },
  render: function render() {
    return _react2.default.createElement(_MenuBrowserDynamic2.default, _extends({
      caption: 'Source Browser',
      showAction: _BrowserActions.BrowserActionTypes.SHOW_BROWSER_DYNAMIC,
      loadCompletedAction: _BrowserActions.BrowserActionTypes.LOAD_BROWSER_DYNAMIC_COMPLETED,
      onLoadMenu: _BrowserActions2.default.loadBrowserDynamic,
      onShowLoadDialog: _ComponentActions2.default.showModalDialog
    }, this.props));
  }
});

exports.default = SourceBrowserDynamic2;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-container\SourceBrowserDynamic2.js.map