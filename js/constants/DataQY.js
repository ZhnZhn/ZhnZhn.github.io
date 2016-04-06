'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _YahooIndice = require('../services/qy/YahooIndice');

var _YahooIndice2 = _interopRequireDefault(_YahooIndice);

var _YahooToronto = require('../services/qy/YahooToronto');

var _YahooToronto2 = _interopRequireDefault(_YahooToronto);

var _YahooTorontoVenture = require('../services/qy/YahooTorontoVenture');

var _YahooTorontoVenture2 = _interopRequireDefault(_YahooTorontoVenture);

var _YahooMontreal = require('../services/qy/YahooMontreal');

var _YahooMontreal2 = _interopRequireDefault(_YahooMontreal);

var _YahooLondon = require('../services/qy/YahooLondon');

var _YahooLondon2 = _interopRequireDefault(_YahooLondon);

var _YahooParis = require('../services/qy/YahooParis');

var _YahooParis2 = _interopRequireDefault(_YahooParis);

var _YahooAmsterdam = require('../services/qy/YahooAmsterdam');

var _YahooAmsterdam2 = _interopRequireDefault(_YahooAmsterdam);

var _YahooCoppenhagen = require('../services/qy/YahooCoppenhagen');

var _YahooCoppenhagen2 = _interopRequireDefault(_YahooCoppenhagen);

var _YahooOslo = require('../services/qy/YahooOslo');

var _YahooOslo2 = _interopRequireDefault(_YahooOslo);

var _YahooStockholm = require('../services/qy/YahooStockholm');

var _YahooStockholm2 = _interopRequireDefault(_YahooStockholm);

var _YahooSwiss = require('../services/qy/YahooSwiss');

var _YahooSwiss2 = _interopRequireDefault(_YahooSwiss);

var _YahooMilan = require('../services/qy/YahooMilan');

var _YahooMilan2 = _interopRequireDefault(_YahooMilan);

var _YahooMadrid = require('../services/qy/YahooMadrid');

var _YahooMadrid2 = _interopRequireDefault(_YahooMadrid);

var _YahooAustralian = require('../services/qy/YahooAustralian');

var _YahooAustralian2 = _interopRequireDefault(_YahooAustralian);

var _YahooShanghai = require('../services/qy/YahooShanghai');

var _YahooShanghai2 = _interopRequireDefault(_YahooShanghai);

var _YahooShenzhen = require('../services/qy/YahooShenzhen');

var _YahooShenzhen2 = _interopRequireDefault(_YahooShenzhen);

var _YahooTaiwan = require('../services/qy/YahooTaiwan');

var _YahooTaiwan2 = _interopRequireDefault(_YahooTaiwan);

var _YahooHongKong = require('../services/qy/YahooHongKong');

var _YahooHongKong2 = _interopRequireDefault(_YahooHongKong);

var _YahooSingapure = require('../services/qy/YahooSingapure');

var _YahooSingapure2 = _interopRequireDefault(_YahooSingapure);

var _YahooBombey = require('../services/qy/YahooBombey');

var _YahooBombey2 = _interopRequireDefault(_YahooBombey);

var _DialogType = require('../components/dialogs/DialogType3');

