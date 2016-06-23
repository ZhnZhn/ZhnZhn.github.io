'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _DialogType = require('../components/dialogs/DialogType3');

var _DialogType2 = _interopRequireDefault(_DialogType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataQY = {
   QY_TORONTO: {
      type: 'QY_TORONTO',
      menuTitle: 'Toronto',
      dialogCaption: 'Toronto',
      chartContainerCaption: 'Quandl Yahoo Toronto',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/toronto.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_TORONTO_VENTURE: {
      type: 'QY_TORONTO_VENTURE',
      menuTitle: 'Toronto Ventures',
      dialogCaption: 'Toronto Ventures',
      chartContainerCaption: 'Quandl Yahoo Toronto Ventures',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/toronto-ventures.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_MONTREAL: {
      type: 'QY_MONTREAL',
      menuTitle: 'Montreal',
      dialogCaption: 'Montreal',
      chartContainerCaption: 'Quandl Yahoo Montreal',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/montreal.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_INDICE: {
      type: 'QY_INDICE',
      menuTitle: 'Indices',
      dialogCaption: 'Indices',
      chartContainerCaption: 'Quandl Yahoo Indices',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/indices.json',
         optionsJsonProp: 'indices',
         dataColumn: 4
      }
   },

   QY_LONDON: {
      type: 'QY_LONDON',
      menuTitle: 'London',
      dialogCaption: 'London',
      chartContainerCaption: 'Quandl Yahoo London',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/london.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_PARIS: {
      type: 'QY_PARIS',
      menuTitle: 'Paris',
      dialogCaption: 'Paris',
      chartContainerCaption: 'Quandl Yahoo Paris',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/paris.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_AMSTERDAM: {
      type: 'QY_AMSTERDAM',
      menuTitle: 'Amsterdam',
      dialogCaption: 'Amsterdam',
      chartContainerCaption: 'Quandl Yahoo Amsterdam',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/amsterdam.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_COPPENHAGEN: {
      type: 'QY_COPPENHAGEN',
      menuTitle: 'Coppenhagen',
      dialogCaption: 'Coppenhagen',
      chartContainerCaption: 'Quandl Yahoo Coppenhagen',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/coppenhagen.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_OSLO: {
      type: 'QY_OSLO',
      menuTitle: 'Oslo',
      dialogCaption: 'Oslo',
      chartContainerCaption: 'Quandl Yahoo Oslo',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/oslo.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_STOCKHOLM: {
      type: 'QY_STOCKHOLM',
      menuTitle: 'Stockholm',
      dialogCaption: 'Stockholm',
      chartContainerCaption: 'Quandl Yahoo Stockholm',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/stockholm.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_SWISS: {
      type: 'QY_SWISS',
      menuTitle: 'Swiss',
      dialogCaption: 'Swiss',
      chartContainerCaption: 'Quandl Yahoo Swiss',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/swiss.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_MILAN: {
      type: 'QY_MILAN',
      menuTitle: 'Milan',
      dialogCaption: 'Milan',
      chartContainerCaption: 'Quandl Yahoo Milan',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/milan.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_MADRID: {
      type: 'QY_MADRID',
      menuTitle: 'Madrid',
      dialogCaption: 'Madrid',
      chartContainerCaption: 'Quandl Yahoo Madrid',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/madrid.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },

   QY_AUSTRALIAN: {
      type: 'QY_AUSTRALIAN',
      menuTitle: 'Australian',
      dialogCaption: 'Australian',
      chartContainerCaption: 'Quandl Yahoo Australian',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/australian.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_SHANGHAI: {
      type: 'QY_SHANGHAI',
      menuTitle: 'Shanghai',
      dialogCaption: 'Shanghai',
      chartContainerCaption: 'Quandl Yahoo Shanghai',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/shanghai.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_SHENZHEN: {
      type: 'QY_SHENZHEN',
      menuTitle: 'Shenzhen',
      dialogCaption: 'Shenzhen',
      chartContainerCaption: 'Quandl Yahoo Shenzhen',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/shenzhen.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_TAIWAN: {
      type: 'QY_TAIWAN',
      menuTitle: 'Taiwan',
      dialogCaption: 'Taiwan',
      chartContainerCaption: 'Quandl Yahoo Taiwan',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/taiwan.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_HONG_KONG: {
      type: 'QY_HONG_KONG',
      menuTitle: 'Hong Kong',
      dialogCaption: 'Hong Kong',
      chartContainerCaption: 'Quandl Yahoo Hong Kong',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/hongkong.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_SINGAPURE: {
      type: 'QY_SINGAPURE',
      menuTitle: 'Singapure',
      dialogCaption: 'Singapure',
      chartContainerCaption: 'Quandl Yahoo Singapure',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/singapure.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   },
   QY_BOMBEY: {
      type: 'QY_BOMBEY',
      menuTitle: 'Bombey',
      dialogCaption: 'Bombey',
      chartContainerCaption: 'Quandl Yahoo Bombey',
      dialogProps: {
         descrUrl: './data/yahoo/yahoo.html',
         optionURI: './data/yahoo/bombey.json',
         optionsJsonProp: 'tickets',
         dataColumn: 4
      }
   }
};

exports.default = DataQY;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\DataQY.js.map