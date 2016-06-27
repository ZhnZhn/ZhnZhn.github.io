'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MenuBrowserDynamic = require('../zhn/MenuBrowserDynamic');

var _MenuBrowserDynamic2 = _interopRequireDefault(_MenuBrowserDynamic);

var _BrowserActions = require('../../flux/actions/BrowserActions');

var _BrowserActions2 = _interopRequireDefault(_BrowserActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SourceBrowserDynamic = _react2.default.createClass({
   displayName: 'SourceBrowserDynamic',
   render: function render() {
      var props = this.props;
      return _react2.default.createElement(_MenuBrowserDynamic2.default, _extends({
         caption: 'Source Browser',
         showAction: _BrowserActions.BrowserActionTypes.SHOW_BROWSER_DYNAMIC,
         loadCompletedAction: _BrowserActions.BrowserActionTypes.LOAD_BROWSER_DYNAMIC_COMPLETED,
         updateAction: _BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU,
         onLoadMenu: _BrowserActions2.default.loadBrowserDynamic
      }, props));
   }
});

exports.default = SourceBrowserDynamic;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-container\SourceBrowserDynamic.js.map