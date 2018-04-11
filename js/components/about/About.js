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

var _withTheme = require('../hoc/withTheme');

var _withTheme2 = _interopRequireDefault(_withTheme);

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ChartActions = require('../../flux/actions/ChartActions');

var _ScrollPane = require('../zhn/ScrollPane');

var _ScrollPane2 = _interopRequireDefault(_ScrollPane);

var _BrowserCaption = require('../zhn/BrowserCaption');

var _BrowserCaption2 = _interopRequireDefault(_BrowserCaption);

var _OpenClose = require('../zhn/OpenClose');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

var _TwitterLink = require('./TwitterLink');

var _TwitterLink2 = _interopRequireDefault(_TwitterLink);

var _DataProviders = require('./DataProviders');

var _DataProviders2 = _interopRequireDefault(_DataProviders);

var _StepTitle = require('./StepTitle');

var _StepTitle2 = _interopRequireDefault(_StepTitle);

var _Links = require('../links/Links');

var _Links2 = _interopRequireDefault(_Links);

var _IconLogoBar = require('./IconLogoBar');

var _IconLogoBar2 = _interopRequireDefault(_IconLogoBar);

var _About = require('./About.Style');

var _About2 = _interopRequireDefault(_About);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'ABOUT';

var CL = {
  ABOUT: 'about-container',
  SHOW: 'show-popup'
};

var STEP = {
  T1: "Choose a data source Browser from Topics [t]",
  T2: "Choose a dataset menu item in a Browser",
  T3: "Select params and enter query date in a draggable Dialog",
  T4: "Click a button Load",
  T5: "Also you can export chart to PNG, JPG, SVG, print to PDF"
};

