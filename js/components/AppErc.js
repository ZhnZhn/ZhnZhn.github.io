'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _AnalyticActions = require('../flux/actions/AnalyticActions');

var _AnalyticActions2 = _interopRequireDefault(_AnalyticActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppErc = function (_Component) {
  _inherits(AppErc, _Component);

  function AppErc() {
    _classCallCheck(this, AppErc);

    return _possibleConstructorReturn(this, (AppErc.__proto__ || Object.getPrototypeOf(AppErc)).apply(this, arguments));
  }

  _createClass(AppErc, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _LocationSearch2.default.load(_ComponentActions2.default);
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
            updateBrowserAction: _BrowserActions.BrowserActionTypes.UPDATE_BROWSER_MENU,
            updateWatchAction: _BrowserActions.BrowserActionTypes.UPDATE_WATCH_BROWSER,
            initDialogAction: _ComponentActions.ComponentActionTypes.INIT_AND_SHOW_DIALOG,
            showDialogAction: _ComponentActions.ComponentActionTypes.SHOW_DIALOG
          }),
          _react2.default.createElement(_About2.default, { store: _ChartStore2.default, isShow: true }),
          _react2.default.createElement(_ComponentHrzContainer2.default, null)
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\AppErc.js.map