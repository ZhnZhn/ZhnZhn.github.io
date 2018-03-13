'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OpenClose = require('../zhn/OpenClose');

var _OpenClose2 = _interopRequireDefault(_OpenClose);

var _Links = require('../links/Links');

var _Links2 = _interopRequireDefault(_Links);

var _About = require('./About.Style');

var _About2 = _interopRequireDefault(_About);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CL = {
  BR: "provider__note__br"
};

var OPEN_COLOR_L2 = "#80c040";

var ST = {
  ROOT_CHILD: {
    borderLeft: '1px dashed yellow',
    marginLeft: '-5px',
    paddingLeft: '8px'
  },
  OPEN_CLOSE: {
    paddingTop: '6px',
    lineHeight: 1.8
  },
  CHILD_STYLE: {
    borderLeft: '1px dotted #80c040',
    marginLeft: '2px',
    paddingLeft: '6px'
  },
  P4: {
    paddingTop: '4px'
  },
  NOTE: {
    padding: '8px 4px 4px 6px',
    lineHeight: 1.4
  },
  MAX_WIDTH: {
    maxWidth: '450px'
  },
  SETTINGS: {
    color: '#607d8b'
  }
};

var DataProviders = function DataProviders(_ref) {
  var isClose = _ref.isClose;
  return _react2.default.createElement(
    _OpenClose2.default,
    {
      isClose: isClose,
      caption: 'Data Providers (All 15):',
      rootStyle: (0, _extends3.default)({}, _About2.default.LINE_HEIGHT, _About2.default.P_BOTTOM),
      childStyle: ST.ROOT_CHILD
    },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        null,
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.Quandl, null),
          _react2.default.createElement(
            'span',
            { style: _About2.default.BLACK },
            '\xA0(50 per day)'
          )
        ),
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.Eurostat, null)
        ),
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.UnComtrade, null)
        ),
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.StatNorway, null)
        ),
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.StatSweden, null)
        ),
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.Iex, null)
        ),
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.CryptoCompare, null)
        ),
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.Cmc, null)
        )
      ),
      _react2.default.createElement(
        _OpenClose2.default,
        {
          caption: '(5) Required API key:',
          rootStyle: ST.OPEN_CLOSE,
          childStyle: ST.CHILD_STYLE,
          isClose: true,
          openColor: OPEN_COLOR_L2
        },
        _react2.default.createElement(
          'p',
          { style: ST.P4 },
          _react2.default.createElement(
            'span',
            { style: _About2.default.PROVIDER },
            _react2.default.createElement(_Links2.default.Quandl, null),
            _react2.default.createElement(
              'span',
              { style: _About2.default.BLACK },
              '\xA0(50 000 per day)'
            )
          ),
          _react2.default.createElement(
            'span',
            { style: _About2.default.PROVIDER },
            _react2.default.createElement(_Links2.default.Barchart, null)
          ),
          _react2.default.createElement(
            'span',
            { style: _About2.default.PROVIDER },
            _react2.default.createElement(_Links2.default.AlphaVantage, null)
          ),
          _react2.default.createElement(
            'span',
            { style: _About2.default.PROVIDER },
            _react2.default.createElement(_Links2.default.Bea, null)
          ),
          _react2.default.createElement(
            'span',
            { style: _About2.default.PROVIDER },
            _react2.default.createElement(_Links2.default.Intrinio, null)
          )
        ),
        _react2.default.createElement(
          'div',
          { style: ST.NOTE },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'span',
              { style: _About2.default.BLACK },
              'Note:\xA0'
            ),
            'User API key from data provider required for request.\xA0',
            _react2.default.createElement('br', { className: CL.BR }),
            'Can be set in ',
            _react2.default.createElement(
              'span',
              { style: ST.SETTINGS },
              'SETTINGS\xA0[s]'
            ),
            '.'
          )
        ),
        _react2.default.createElement(
          'div',
          { style: ST.NOTE },
          _react2.default.createElement(
            'p',
            { style: ST.MAX_WIDTH },
            _react2.default.createElement(
              'span',
              { style: _About2.default.BLACK },
              'Note:\xA0'
            ),
            'This product uses the Bureau of Economic Analysis (BEA) Data API but is not endorsed or certified by BEA.'
          )
        )
      ),
      _react2.default.createElement(
        _OpenClose2.default,
        {
          caption: '(4) Required Https Proxy:',
          rootStyle: ST.OPEN_CLOSE,
          childStyle: ST.CHILD_STYLE,
          isClose: true,
          openColor: OPEN_COLOR_L2
        },
        _react2.default.createElement(
          'p',
          { style: ST.P4 },
          _react2.default.createElement(
            'span',
            { style: _About2.default.PROVIDER },
            _react2.default.createElement(_Links2.default.FaoStat, null)
          ),
          _react2.default.createElement(
            'span',
            { style: _About2.default.PROVIDER },
            _react2.default.createElement(_Links2.default.Insee, null)
          ),
          _react2.default.createElement(
            'span',
            { style: _About2.default.PROVIDER },
            _react2.default.createElement(_Links2.default.Bsl, null)
          ),
          _react2.default.createElement(
            'span',
            { style: _About2.default.PROVIDER },
            _react2.default.createElement(_Links2.default.CryptoCompare, null),
            _react2.default.createElement(
              'span',
              { style: _About2.default.BLACK },
              '\xA0(Coin Inform.)'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { style: ST.NOTE },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'span',
              { style: _About2.default.BLACK },
              'Note:\xA0'
            ),
            'Https Proxy is required for CORS Http API services.\xA0',
            _react2.default.createElement('br', { className: CL.BR }),
            'By default set. Can be changed in ',
            _react2.default.createElement(
              'span',
              { style: ST.SETTINGS },
              'SETTINGS\xA0[s]'
            ),
            '.'
          )
        )
      )
    )
  );
};

exports.default = DataProviders;
//# sourceMappingURL=DataProviders.js.map