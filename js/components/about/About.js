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

var _Comp = require('../Comp');

var _Comp2 = _interopRequireDefault(_Comp);

var _TwitterLink = require('./TwitterLink');

var _TwitterLink2 = _interopRequireDefault(_TwitterLink);

var _DataProviders = require('./DataProviders');

var _DataProviders2 = _interopRequireDefault(_DataProviders);

var _StepTitle = require('./StepTitle');

var _StepTitle2 = _interopRequireDefault(_StepTitle);

var _ProviderLinks = require('../links/ProviderLinks');

var _ProviderLinks2 = _interopRequireDefault(_ProviderLinks);

var _LogosBar = require('./LogosBar');

var _LogosBar2 = _interopRequireDefault(_LogosBar);

var _Color = require('../styles/Color');

var _Color2 = _interopRequireDefault(_Color);

var _About = require('./About.Style');

var _About2 = _interopRequireDefault(_About);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TH_ID = 'ABOUT';

var CL = {
  ABOUT: 'about-container',
  SCROLL: 'scroll-container-y',
  SHOW: 'show-popup'
};

var STEP = {
  T1: "Please, choose a data source Browser from Topics [t]",
  T2: "Next, choose a dataset menu item in the the opended up Browser",
  T3: "Select params and enter query date in the opened up draggable Dialog",
  T4: "Click a button Load",
  T5: "Also you can export chart to PNG, JPG, SVG, print to PDF"
};

var OC_CAPTION_STYLE = {
  color: _Color2.default.TITLE
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

    var _this = (0, _possibleConstructorReturn3.default)(this, (About.__proto__ || Object.getPrototypeOf(About)).call(this, props));

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
          _Comp2.default.BrowserCaption,
          {
            caption: 'About',
            onClose: this._handleClose
          },
          _react2.default.createElement(_TwitterLink2.default, {
            rootStyle: _About2.default.BT_TWITTER,
            account: 'webapperc',
            title: 'Twitter page @wepapperc with chart examples'
          })
        ),
        _react2.default.createElement(
          _Comp2.default.ScrollPane,
          {
            className: CL.SCROLL,
            style: _About2.default.SCROLL_DIV
          },
          _react2.default.createElement(
            'div',
            { style: (0, _extends3.default)({}, _About2.default.DIV_WRAPPER, _About2.default.GREY) },
            _react2.default.createElement(
              'p',
              { style: _About2.default.MB_4 },
              _react2.default.createElement(
                'span',
                { style: _About2.default.GREEN },
                'ERC (Economic RESTful Client)\xA0'
              ),
              _react2.default.createElement(
                'span',
                null,
                'is a web app that gives the ability to explore, visualize and compose economic and financial data mostly to charts from open and private data providers.'
              )
            ),
            _react2.default.createElement(_DataProviders2.default, {
              isClose: isCloseProviders,
              ocCaptionStyle: OC_CAPTION_STYLE
            }),
            _react2.default.createElement(
              'div',
              { style: _About2.default.BLACK },
              _react2.default.createElement(_StepTitle2.default, { step: '1', title: STEP.T1 }),
              _react2.default.createElement(_StepTitle2.default, { step: '2', title: STEP.T2 }),
              _react2.default.createElement(_StepTitle2.default, { step: '3', title: STEP.T3 }),
              _react2.default.createElement(_StepTitle2.default, { step: '4', title: STEP.T4 })
            ),
            _react2.default.createElement(
              'p',
              { style: _About2.default.MARGIN_TOP },
              'The result will be shown in a chart in a resizebale container.'
            ),
            _react2.default.createElement(
              'p',
              { style: _About2.default.MB_8EM },
              'Also it\'s possible to export the chart to PNG, JPG, SVG or print to PDF.'
            ),
            _react2.default.createElement(
              'p',
              { style: _About2.default.MB_6EM },
              _react2.default.createElement(
                'span',
                { style: _About2.default.RED },
                'Attention:\xA0'
              ),
              _react2.default.createElement(
                'span',
                null,
                'For one item from ',
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.BLACK },
                  'Dialog'
                ),
                ' can be only one ',
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.BLACK },
                  'Chart item'
                ),
                ' in a container. More information about a dataset can be found on a ',
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.BLACK },
                  'tab Info of Chart item.'
                )
              )
            ),
            _react2.default.createElement(
              _Comp2.default.OpenClose,
              {
                isClose: true,
                caption: 'More...',
                ocStyle: _About2.default.LH_18,
                captionStyle: OC_CAPTION_STYLE,
                rootStyle: _About2.default.LH_14,
                openColor: _Color2.default.YELLOW
              },
              _react2.default.createElement(
                'p',
                { style: _About2.default.MB_8EM },
                'After clicking a ',
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.BLACK },
                  'button Show'
                ),
                ' in a Dialog will be an opened up ',
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.BLACK },
                  'Chart container'
                ),
                ' with charts or empty. After closing a ',
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.BLACK },
                  'Chart container'
                ),
                ' all charts remains. In one time max three ',
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.BLACK },
                  'Dialogs'
                ),
                ' can be opened.'
              ),
              _react2.default.createElement(
                'p',
                { style: _About2.default.MB_8EM },
                'Some open and private data providers require user\'s ',
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.BLACK },
                  'API Key'
                ),
                '.'
              ),
              _react2.default.createElement(
                'p',
                { style: _About2.default.MB_8EM },
                _react2.default.createElement(
                  'span',
                  null,
                  'For example, for loading data from\xA0'
                ),
                _react2.default.createElement(_ProviderLinks2.default.Quandl, null),
                _react2.default.createElement(
                  'span',
                  null,
                  '\xA0without API Key exists some restriction on frequency and amount of queries (',
                  _react2.default.createElement(
                    'span',
                    { style: _About2.default.BLUE_DARK },
                    '50 per day/1 at a time'
                  ),
                  ') and can be deprecated, according to Quandl. With ',
                  _react2.default.createElement(
                    'span',
                    { style: _About2.default.BLACK },
                    'API Key'
                  ),
                  ' it is possible to make (',
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
                { style: _About2.default.MB_8EM },
                'Data providers API Keys can be set on the ',
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.BLACK },
                  'tab ApiKeys, dialog Settings [s]'
                ),
                '.'
              ),
              _react2.default.createElement(
                'p',
                { style: _About2.default.MB_8EM },
                'Also for loading data from data providers with HTTP protocol required ',
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.BLACK },
                  'HTTPS proxy server'
                ),
                ', by default settled in the ',
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.BLACK },
                  'tab Options, dialog Settings [s]'
                ),
                '.'
              ),
              _react2.default.createElement(
                'p',
                { style: _About2.default.MB_8EM },
                'There is three UI theme in the web app ERC: ',
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.BLACK },
                  'Dark, Light, and Sand'
                ),
                ' can be set on ',
                _react2.default.createElement(
                  'span',
                  { style: _About2.default.BLACK },
                  'tab Options, dialog Settings [s]'
                ),
                '. All user\'s settings keep in browser\'s memory only for a current web session.'
              )
            ),
            _react2.default.createElement(_LogosBar2.default, null),
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