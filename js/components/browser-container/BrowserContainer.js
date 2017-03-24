'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Type = require('../../constants/Type');

var _QuandlBrowser = require('../quandl-browser/QuandlBrowser');

var _QuandlBrowser2 = _interopRequireDefault(_QuandlBrowser);

var _WatchBrowser = require('../watch-browser/WatchBrowser');

var _WatchBrowser2 = _interopRequireDefault(_WatchBrowser);

var _DialogContainer = require('../zhn/DialogContainer3');

var _DialogContainer2 = _interopRequireDefault(_DialogContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowserContainer = _react2.default.createClass({
  displayName: 'BrowserContainer',
  getInitialState: function getInitialState() {
    return {
      elBrowsers: []
    };
  },
  componentWillMount: function componentWillMount() {
    var store = this.props.store;

    this.unsubscribe = store.listen(this._onStore);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unsubscribe();
  },
  _onStore: function _onStore(actionType, data) {
    if (actionType === this.props.initBrowserAction) {
      this.state.elBrowsers.unshift(data);
      this.setState(this.state);
    }
  },
  render: function render() {
    var _props = this.props,
        store = _props.store,
        showBrowserAction = _props.showBrowserAction,
        updateBrowserAction = _props.updateBrowserAction,
        updateWatchAction = _props.updateWatchAction,
        initDialogAction = _props.initDialogAction,
        showDialogAction = _props.showDialogAction,
        showOptionDialogAction = _props.showOptionDialogAction,
        elBrowsers = this.state.elBrowsers;


    return _react2.default.createElement(
      'div',
      { className: 'hrz-container' },
      _react2.default.createElement(_QuandlBrowser2.default
      //browserType={BrowserType.QUANDL}
      , { browserType: _Type.BrowserType.ECONOMIC,
        caption: 'Quandl Economic',
        store: store,
        showAction: showBrowserAction,
        updateAction: updateBrowserAction
      }),
      _react2.default.createElement(_WatchBrowser2.default, {
        browserType: _Type.BrowserType.WATCH_LIST,
        caption: 'Watch List',
        store: store,
        showAction: showBrowserAction,
        updateAction: updateWatchAction
      }),
      elBrowsers,
      _react2.default.createElement(_DialogContainer2.default, {
        maxDialog: 3,
        store: store,
        initAction: initDialogAction,
        showAction: showDialogAction,
        showOptionAction: showOptionDialogAction
      })
    );
  }
});

exports.default = BrowserContainer;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-container\BrowserContainer.js.map