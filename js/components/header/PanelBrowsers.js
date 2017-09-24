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

var CL = {
  ROW: 'row__pane-topic',
  ITEM_DF: 'row__pane-topic item__quandl',
  ITEM_WATCH: 'row__pane-topic item__watch',
  ITEM_ABOUT: 'row__pane-topic item__about'
};
var S = {
  SHOW_HIDE: {
    padding: '0px'
  }
};
var _model = [{
  id: 'STOCK_MARKETS',
  cn: 'item__browser',
  title: 'Stock Markets'
}, {
  id: 'UN_COMTRADE',
  cn: 'item__eurostat',
  title: 'UN Comtrade'
}, {
  id: 'EUROSTAT',
  cn: 'item__eurostat',
  title: 'Eurostat'
}, {
  id: 'FRANCE_STATISTICS',
  cn: 'item__eurostat',
  title: 'Insee: France Statistics'
}, {
  id: 'QUANDL',
  isQuandl: true,
  title: 'Quandl Economic'
}, {
  id: 'US_STOCKS',
  title: 'US Stocks by Sectors'
}, {
  id: 'NYSE_STOCKS',
  title: 'US NYSE by Sectors'
}, {
  id: 'NASDAQ_STOCKS',
  title: 'US NASDAQ by Sectors'
}, {
  id: 'LONDON_STOCKS',
  title: 'LSE by Sectors'
}, {
  id: 'PREMIUM_SAMPLE',
  title: 'Quandl Premium Sample'
}];

var _renderItems = function _renderItems(_ref) {
  var model = _ref.model,
      browserConfig = _ref.browserConfig,
      BROWSER = _ref.BROWSER,
      onClickDynamic = _ref.onClickDynamic,
      onClickQuandl = _ref.onClickQuandl;

  return model.map(function (item) {
    var cn = item.cn,
        id = item.id,
        title = item.title,
        isQuandl = item.isQuandl,
        _className = cn ? CL.ROW + ' ' + cn : CL.ITEM_DF,
        _onClick = isQuandl ? onClickQuandl : onClickDynamic.bind(null, browserConfig[BROWSER[id]]);

    return _react2.default.createElement(
      'div',
      {
        className: _className,
        onClick: _onClick
      },
      title
    );
  });
};

var PanelBrowsers = function PanelBrowsers(_ref2) {
  var className = _ref2.className,
      isShow = _ref2.isShow,
      BROWSER = _ref2.BROWSER,
      browserConfig = _ref2.browserConfig,
      onClose = _ref2.onClose,
      onClickQuandl = _ref2.onClickQuandl,
      onClickDynamic = _ref2.onClickDynamic,
      onClickWatch = _ref2.onClickWatch,
      onClickAbout = _ref2.onClickAbout;
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
      _renderItems({
        model: _model, browserConfig: browserConfig, BROWSER: BROWSER,
        onClickDynamic: onClickDynamic, onClickQuandl: onClickQuandl
      }),
      _react2.default.createElement(
        'div',
        {
          className: CL.ITEM_WATCH,
          onClick: onClickWatch
        },
        'Watch'
      ),
      _react2.default.createElement(
        'div',
        {
          className: CL.ITEM_ABOUT,
          onClick: onClickAbout
        },
        'About'
      )
    )
  );
};

exports.default = PanelBrowsers;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\header\PanelBrowsers.js.map