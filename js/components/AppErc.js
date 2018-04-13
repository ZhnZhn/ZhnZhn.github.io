'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _theme = require('./styles/theme');

var _theme2 = _interopRequireDefault(_theme);

var _ThemeContext = require('./hoc/ThemeContext');

var _ThemeContext2 = _interopRequireDefault(_ThemeContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PREV_BUILD = '12-04-2018';

var answerYes = _AnalyticActions2.default.answerYes,
    answerView = _AnalyticActions2.default.answerView,
    answerNo = _AnalyticActions2.default.answerNo,
    noAnswer = _AnalyticActions2.default.noAnswer;


var _checkBuild = function _checkBuild() {
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
};

var AppErc = function (_Component) {
  (0, _inherits3.default)(AppErc, _Component);

  function AppErc() {
    (0, _classCallCheck3.default)(this, AppErc);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AppErc.__proto__ || Object.getPrototypeOf(AppErc)).call(this));

    _this._onStore = function (actionType, themeName) {
      if (actionType === _ComponentActions.ComponentActionTypes.CHANGE_THEME) {
        _this.setState(function (_ref) {
          var theme = _ref.theme;

          theme.setThemeName(themeName);
          return {
            theme: (0, _extends3.default)({}, theme)
          };
        });
      }
    };

    _this.state = {
      theme: _theme2.default
    };
    return _this;
  }

  (0, _createClass3.default)(AppErc, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubsribe = _ChartStore2.default.listen(this._onStore);
      _LocationSearch2.default.load(_ComponentActions2.default);
      _checkBuild();
    }
  }, {
    key: 'componentWillUnmout',
    value: function componentWillUnmout() {
      this.unsubsribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var theme = this.state.theme;

      return _react2.default.createElement(
        _ThemeContext2.default.Provider,
        { value: theme },
        _react2.default.createElement(
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
              //updateWatchAction={BAT.UPDATE_WATCH_BROWSER}
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
            onAnswerYes: answerYes,
            onAnswerView: answerView,
            onAnswerNo: answerNo,
            onNoAnswer: noAnswer
          })
        )
      );
    }
  }]);
  return AppErc;
}(_react.Component);

exports.default = AppErc;
//# sourceMappingURL=AppErc.js.map