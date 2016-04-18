
import YahooIndice from '../services/qy/YahooIndice';
import YahooToronto from '../services/qy/YahooToronto';
import YahooTorontoVenture from '../services/qy/YahooTorontoVenture';
import YahooMontreal from '../services/qy/YahooMontreal';

import YahooLondon from '../services/qy/YahooLondon';
import YahooParis from '../services/qy/YahooParis';
import YahooAmsterdam from '../services/qy/YahooAmsterdam';
import YahooCoppenhagen from '../services/qy/YahooCoppenhagen';
import YahooOslo from '../services/qy/YahooOslo';
import YahooStockholm from '../services/qy/YahooStockholm';
import YahooSwiss from '../services/qy/YahooSwiss';
import YahooMilan from '../services/qy/YahooMilan';
import YahooMadrid from '../services/qy/YahooMadrid';

import YahooAustralian from '../services/qy/YahooAustralian';
import YahooShanghai from '../services/qy/YahooShanghai';
import YahooShenzhen from '../services/qy/YahooShenzhen';
import YahooTaiwan from '../services/qy/YahooTaiwan';
import YahooHongKong from '../services/qy/YahooHongKong';
import YahooSingapure from '../services/qy/YahooSingapure';
import YahooBombey from '../services/qy/YahooBombey';

import DialogType3 from '../components/dialogs/DialogType3';

const DataQY = {
  QY_TORONTO : {
     type : 'QY_TORONTO',
     menuTitle: 'Toronto',
     dialogCaption : 'Toronto',
     chartContainerCaption : 'Quandl Yahoo Toronto',
     fnOption : YahooToronto.getTickets
  },
  QY_TORONTO_VENTURE : {
     type : 'QY_TORONTO_VENTURE',
     menuTitle : 'Toronto Ventures',
     dialogCaption : 'Toronto Ventures',
     chartContainerCaption : 'Quandl Yahoo Toronto Ventures',
     fnOption : YahooTorontoVenture.getTickets
  },
  QY_MONTREAL : {
     type : 'QY_MONTREAL',
     menuTitle : 'Montreal',
     dialogCaption : 'Montreal',
     chartContainerCaption : 'Quandl Yahoo Montreal',
     fnOption : YahooMontreal.getTickets
  },
  QY_INDICE : {
     type : 'QY_INDICE',
     menuTitle : 'Indices',
     dialogCaption : 'Indices',
     chartContainerCaption : 'Quandl Yahoo Indices',
     fnOption : YahooIndice.getTickets
  },

  QY_LONDON : {
     type : 'QY_LONDON',
     menuTitle : 'London',
     dialogCaption : 'London',
     chartContainerCaption : 'Quandl Yahoo London',
     fnOption : YahooLondon.getTickets
  },
  QY_PARIS : {
     type : 'QY_PARIS',
     menuTitle : 'Paris',
     dialogCaption : 'Paris',
     chartContainerCaption : 'Quandl Yahoo Paris',
     fnOption : YahooParis.getTickets
  },
  QY_AMSTERDAM : {
     type : 'QY_AMSTERDAM',
     menuTitle : 'Amsterdam',
     dialogCaption : 'Amsterdam',
     chartContainerCaption : 'Quandl Yahoo Amsterdam',
     fnOption : YahooAmsterdam.getTickets
  },
  QY_COPPENHAGEN : {
     type : 'QY_COPPENHAGEN',
     menuTitle : 'Coppenhagen',
     dialogCaption : 'Coppenhagen',
     chartContainerCaption : 'Quandl Yahoo Coppenhagen',
     fnOption : YahooCoppenhagen.getTickets
  },
  QY_OSLO : {
     type : 'QY_OSLO',
     menuTitle : 'Oslo',
     dialogCaption : 'Oslo',
     chartContainerCaption : 'Quandl Yahoo Oslo',
     fnOption : YahooOslo.getTickets
  },
  QY_STOCKHOLM : {
     type : 'QY_STOCKHOLM',
     menuTitle : 'Stockholm',
     dialogCaption : 'Stockholm',
     chartContainerCaption : 'Quandl Yahoo Stockholm',
     fnOption : YahooStockholm.getTickets
  },
  QY_SWISS : {
     type : 'QY_SWISS',
     menuTitle : 'Swiss',
     dialogCaption : 'Swiss',
     chartContainerCaption : 'Quandl Yahoo Swiss',
     fnOption : YahooSwiss.getTickets
  },
  QY_MILAN : {
     type : 'QY_MILAN',
     menuTitle : 'Milan',
     dialogCaption : 'Milan',
     chartContainerCaption : 'Quandl Yahoo Milan',
     fnOption : YahooMilan.getTickets
  },
  QY_MADRID : {
     type : 'QY_MADRID',
     menuTitle : 'Madrid',
     dialogCaption : 'Madrid',
     chartContainerCaption : 'Quandl Yahoo Madrid',
     fnOption : YahooMadrid.getTickets
  },

  QY_AUSTRALIAN : {
      type : 'QY_AUSTRALIAN',
      menuTitle : 'Australian',
      dialogCaption : 'Australian',
      chartContainerCaption : 'Quandl Yahoo Australian',
      fnOption : YahooAustralian.getTickets
   },
   QY_SHANGHAI : {
     type : 'QY_SHANGHAI',
     menuTitle : 'Shanghai',
     dialogCaption : 'Shanghai',
     chartContainerCaption : 'Quandl Yahoo Shanghai',
     fnOption : YahooShanghai.getTickets
   },
   QY_SHENZHEN : {
     type : 'QY_SHENZHEN',
     menuTitle : 'Shenzhen',
     dialogCaption : 'Shenzhen',
     chartContainerCaption : 'Quandl Yahoo Shenzhen',
     fnOption : YahooShenzhen.getTickets
   },
   QY_TAIWAN : {
     type : 'QY_TAIWAN',
     menuTitle : 'Taiwan',
     dialogCaption : 'Taiwan',
     chartContainerCaption : 'Quandl Yahoo Taiwan',
     fnOption : YahooTaiwan.getTickets
   },
   QY_HONG_KONG : {
     type : 'QY_HONG_KONG',
     menuTitle : 'Hong Kong',
     dialogCaption : 'Hong Kong',
     chartContainerCaption : 'Quandl Yahoo Hong Kong',
     fnOption : YahooHongKong.getTickets
   },
   QY_SINGAPURE : {
     type : 'QY_SINGAPURE',
     menuTitle : 'Singapure',
     dialogCaption : 'Singapure',
     chartContainerCaption : 'Quandl Yahoo Singapure',
     fnOption : YahooSingapure.getTickets
   },
   QY_BOMBEY : {
     type : 'QY_BOMBEY',
     menuTitle : 'Bombey',
     dialogCaption : 'Bombey',
     chartContainerCaption : 'Quandl Yahoo Bombey',
     fnOption : YahooBombey.getTickets
   },
};

export default DataQY