var About = function (_Component) {
  (0, _inherits3.default)(About, _Component);

  /*
  static propsTypes = {
     theme: PropTypes.object,
     isShow: PropTypes.bool,
     store: PropTypes.object
  }
  */
  function About(props) {
    (0, _classCallCheck3.default)(this, About);

    var _this = (0, _possibleConstructorReturn3.default)(this, (About.__proto__ || Object.getPrototypeOf(About)).call(this));

    _this._calcIsProviders = function () {
      var strWidth = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
      switch (strWidth) {
        case '"W600"':case '"W500"':
          return true;
        default:
          return false;
      }
    };

    _this._onStore = function (actionType, data) {
      if (actionType === _ComponentActions.ComponentActionTypes.SHOW_ABOUT) {
        _this.setState({ isShow: true });
      } else if (actionType === _ChartActions.ChartActionTypes.INIT_AND_SHOW_CHART) {
        _this.setState({ isShow: false });
      } else if (actionType === _ChartActions.ChartActionTypes.SHOW_CHART) {
        _this.setState({ isShow: false });
      }
    };

    _this._handleClose = function () {
      _this.setState({ isShow: false });
    };

    _this.state = {
      isCloseProviders: _this._calcIsProviders(),
      isShow: props.isShow
    };
    return _this;
  }

  (0, _createClass3.default)(About, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.listen(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var theme = this.props.theme,
          TS = theme.getStyle(TH_ID),
          _state = this.state,
          isShow = _state.isShow,
          isCloseProviders = _state.isCloseProviders,
          _clOpen = isShow ? CL.SHOW : '',
          _clRoot = CL.ABOUT + ' ' + _clOpen,
          _styleOpen = isShow ? _About2.default.BLOCK : _About2.default.NONE;

      return _react2.default.createElement(
        'div',
        {
          className: _clRoot,
          style: (0, _extends3.default)({}, _styleOpen, TS.ROOT)
        },
        _react2.default.createElement(
          _BrowserCaption2.default,
          {
            caption: 'About',
            onClose: this._handleClose
          },
          _react2.default.createElement(_TwitterLink2.default, {
            rootStyle: _About2.default.BT_TWITTER,
            account: 'webapperc',
            title: 'Twitter page @wepapperc with examples'
          })
        ),
        _react2.default.createElement(
          _ScrollPane2.default,
          { style: _About2.default.SCROLL_DIV },
          _react2.default.createElement(
            'div',
            { style: (0, _extends3.default)({}, _About2.default.DIV_WRAPPER, _About2.default.GREY) },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                { style: _About2.default.GREEN },
                'Web app ERC\xA0'
              ),
              _react2.default.createElement(
                'span',
                null,
                'is an economic RESTful client.'
              )
            ),
            _react2.default.createElement(
              'p',
              { style: _About2.default.P_BOTTOM },
              'With it, you can view economic & finance open data from Web.'
            ),
            _react2.default.createElement(_DataProviders2.default, { isClose: isCloseProviders }),
            _react2.default.createElement(
              'div',
              { style: _About2.default.BLACK },
              _react2.default.createElement(_StepTitle2.default, { step: '1', title: STEP.T1 }),
              _react2.default.createElement(_StepTitle2.default, { step: '2', title: STEP.T2 }),
              _react2.default.createElement(_StepTitle2.default, { step: '3', title: STEP.T3 }),
              _react2.default.createElement(_StepTitle2.default, { step: '4', title: STEP.T4 }),
              _react2.default.createElement(_StepTitle2.default, { step: '5', title: STEP.T5 })
            ),
            _react2.default.createElement(
              'p',
              { style: (0, _extends3.default)({}, _About2.default.P_BOTTOM, _About2.default.MARGIN_TOP) },
              'The result will be shown in a chart in a resizebale container.'
            ),
            _react2.default.createElement(
              _OpenClose2.default,
              {
                isClose: true,
                caption: 'More...',
                rootStyle: _About2.default.MORE
              },
              _react2.default.createElement(
                'p',
                null,
                'After clicking a button Show in a Dialog will be opened Chart container with Charts or empty. After closing a Chart container all Charts remains.'
              ),
              _react2.default.createElement(
                'p',
                { style: _About2.default.P_BOTTOM },
                'In one time max three Dialogs can be opened.'
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.RED },
                  'Attention:\xA0'
                ),
                _react2.default.createElement(
                  'span',
                  null,
                  'For one item from Dialog can be only one Chart in a container. If you want to change query parameters for it, close the chart in the container and load data again.'
                )
              ),
              _react2.default.createElement(
                'p',
                { style: _About2.default.P_BOTTOM },
                'The value of currency is not always USD as shows in a chart tooltip. Sometimes more details about data can be look at tab Info on a Chart.'
              ),
              _react2.default.createElement(
                'p',
                { style: _About2.default.P_BOTTOM },
                _react2.default.createElement(
                  'span',
                  null,
                  'In that case of data loading from\xA0'
                ),
                _react2.default.createElement(_Links2.default.Quandl, null),
                _react2.default.createElement(
                  'span',
                  null,
                  '\xA0data provider, for accessing without API Key, exists some restriction on frequency and amount queries (',
                  _react2.default.createElement(
                    'span',
                    { style: _About2.default.BLUE_DARK },
                    '50 per day/1 at a time'
                  ),
                  _react2.default.createElement(
                    'span',
                    { style: _About2.default.GREY },
                    ').'
                  )
                )
              ),
              _react2.default.createElement(
                'p',
                null,
                'According to Quandl, anonymous requests can be deprecated soon. With API Key'
              ),
              _react2.default.createElement(
                'p',
                { style: _About2.default.P_BOTTOM },
                _react2.default.createElement(
                  'span',
                  null,
                  'you will be have (',
                  _react2.default.createElement(
                    'span',
                    { style: _About2.default.BLUE_DARK },
                    '50 000 per day/1 at a time'
                  ),
                  '). It\'s free of charge to receive.'
                )
              ),
              _react2.default.createElement(
                'p',
                null,
                'A Quandl API Key, for using with ERC, can be set in dialog Settings/User Settings. Settings save in browser\'s memory only for a current WEB session.'
              ),
              _react2.default.createElement(
                'p',
                { style: _About2.default.P_BOTTOM },
                'Premium Free Sample Data can be requested only with Quandl API Key.'
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  'For loading data from\xA0'
                ),
                _react2.default.createElement(_Links2.default.Eurostat, null),
                _react2.default.createElement(
                  'span',
                  null,
                  '\xA0does not exist any restrictions.'
                )
              )
            ),
            _react2.default.createElement(_IconLogoBar2.default, null),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                { style: _About2.default.BLACK },
                '*Logos Fair Use.'
              )
            )
          )
        )
      );
    }
  }]);
  return About;
}(_react.Component);

exports.default = (0, _withTheme2.default)(About);
//# sourceMappingURL=About.js.map