var _DialogType2 = _interopRequireDefault(_DialogType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataQY = {
   QY_TORONTO: {
      type: 'QY_TORONTO',
      dialogCaption: 'Toronto',
      chartContainerCaption: 'Quandl Yahoo Toronto',
      fnOption: _YahooToronto2.default.getTickets
   },
   QY_TORONTO_VENTURE: {
      type: 'QY_TORONTO_VENTURE',
      dialogCaption: 'Toronto Ventures',
      chartContainerCaption: 'Quandl Yahoo Toronto Ventures',
      fnOption: _YahooTorontoVenture2.default.getTickets
   },
   QY_MONTREAL: {
      type: 'QY_MONTREAL',
      dialogCaption: 'Montreal',
      chartContainerCaption: 'Quandl Yahoo Montreal',
      fnOption: _YahooMontreal2.default.getTickets
   },
   QY_INDICE: {
      type: 'QY_INDICE',
      dialogCaption: 'Indices',
      chartContainerCaption: 'Quandl Yahoo Indices',
      fnOption: _YahooIndice2.default.getTickets
   },

   QY_LONDON: {
      type: 'QY_LONDON',
      dialogCaption: 'London',
      chartContainerCaption: 'Quandl Yahoo London',
      fnOption: _YahooLondon2.default.getTickets
   },
   QY_PARIS: {
      type: 'QY_PARIS',
      dialogCaption: 'Paris',
      chartContainerCaption: 'Quandl Yahoo Paris',
      fnOption: _YahooParis2.default.getTickets
   },
   QY_AMSTERDAM: {
      type: 'QY_AMSTERDAM',
      dialogCaption: 'Amsterdam',
      chartContainerCaption: 'Quandl Yahoo Amsterdam',
      fnOption: _YahooAmsterdam2.default.getTickets
   },
   QY_COPPENHAGEN: {
      type: 'QY_COPPENHAGEN',
      dialogCaption: 'Coppenhagen',
      chartContainerCaption: 'Quandl Yahoo Coppenhagen',
      fnOption: _YahooCoppenhagen2.default.getTickets
   },
   QY_OSLO: {
      type: 'QY_OSLO',
      dialogCaption: 'Oslo',
      chartContainerCaption: 'Quandl Yahoo Oslo',
      fnOption: _YahooOslo2.default.getTickets
   },
   QY_STOCKHOLM: {
      type: 'QY_STOCKHOLM',
      dialogCaption: 'Stockholm',
      chartContainerCaption: 'Quandl Yahoo Stockholm',
      fnOption: _YahooStockholm2.default.getTickets
   },
   QY_SWISS: {
      type: 'QY_SWISS',
      dialogCaption: 'Swiss',
      chartContainerCaption: 'Quandl Yahoo Swiss',
      fnOption: _YahooSwiss2.default.getTickets
   },
   QY_MILAN: {
      type: 'QY_MILAN',
      dialogCaption: 'Milan',
      chartContainerCaption: 'Quandl Yahoo Milan',
      fnOption: _YahooMilan2.default.getTickets
   },
   QY_MADRID: {
      type: 'QY_MADRID',
      dialogCaption: 'Madrid',
      chartContainerCaption: 'Quandl Yahoo Madrid',
      fnOption: _YahooMadrid2.default.getTickets
   },

   QY_AUSTRALIAN: {
      type: 'QY_AUSTRALIAN',
      dialogCaption: 'Australian',
      chartContainerCaption: 'Quandl Yahoo Australian',
      fnOption: _YahooAustralian2.default.getTickets
   },
   QY_SHANGHAI: {
      type: 'QY_SHANGHAI',
      dialogCaption: 'Shanghai',
      chartContainerCaption: 'Quandl Yahoo Shanghai',
      fnOption: _YahooShanghai2.default.getTickets
   },
   QY_SHENZHEN: {
      type: 'QY_SHENZHEN',
      dialogCaption: 'Shenzhen',
      chartContainerCaption: 'Quandl Yahoo Shenzhen',
      fnOption: _YahooShenzhen2.default.getTickets
   },
   QY_TAIWAN: {
      type: 'QY_TAIWAN',
      dialogCaption: 'Taiwan',
      chartContainerCaption: 'Quandl Yahoo Taiwan',
      fnOption: _YahooTaiwan2.default.getTickets
   },
   QY_HONG_KONG: {
      type: 'QY_HONG_KONG',
      dialogCaption: 'Hong Kong',
      chartContainerCaption: 'Quandl Yahoo Hong Kong',
      fnOption: _YahooHongKong2.default.getTickets
   },
   QY_SINGAPURE: {
      type: 'QY_SINGAPURE',
      dialogCaption: 'Singapure',
      chartContainerCaption: 'Quandl Yahoo Singapure',
      fnOption: _YahooSingapure2.default.getTickets
   },
   QY_BOMBEY: {
      type: 'QY_BOMBEY',
      dialogCaption: 'Bombey',
      chartContainerCaption: 'Quandl Yahoo Bombey',
      fnOption: _YahooBombey2.default.getTickets
   }
};

exports.default = DataQY;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\DataQY.js.map