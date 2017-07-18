'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Type = require('../../constants/Type');

var _QuandlBrowser = require('../quandl-browser/QuandlBrowser');

var _QuandlBrowser2 = _interopRequireDefault(_QuandlBrowser);

var _WatchBrowser = require('../watch-browser/WatchBrowser');

var _WatchBrowser2 = _interopRequireDefault(_WatchBrowser);

var _DialogContainer = require('../zhn-containers/DialogContainer');

var _DialogContainer2 = _interopRequireDefault(_DialogContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BrowserContainer = function (_Component) {
  (0, _inherits3.default)(BrowserContainer, _Component);

  function BrowserContainer(props) {
    (0, _classCallCheck3.default)(this, BrowserContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BrowserContainer.__proto__ || Object.getPrototypeOf(BrowserContainer)).call(this));

    _this._onStore = function (actionType, data) {
      if (actionType === _this.props.initBrowserAction) {
        _this.setState(function (prevState) {
          prevState.elBrowsers.unshift(data);
          return prevState;
        });
      }
    };

    _this.state = {
      elBrowsers: []
    };
    return _this;
  }

  (0, _createClass3.default)(BrowserContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var store = this.props.store;

      this.unsubscribe = store.listen(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          store = _props.store,
          showBrowserAction = _props.showBrowserAction,
          updateBrowserAction = _props.updateBrowserAction,
          updateWatchAction = _props.updateWatchAction,
          showDialogAction = _props.showDialogAction,
          elBrowsers = this.state.elBrowsers;


      return _react2.default.createElement(
        'div',
        { className: 'hrz-container' },
        _react2.default.createElement(_QuandlBrowser2.default, {
          browserType: _Type.BrowserType.ECONOMIC,
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
          showAction: showDialogAction
        })
      );
    }
  }]);
  return BrowserContainer;
}(_react.Component);

exports.default = BrowserContainer;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\browser-container\BrowserContainer.js.map