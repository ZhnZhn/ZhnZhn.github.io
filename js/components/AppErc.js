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

var _LocationSearch = require('../flux/logic/LocationSearch');

var _LocationSearch2 = _interopRequireDefault(_LocationSearch);

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

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _BrowserActions = require('../flux/actions/BrowserActions');

var _ChartActions = require('../flux/actions/ChartActions');

var _AnalyticActions = require('../flux/actions/AnalyticActions');

var _AnalyticActions2 = _interopRequireDefault(_AnalyticActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PREV_BUILD = '15-03-2018';

var AppErc = function (_Component) {
  (0, _inherits3.default)(AppErc, _Component);

  function AppErc() {
    (0, _classCallCheck3.default)(this, AppErc);
    return (0, _possibleConstructorReturn3.default)(this, (AppErc.__proto__ || Object.getPrototypeOf(AppErc)).apply(this, arguments));
  }

  (0, _createClass3.default)(AppErc, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _LocationSearch2.default.load(_ComponentActions2.default);
      fetch('./data/build.json', { cache: "no-cache" }).then(function (res) {
        return res.json();
      }).then(function (json) {
        var _json$build = json.build,
            build = _json$build === undefined ? '' : _json$build;

        if (build !== PREV_BUILD && document.cookie.indexOf('erc') === -1) {
          _ComponentActions2.default.showModalDialog("RELOAD", {
            prevDate: PREV_BUILD,
            nextDate: build
          });
        }
      }).catch(function (err) {
        console.log(err.message);
      });
    }
  }, {
    key: 'render',
    value: function render() {
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
            updateBrowserAction: _BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU
            //updateWatchAction={BrowserActionTypes.UPDATE_WATCH_BROWSER}
            , showDialogAction: _ComponentActions.ComponentActionTypes.SHOW_DIALOG,
            onCloseDialog: _ComponentActions2.default.closeDialog
          }),
          _react2.default.createElement(_About2.default, { store: _ChartStore2.default, isShow: true }),
          _react2.default.createElement(_ComponentHrzContainer2.default, {
            store: _ChartStore2.default,
            addAction: _ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART
          })
        ),
        _react2.default.createElement(_DialogContainer2.default, { store: _ChartStore2.default }),
        _react2.default.createElement(_ConsentCookiePopup2.default, {
          onAnswerYes: _AnalyticActions2.default.answerYes,
          onAnswerNo: _AnalyticActions2.default.answerNo,
          onNoAnswer: _AnalyticActions2.default.noAnswer
        })
      );
    }
  }]);
  return AppErc;
}(_react.Component);

exports.default = AppErc;
//# sourceMappingURL=AppErc.js.map