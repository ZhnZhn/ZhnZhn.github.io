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
  items: [{ title: 'Toronto', onClick: fnClick(_DialogType.QuandlYahoo.TORONTO) }, { title: 'Toronto Ventures', onClick: fnClick(_DialogType.QuandlYahoo.TORONTO_VENTURE) }, { title: 'Montreal', onClick: fnClick(_DialogType.QuandlYahoo.MONTREAL) }, { title: 'Indices', onClick: fnClick(_DialogType.QuandlYahoo.INDICE) }]
}, {
  caption: 'European Stocks',
  items: [{ title: 'London', onClick: fnClick(_DialogType.QuandlYahoo.LONDON) }, { title: 'Paris', onClick: fnClick(_DialogType.QuandlYahoo.PARIS) }, { title: 'Amsterdam', onClick: fnClick(_DialogType.QuandlYahoo.AMSTERDAM) }, { title: 'Coppenhagen', onClick: fnClick(_DialogType.QuandlYahoo.COPPENHAGEN) }, { title: 'Oslo', onClick: fnClick(_DialogType.QuandlYahoo.OSLO) }, { title: 'Stockholm', onClick: fnClick(_DialogType.QuandlYahoo.STOCKHOLM) }, { title: 'Swiss', onClick: fnClick(_DialogType.QuandlYahoo.SWISS) }, { title: 'Milan', onClick: fnClick(_DialogType.QuandlYahoo.MILAN) }, { title: 'Madrid', onClick: fnClick(_DialogType.QuandlYahoo.MADRID) }]
}, {
  caption: 'World Stocks',
  items: [{ title: 'Australian', onClick: fnClick(_DialogType.QuandlYahoo.AUSTRALIAN) }, { title: 'Shanghai', onClick: fnClick(_DialogType.QuandlYahoo.SHANGHAI) }, { title: 'Shenzhen', onClick: fnClick(_DialogType.QuandlYahoo.SHENZHEN) }, { title: 'Taiwan', onClick: fnClick(_DialogType.QuandlYahoo.TAIWAN) }, { title: 'Hong Kong', onClick: fnClick(_DialogType.QuandlYahoo.HONG_KONG) }, { title: 'Singapure', onClick: fnClick(_DialogType.QuandlYahoo.SINGAPURE) }, { title: 'Bombey', onClick: fnClick(_DialogType.QuandlYahoo.BOMBEY) }]
}];

exports.default = DataBrowser;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\yahoo-browser\DataBrowser.js.map