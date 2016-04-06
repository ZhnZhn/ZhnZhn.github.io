'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DialogType = require('../../constants/DialogType');

var _ComponentActions = require('../../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnClick = function fnClick(dialogType) {
  return _ComponentActions2.default.showDialog.bind(null, dialogType);
};

var DataBrowser = [{
  caption: 'Economic',
  items: [{ title: 'Currency Histories', onClick: fnClick(_DialogType.Quandl.CURRENCY_HISTORY) }, { title: 'Commodity Prices', onClick: fnClick(_DialogType.Quandl.COMMODITY_PRICE) }, { title: 'Economic Metrics', onClick: fnClick(_DialogType.Quandl.WORLDBANK_PRICE) }]
}, {
  caption: 'World Stocks',
  items: [{ title: 'Tokio', onClick: fnClick(_DialogType.Quandl.TOKIO_STOCK) }, { title: 'WIKI', onClick: fnClick(_DialogType.Quandl.WIKI_STOCK) }]
}, {
  caption: 'Futures',
  items: [{ title: 'China DCE', onClick: fnClick(_DialogType.Quandl.CHINA_DCE_FUTURE) }, { title: 'China ZCE', onClick: fnClick(_DialogType.Quandl.CHINA_DCE_FUTURE) }]
}];

exports.default = DataBrowser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\quandl-browser\DataBrowser.js.map