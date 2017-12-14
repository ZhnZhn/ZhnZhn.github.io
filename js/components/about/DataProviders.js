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

var ST = {
  P4: {
    paddingTop: '4px'
  }
};

var DataProviders = function DataProviders(_ref) {
  var isClose = _ref.isClose;
  return _react2.default.createElement(
    _OpenClose2.default,
    {
      isClose: isClose,
      caption: 'Data Providers:',
      rootStyle: (0, _extends3.default)({}, _About2.default.LINE_HEIGHT, _About2.default.P_BOTTOM)
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
          _react2.default.createElement(_Links2.default.Eurostat, null),
          _react2.default.createElement(
            'span',
            { style: _About2.default.BLACK },
            '\xA0'
          )
        ),
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.UnComtrade, null),
          _react2.default.createElement(
            'span',
            { style: _About2.default.BLUE },
            ';'
          )
        )
      ),
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
            '\xA0'
          )
        ),
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.Barchart, null),
          _react2.default.createElement(
            'span',
            { style: _About2.default.BLACK },
            '\xA0'
          )
        ),
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.AlphaVantage, null),
          _react2.default.createElement(
            'span',
            { style: _About2.default.BLACK },
            '\xA0:\xA0(API Key);'
          )
        )
      ),
      _react2.default.createElement(
        'p',
        { style: ST.P4 },
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.FaoStat, null),
          _react2.default.createElement(
            'span',
            null,
            '\xA0'
          )
        ),
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.Insee, null),
          _react2.default.createElement(
            'span',
            null,
            '\xA0'
          )
        ),
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.StatNorway, null),
          _react2.default.createElement(
            'span',
            null,
            '\xA0'
          )
        ),
        _react2.default.createElement(
          'span',
          { style: _About2.default.PROVIDER },
          _react2.default.createElement(_Links2.default.StatSweden, null),
          _react2.default.createElement(
            'span',
            { style: _About2.default.BLACK },
            '\xA0:\xA0(Https Proxy for CORS);'
          )
        )
      )
    )
  );
};

exports.default = DataProviders;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\about\DataProviders.js.map