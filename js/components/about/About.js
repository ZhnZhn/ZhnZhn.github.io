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

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ChartActions = require('../../flux/actions/ChartActions');

var _ScrollPane = require('../zhn/ScrollPane');

var _ScrollPane2 = _interopRequireDefault(_ScrollPane);

var _BrowserCaption = require('../zhn/BrowserCaption');

var _BrowserCaption2 = _interopRequireDefault(_BrowserCaption);

var _TwitterLink = require('./TwitterLink');

var _TwitterLink2 = _interopRequireDefault(_TwitterLink);

var _Step = require('./Step');

var _Step2 = _interopRequireDefault(_Step);

var _Links = require('../links/Links');

var _Links2 = _interopRequireDefault(_Links);

var _IconLogoBar = require('./IconLogoBar');

var _IconLogoBar2 = _interopRequireDefault(_IconLogoBar);

var _ContainerStyles = require('../styles/ContainerStyles');

var _ContainerStyles2 = _interopRequireDefault(_ContainerStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  SCROLL_DIV: {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px'
  },
  DIV_WRAPPER: {
    paddingLeft: '12px',
    paddingRight: '5px',
    lineHeight: 1.4,
    color: 'gray',
    fontWeight: 'bold'
  },
  P_BOTTOM: {
    marginBottom: '1em'
  },
  MARGIN_TOP: {
    marginTop: '3px'
  },
  BT_TWITTER: {
    marginLeft: '12px'
  },
  GREEN: {
    color: '#80c040'
  },
  GRAY: {
    color: 'gray'
  },
  BLACK: {
    color: 'black'
  },
  BLUE: {
    color: '#009ae5'
  },
  BLUE_DARK: {
    color: '#2f7ed8'
  },
  RED: {
    color: '#F44336'
  }
};

var About = function (_Component) {
  (0, _inherits3.default)(About, _Component);

  function About(props) {
    (0, _classCallCheck3.default)(this, About);

    var _this = (0, _possibleConstructorReturn3.default)(this, (About.__proto__ || Object.getPrototypeOf(About)).call(this));

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
      isShow: props.isShow
    };
    return _this;
  }

  (0, _createClass3.default)(About, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
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
      var isShow = this.state.isShow,
          _classOpen = isShow ? "show-popup" : null,
          _styleOpen = isShow ? { display: 'block' } : { display: 'none' };

      return _react2.default.createElement(
        'div',
        {
          className: _classOpen,
          style: Object.assign({}, _ContainerStyles2.default.aboutRootDiv, _styleOpen)
        },
        _react2.default.createElement(
          _BrowserCaption2.default,
          {
            caption: 'About',
            onClose: this._handleClose
          },
          _react2.default.createElement(_TwitterLink2.default, {
            rootStyle: S.BT_TWITTER,
            account: 'webapperc',
            title: 'Twitter page @wepapperc with examples'
          })
        ),
        _react2.default.createElement(
          _ScrollPane2.default,
          { style: S.SCROLL_DIV },
          _react2.default.createElement(
            'div',
            { style: (0, _extends3.default)({}, S.DIV_WRAPPER, S.GREY) },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                { style: S.GREEN },
                'ERC\xA0'
              ),
              _react2.default.createElement(
                'span',
                null,
                'is an economic RESTful client.'
              )
            ),
            _react2.default.createElement(
              'p',
              { style: S.P_BOTTOM },
              'With it, you can view economic free open data from WEB.'
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                null,
                'Data providers:'
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(_Links2.default.Quandl, null),
              _react2.default.createElement(
                'span',
                { style: S.BLACK },
                '\xA0(Key),\xA0'
              ),
              _react2.default.createElement(_Links2.default.Barchart, null),
              _react2.default.createElement(
                'span',
                { style: S.BLACK },
                '\xA0(Key),\xA0'
              ),
              _react2.default.createElement(_Links2.default.AlphaVantage, null),
              _react2.default.createElement(
                'span',
                { style: S.BLACK },
                '\xA0(Key),'
              )
            ),
            _react2.default.createElement(
              'p',
              { style: S.P_BOTTOM },
              _react2.default.createElement(_Links2.default.Eurostat, null),
              _react2.default.createElement(
                'span',
                { style: S.BLUE },
                ',\xA0'
              ),
              _react2.default.createElement(_Links2.default.UnComtrade, null),
              _react2.default.createElement(
                'span',
                { style: S.BLUE },
                ',\xA0'
              ),
              _react2.default.createElement(_Links2.default.Insee, null),
              _react2.default.createElement(
                'span',
                { style: S.BLACK },
                '\xA0(Https Proxy for CORS).'
              )
            ),
            _react2.default.createElement(
              'div',
              { style: S.BLACK },
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(_Step2.default, { step: '1' }),
                _react2.default.createElement(
                  'span',
                  null,
                  '\xA0Choose a data source Browser from Topics.'
                )
              ),
              _react2.default.createElement(
                'p',
                { style: S.MARGIN_TOP },
                _react2.default.createElement(_Step2.default, { step: '2' }),
                _react2.default.createElement(
                  'span',
                  null,
                  '\xA0Choose a dataset menu item in a Browser.'
                )
              ),
              _react2.default.createElement(
                'p',
                { style: S.MARGIN_TOP },
                _react2.default.createElement(_Step2.default, { step: '3' }),
                _react2.default.createElement(
                  'span',
                  null,
                  '\xA0Select params and enter query date in a draggable Dialog.'
                )
              ),
              _react2.default.createElement(
                'p',
                { style: S.MARGIN_TOP },
                _react2.default.createElement(_Step2.default, { step: '4' }),
                _react2.default.createElement(
                  'span',
                  null,
                  '\xA0Click a button Load.'
                )
              ),
              _react2.default.createElement(
                'p',
                { style: S.MARGIN_TOP },
                _react2.default.createElement(_Step2.default, { step: '5' }),
                _react2.default.createElement(
                  'span',
                  null,
                  '\xA0Also you can export chart to PNG, JPG, SVG, print to PDF.'
                )
              )
            ),
            _react2.default.createElement(
              'p',
              { style: Object.assign({}, S.P_BOTTOM, S.MARGIN_TOP) },
              'The result will be shown in a Chart in a Chart container.'
            ),
            _react2.default.createElement(
              'p',
              null,
              'After clicking a button Show in a Dialog will be opened Chart container with Charts or empty. After closing a Chart container all Charts remains.'
            ),
            _react2.default.createElement(
              'p',
              { style: S.P_BOTTOM },
              'In one time max three Dialogs can be opened.'
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                { style: S.RED },
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
              { style: S.P_BOTTOM },
              'The value of currency is not always USD as shows in a chart tooltip. Sometimes more details about data can be look at tab Info on a Chart.'
            ),
            _react2.default.createElement(
              'p',
              { style: S.P_BOTTOM },
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
                  { style: S.BLUE_DARK },
                  '50 per day/1 at a time'
                ),
                _react2.default.createElement(
                  'span',
                  { style: S.GREY },
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
              { style: S.P_BOTTOM },
              _react2.default.createElement(
                'span',
                null,
                'you will be have (',
                _react2.default.createElement(
                  'span',
                  { style: S.BLUE_DARK },
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
              { style: S.P_BOTTOM },
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
            ),
            _react2.default.createElement(_IconLogoBar2.default, null),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                { style: S.BLACK },
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

exports.default = About;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\about\About.js.map