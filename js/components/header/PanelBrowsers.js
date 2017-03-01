'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PanelBrowsers = function PanelBrowsers(props) {
  var className = props.className,
      isShow = props.isShow,
      BROWSER = props.BROWSER,
      browserConfig = props.browserConfig,
      onClickQuandl = props.onClickQuandl,
      onClickDynamic = props.onClickDynamic,
      onClickWatch = props.onClickWatch;


  return _react2.default.createElement(
    _ShowHide2.default,
    {
      className: className,
      isShow: isShow
    },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        {
          className: 'row__topic__odd item__eurostat',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.EUROSTAT])
        },
        'Eurostat'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__topic__even item__quandl',
          onClick: onClickQuandl
        },
        'Quandl Economic'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__topic__odd item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.FRANCE_STATISTICS])
        },
        'France Statistics'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__topic__even item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.YAHOO])
        },
        'Yahoo Finance Stocks'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__topic__odd item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.GOOGLE])
        },
        'Google Finance Stocks'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__topic__even item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.US_STOCKS])
        },
        'Stocks By Sectors'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__topic__odd item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.NYSE_STOCKS])
        },
        'US NYSE by Sectors'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__topic__even item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.NASDAQ_STOCKS])
        },
        'US NASDAQ by Sectors'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__topic__odd item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.LONDON_STOCKS])
        },
        'LSE by Sectors'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__topic__even item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.PREMIUM_SAMPLE])
        },
        'Quandl Premium Sample'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__topic__odd item__watch',
          onClick: onClickWatch
        },
        'Watch'
      )
    )
  );
};

exports.default = PanelBrowsers;
//# sourceMappingURL=PanelBrowsers.js.map