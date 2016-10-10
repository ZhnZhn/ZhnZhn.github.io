'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChartStore = require('../flux/stores/ChartStore');

var _ChartStore2 = _interopRequireDefault(_ChartStore);

var _HeaderBar = require('./header/HeaderBar');

var _HeaderBar2 = _interopRequireDefault(_HeaderBar);

var _BrowserContainer = require('./browser-container/BrowserContainer');

var _BrowserContainer2 = _interopRequireDefault(_BrowserContainer);

var _About = require('./about/About');

var _About2 = _interopRequireDefault(_About);

var _ComponentHrzContainer = require('./chart-container/ComponentHrzContainer');

var _ComponentHrzContainer2 = _interopRequireDefault(_ComponentHrzContainer);

var _DialogContainer = require('./dialogs/DialogContainer');

var _DialogContainer2 = _interopRequireDefault(_DialogContainer);

var _ConsentCookiePopup = require('./zhn/ConsentCookiePopup');

var _ConsentCookiePopup2 = _interopRequireDefault(_ConsentCookiePopup);

var _ComponentActions = require('../flux/actions/ComponentActions');

var _BrowserActions = require('../flux/actions/BrowserActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppErc = _react2.default.createClass({
  displayName: 'AppErc',
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_HeaderBar2.default, { store: _ChartStore2.default }),
      _react2.default.createElement(
        'div',
        { className: 'component-container' },
        _react2.default.createElement(_BrowserContainer2.default, {
          store: _ChartStore2.default,
          showBrowserAction: _BrowserActions.BrowserActionTypes.SHOW_BROWSER,
          initBrowserAction: _BrowserActions.BrowserActionTypes.INIT_BROWSER_DYNAMIC,
          updateBrowserAction: _BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU,
          updateWatchAction: _BrowserActions.BrowserActionTypes.UPDATE_WATCH_BROWSER,
          initDialogAction: _ComponentActions.ComponentActionTypes.INIT_AND_SHOW_DIALOG,
          showDialogAction: _ComponentActions.ComponentActionTypes.SHOW_DIALOG
        }),
        _react2.default.createElement(_About2.default, { store: _ChartStore2.default, isShow: true }),
        _react2.default.createElement(_ComponentHrzContainer2.default, null)
      ),
      _react2.default.createElement(_DialogContainer2.default, { store: _ChartStore2.default }),
      _react2.default.createElement(_ConsentCookiePopup2.default, null)
    );
  }
});

exports.default = AppErc;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\AppErc.js.map