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
  caption: 'North American Stocks',
  items: [{ title: 'NASDAQ', onClick: fnClick(_DialogType.QuandlGoogle.NASDAQ) }, { title: 'NYSE', onClick: fnClick(_DialogType.QuandlGoogle.NYSE) }, { title: 'NYSE AMEX', onClick: fnClick(_DialogType.QuandlGoogle.AMEX) }, { title: 'NYSE ARCA', onClick: fnClick(_DialogType.QuandlGoogle.ARCA) }]
}, {
  caption: 'European Stocks',
  items: [{ title: 'Euronext Brussels', onClick: fnClick(_DialogType.QuandlGoogle.BRUSSELS) }, { title: 'Euronext Lisbon', onClick: fnClick(_DialogType.QuandlGoogle.LISBON) }, { title: 'Tallin', onClick: fnClick(_DialogType.QuandlGoogle.TALLIN) }, { title: 'Riga', onClick: fnClick(_DialogType.QuandlGoogle.RIGA) }, { title: 'Vilnius', onClick: fnClick(_DialogType.QuandlGoogle.VILNIUS) }]
}, {
  caption: 'World Stocks',
  items: [{ title: 'Shenzhen', onClick: fnClick(_DialogType.QuandlGoogle.SHENZHEN) }, { title: 'Singapure', onClick: fnClick(_DialogType.QuandlGoogle.SINGAPURE) }, { title: 'Korea', onClick: fnClick(_DialogType.QuandlGoogle.KOREA) }, { title: 'New Zealand', onClick: fnClick(_DialogType.QuandlGoogle.NEWZEALAND) }, { title: 'Sao Paolo', onClick: fnClick(_DialogType.QuandlGoogle.SAO_PAOLO) }]
}];

exports.default = DataBrowser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\google-browser\DataBrowser.js.map