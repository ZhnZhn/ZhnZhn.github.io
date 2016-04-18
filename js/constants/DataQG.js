'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _GoogleNasdaq = require('../services/qg/GoogleNasdaq');

var _GoogleNasdaq2 = _interopRequireDefault(_GoogleNasdaq);

var _GoogleNyse = require('../services/qg/GoogleNyse');

var _GoogleNyse2 = _interopRequireDefault(_GoogleNyse);

var _GoogleNyseAmex = require('../services/qg/GoogleNyseAmex');

var _GoogleNyseAmex2 = _interopRequireDefault(_GoogleNyseAmex);

var _GoogleNyseArca = require('../services/qg/GoogleNyseArca');

var _GoogleNyseArca2 = _interopRequireDefault(_GoogleNyseArca);

var _GoogleBrussels = require('../services/qg/GoogleBrussels');

var _GoogleBrussels2 = _interopRequireDefault(_GoogleBrussels);

var _GoogleLisbon = require('../services/qg/GoogleLisbon');

var _GoogleLisbon2 = _interopRequireDefault(_GoogleLisbon);

var _GoogleTallin = require('../services/qg/GoogleTallin');

var _GoogleTallin2 = _interopRequireDefault(_GoogleTallin);

var _GoogleRiga = require('../services/qg/GoogleRiga');

var _GoogleRiga2 = _interopRequireDefault(_GoogleRiga);

var _GoogleVilnius = require('../services/qg/GoogleVilnius');

var _GoogleVilnius2 = _interopRequireDefault(_GoogleVilnius);

var _GoogleShenzhen = require('../services/qg/GoogleShenzhen');

var _GoogleShenzhen2 = _interopRequireDefault(_GoogleShenzhen);

var _GoogleSingapure = require('../services/qg/GoogleSingapure');

var _GoogleSingapure2 = _interopRequireDefault(_GoogleSingapure);

var _GoogleKorea = require('../services/qg/GoogleKorea');

var _GoogleKorea2 = _interopRequireDefault(_GoogleKorea);

var _GoogleNewZealand = require('../services/qg/GoogleNewZealand');

var _GoogleNewZealand2 = _interopRequireDefault(_GoogleNewZealand);

var _GoogleSaoPaolo = require('../services/qg/GoogleSaoPaolo');

var _GoogleSaoPaolo2 = _interopRequireDefault(_GoogleSaoPaolo);

var _DialogType = require('../components/dialogs/DialogType3');

var _DialogType2 = _interopRequireDefault(_DialogType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataQG = {
   QG_NASDAQ: {
      type: 'QG_NASDAQ',
      menuTitle: 'NASDAQ',
      dialogCaption: 'NASDAQ',
      chartContainerCaption: 'Quandl Google NASDAQ',
      fnOption: _GoogleNasdaq2.default.getTickets
   },
   QG_NYSE: {
      type: 'QG_NYSE',
      menuTitle: 'NYSE',
      dialogCaption: 'NYSE',
      chartContainerCaption: 'Quandl Google NYSE',
      fnOption: _GoogleNyse2.default.getTickets
   },
   QG_AMEX: {
      type: 'QG_AMEX',
      menuTitle: 'NYSE AMEX',
      dialogCaption: 'AMEX',
      chartContainerCaption: 'Quandl Google AMEX',
      fnOption: _GoogleNyseAmex2.default.getTickets
   },
   QG_ARCA: {
      type: 'QG_ARCA',
      menuTitle: 'NYSE ARCA',
      dialogCaption: 'ARCA',
      chartContainerCaption: 'Quandl Google ARCA',
      fnOption: _GoogleNyseArca2.default.getTickets
   },

   QG_BRUSSELS: {
      type: 'QG_BRUSSELS',
      menuTitle: 'Euronext Brussels',
      dialogCaption: 'Euronext Brussels',
      chartContainerCaption: 'Quandl Google Euronext Brussels',
      fnOption: _GoogleBrussels2.default.getTickets
   },
   QG_LISBON: {
      type: 'QG_LISBON',
      menuTitle: 'Euronext Lisbon',
      dialogCaption: 'Euronext Lisbon',
      chartContainerCaption: 'Quandl Google Euronext Lisbon',
      fnOption: _GoogleLisbon2.default.getTickets
   },
   QG_TALLIN: {
      type: 'QG_TALLIN',
      menuTitle: 'Tallin',
      dialogCaption: 'Tallin',
      chartContainerCaption: 'Quandl Google Tallin',
      fnOption: _GoogleTallin2.default.getTickets
   },
   QG_RIGA: {
      type: 'QG_RIGA',
      menuTitle: 'Riga',
      dialogCaption: 'Riga',
      chartContainerCaption: 'Quandl Google Riga',
      fnOption: _GoogleRiga2.default.getTickets
   },
   QG_VILNIUS: {
      type: 'QG_VILNIUS',
      menuTitle: 'Vilnius',
      dialogCaption: 'Vilnius',
      chartContainerCaption: 'Quandl Google Vilnius',
      fnOption: _GoogleVilnius2.default.getTickets
   },

   QG_SHENZHEN: {
      type: 'QG_SHENZHEN',
      menuTitle: 'Shenzhen',
      dialogCaption: 'Shenzhen',
      chartContainerCaption: 'Quandl Google Shenzhen',
      fnOption: _GoogleShenzhen2.default.getTickets
   },
   QG_SINGAPURE: {
      type: 'QG_SINGAPURE',
      menuTitle: 'Singapure',
      dialogCaption: 'Singapure',
      chartContainerCaption: 'Quandl Google Singapure',
      fnOption: _GoogleSingapure2.default.getTickets
   },
   QG_KOREA: {
      type: 'QG_KOREA',
      menuTitle: 'Korea',
      dialogCaption: 'Korea',
      chartContainerCaption: 'Quandl Google Korea',
      fnOption: _GoogleKorea2.default.getTickets
   },
   QG_NEWZEALAND: {
      type: 'QG_NEWZEALAND',
      menuTitle: 'New Zealand',
      dialogCaption: 'New Zealand',
      chartContainerCaption: 'Quandl Google New Zealand',
      fnOption: _GoogleNewZealand2.default.getTickets
   },
   QG_SAO_PAOLO: {
      type: 'QG_SAO_PAOLO',
      menuTitle: 'Sao Paolo',
      dialogCaption: 'Sao Paolo',
      chartContainerCaption: 'Quandl Google Sao Paolo',
      fnOption: _GoogleSaoPaolo2.default.getTickets
   }
};

exports.default = DataQG;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\DataQG.js.map