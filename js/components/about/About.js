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

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

var _LinkToken = require('./LinkToken');

var _LinkToken2 = _interopRequireDefault(_LinkToken);

var _IconLogoBar = require('./IconLogoBar');

var _IconLogoBar2 = _interopRequireDefault(_IconLogoBar);

var _ContainerStyles = require('../styles/ContainerStyles');

var _ContainerStyles2 = _interopRequireDefault(_ContainerStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _ContainerStyles2.default;

var Styles = {
  scrollDiv: {
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
          style: Object.assign({}, styles.aboutRootDiv, _styleOpen)
        },
        _react2.default.createElement(
          _BrowserCaption2.default,
          {
            caption: 'About',
            onClose: this._handleClose
          },
          _react2.default.createElement(_TwitterLink2.default, {
            rootStyle: Styles.BT_TWITTER,
            account: 'webapperc',
            title: 'Twitter page @wepapperc with examples'
          })
        ),
        _react2.default.createElement(
          _ScrollPane2.default,
          { style: Styles.scrollDiv },
          _react2.default.createElement(
            'div',
            { style: Styles.DIV_WRAPPER },
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                _Token2.default,
                { color: '#80c040' },
                'ANNOUNCEMENT:'
              )
            ),
            _react2.default.createElement(
              'p',
              { style: { marginBottom: '16px' } },
              'Database ',
              _react2.default.createElement(
                _Token2.default,
                { color: 'black' },
                'GOOG, YAHOO'
              ),
              ' will not be hosted by',
              _react2.default.createElement(
                _LinkToken2.default,
                {
                  href: 'https://www.quandl.com/',
                  color: '#E05927',
                  isFirstBlank: true
                },
                'Quandl'
              ),
              _react2.default.createElement(
                _Token2.default,
                { color: '#fdb316', isFirstBlank: true },
                'from 1, Jule 2017'
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                _Token2.default,
                { color: '#80c040' },
                'ERC'
              ),
              _react2.default.createElement(
                _Token2.default,
                { color: 'gray', isFirstBlank: true },
                'is an economic RESTful client.'
              )
            ),
            _react2.default.createElement(
              'p',
              { style: Styles.P_BOTTOM },
              'With it, you can view economic free open data from WEB.'
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                _Token2.default,
                { color: 'gray' },
                'Data providers:'
              )
            ),
            _react2.default.createElement(
              'p',
              { style: Styles.P_BOTTOM },
              _react2.default.createElement(
                _LinkToken2.default,
                {
                  href: 'https://www.quandl.com/',
                  color: '#E05927',
                  isFirstBlank: true
                },
                'Quandl'
              ),
              _react2.default.createElement(
                _Token2.default,
                { color: 'black' },
                '\xA0(Key),'
              ),
              _react2.default.createElement(
                _LinkToken2.default,
                {
                  href: 'http://ec.europa.eu/eurostat',
                  color: '#009ae5',
                  isFirstBlank: true
                },
                'Eurostat'
              ),
              _react2.default.createElement(
                _Token2.default,
                { color: '#009ae5' },
                ','
              ),
              _react2.default.createElement(
                _LinkToken2.default,
                {
                  href: 'https://www.barchartmarketdata.com',
                  color: '#bd1010',
                  isFirstBlank: true
                },
                'Barchart Market Data'
              ),
              _react2.default.createElement(
                _Token2.default,
                { color: 'black' },
                '\xA0(Key),'
              ),
              _react2.default.createElement(
                _LinkToken2.default,
                {
                  href: 'https://www.alphavantage.co',
                  color: '#009ae5',
                  isFirstBlank: true
                },
                'Alpha Vantage'
              ),
              _react2.default.createElement(
                _Token2.default,
                { color: 'black' },
                '\xA0(Key).'
              )
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(_Step2.default, { step: '1' }),
              _react2.default.createElement(
                _Token2.default,
                { color: 'black', isFirstBlank: true },
                'Choose a data source Browser from the header bar'
              )
            ),
            _react2.default.createElement(
              'p',
              { style: Styles.MARGIN_TOP },
              _react2.default.createElement(_Step2.default, { step: '2' }),
              _react2.default.createElement(
                _Token2.default,
                { color: 'black', isFirstBlank: true },
                'Choose a dataset menu item in a Browser'
              )
            ),
            _react2.default.createElement(
              'p',
              { style: Styles.MARGIN_TOP },
              _react2.default.createElement(_Step2.default, { step: '3' }),
              _react2.default.createElement(
                _Token2.default,
                { color: 'black', isFirstBlank: true },
                'Select params and enter query date in a draggable Dialog'
              )
            ),
            _react2.default.createElement(
              'p',
              { style: Styles.MARGIN_TOP },
              _react2.default.createElement(_Step2.default, { step: '4' }),
              _react2.default.createElement(
                _Token2.default,
                { color: 'black', isFirstBlank: true },
                'Click a button Load'
              )
            ),
            _react2.default.createElement(
              'p',
              { style: Styles.MARGIN_TOP },
              _react2.default.createElement(_Step2.default, { step: '5' }),
              _react2.default.createElement(
                _Token2.default,
                { color: 'black', isFirstBlank: true },
                'Also you can export chart to PNG, JPG, SVG, print to PDF'
              )
            ),
            _react2.default.createElement(
              'p',
              { style: Object.assign({}, Styles.P_BOTTOM, Styles.MARGIN_TOP) },
              'The result will be shown in a Chart in a Chart container.'
            ),
            _react2.default.createElement(
              'p',
              null,
              'After clicking a button Show in a Dialog will be opened Chart container with Charts or empty. After closing a Chart container all Charts remains.'
            ),
            _react2.default.createElement(
              'p',
              { style: Styles.P_BOTTOM },
              'In one time max three Dialogs can be opened.'
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                _Token2.default,
                { color: '#F44336' },
                'Attention:'
              ),
              _react2.default.createElement(
                _Token2.default,
                { color: 'gray', isFirstBlank: true },
                'For one item from Dialog can be only one Chart in a container. If you want to change query parameters for it, close the chart in the container and load data again.'
              )
            ),
            _react2.default.createElement(
              'p',
              { style: Styles.P_BOTTOM },
              'The value of currency is not always USD as shows in a chart tooltip. Sometimes more details about data can be look at tab Info on a Chart.'
            ),
            _react2.default.createElement(
              'p',
              { style: Styles.P_BOTTOM },
              _react2.default.createElement(
                _Token2.default,
                { color: 'gray' },
                'In that case of data loading from'
              ),
              _react2.default.createElement(
                _LinkToken2.default,
                {
                  href: 'https://www.quandl.com/',
                  color: '#E05927',
                  isFirstBlank: true
                },
                'Quandl'
              ),
              _react2.default.createElement(
                _Token2.default,
                { color: 'gray', isFirstBlank: true },
                'data provider, for accessing without API Key, exists some restriction on frequency and amount queries (',
                _react2.default.createElement(
                  _Token2.default,
                  { color: '#2f7ed8' },
                  '50 per day/1 at a time'
                ),
                _react2.default.createElement(
                  _Token2.default,
                  { color: 'gray' },
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
              { style: Styles.P_BOTTOM },
              _react2.default.createElement(
                _Token2.default,
                { color: 'gray' },
                'you will be have (',
                _react2.default.createElement(
                  _Token2.default,
                  { color: '#2f7ed8' },
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
              { style: Styles.P_BOTTOM },
              'Premium Free Sample Data can be requested only with Quandl API Key.'
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                _Token2.default,
                { color: 'gray' },
                'For loading data from'
              ),
              _react2.default.createElement(
                _LinkToken2.default,
                {
                  href: 'http://ec.europa.eu/eurostat',
                  color: '#009ae5',
                  isFirstBlank: true
                },
                'Eurostat'
              ),
              _react2.default.createElement(
                _Token2.default,
                { color: 'gray', isFirstBlank: true },
                'does not exist any restrictions.'
              )
            ),
            _react2.default.createElement(_IconLogoBar2.default, null),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                _Token2.default,
                { color: 'black' },
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