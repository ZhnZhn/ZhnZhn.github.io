'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalPane = require('../zhn-moleculs/ModalPane');

var _ModalPane2 = _interopRequireDefault(_ModalPane);

var _ShowHide = require('../zhn/ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var S = {
  SHOW_HIDE: {
    padding: '0px'
  }
};

var PanelBrowsers = function PanelBrowsers(_ref) {
  var className = _ref.className,
      isShow = _ref.isShow,
      BROWSER = _ref.BROWSER,
      browserConfig = _ref.browserConfig,
      onClose = _ref.onClose,
      onClickQuandl = _ref.onClickQuandl,
      onClickDynamic = _ref.onClickDynamic,
      onClickWatch = _ref.onClickWatch;
  return _react2.default.createElement(
    _ModalPane2.default,
    {
      isShow: isShow,
      onClose: onClose
    },
    _react2.default.createElement(
      _ShowHide2.default,
      {
        className: className,
        style: S.SHOW_HIDE,
        isShow: isShow
      },
      _react2.default.createElement(
        'div',
        {
          className: 'row__pane-topic item__browser',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.STOCK_MARKETS])
        },
        'Stock Markets'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__pane-topic item__eurostat',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.EUROSTAT])
        },
        'Eurostat'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__pane-topic item__quandl',
          onClick: onClickQuandl
        },
        'Quandl Economic'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__pane-topic item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.FRANCE_STATISTICS])
        },
        'France Statistics'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__pane-topic item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.US_STOCKS])
        },
        'US Stocks By Sectors'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__pane-topic item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.NYSE_STOCKS])
        },
        'US NYSE by Sectors'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__pane-topic item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.NASDAQ_STOCKS])
        },
        'US NASDAQ by Sectors'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__pane-topic item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.LONDON_STOCKS])
        },
        'LSE by Sectors'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__pane-topic item__quandl',
          onClick: onClickDynamic.bind(null, browserConfig[BROWSER.PREMIUM_SAMPLE])
        },
        'Quandl Premium Sample'
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'row__pane-topic item__watch',
          onClick: onClickWatch
        },
        'Watch'
      )
    )
  );
};

exports.default = PanelBrowsers;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\PanelBrowsers.js.map