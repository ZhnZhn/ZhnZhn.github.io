
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
     dialogCaption : 'Toronto',
     chartContainerCaption : 'Quandl Yahoo Toronto',
     fnOption : YahooToronto.getTickets
  },
  QY_TORONTO_VENTURE : {
     type : 'QY_TORONTO_VENTURE',
     dialogCaption : 'Toronto Ventures',
     chartContainerCaption : 'Quandl Yahoo Toronto Ventures',
     fnOption : YahooTorontoVenture.getTickets
  },
  QY_MONTREAL : {
     type : 'QY_MONTREAL',
     dialogCaption : 'Montreal',
     chartContainerCaption : 'Quandl Yahoo Montreal',
     fnOption : YahooMontreal.getTickets
  },
  QY_INDICE : {
     type : 'QY_INDICE',
     dialogCaption : 'Indices',
     chartContainerCaption : 'Quandl Yahoo Indices',
     fnOption : YahooIndice.getTickets
  },

  QY_LONDON : {
     type : 'QY_LONDON',
     dialogCaption : 'London',
     chartContainerCaption : 'Quandl Yahoo London',
     fnOption : YahooLondon.getTickets
  },
  QY_PARIS : {
     type : 'QY_PARIS',
     dialogCaption : 'Paris',
     chartContainerCaption : 'Quandl Yahoo Paris',
     fnOption : YahooParis.getTickets
  },
  QY_AMSTERDAM : {
     type : 'QY_AMSTERDAM',
     dialogCaption : 'Amsterdam',
     chartContainerCaption : 'Quandl Yahoo Amsterdam',
     fnOption : YahooAmsterdam.getTickets
  },
  QY_COPPENHAGEN : {
     type : 'QY_COPPENHAGEN',
     dialogCaption : 'Coppenhagen',
     chartContainerCaption : 'Quandl Yahoo Coppenhagen',
     fnOption : YahooCoppenhagen.getTickets
  },
  QY_OSLO : {
     type : 'QY_OSLO',
     dialogCaption : 'Oslo',
     chartContainerCaption : 'Quandl Yahoo Oslo',
     fnOption : YahooOslo.getTickets
  },
  QY_STOCKHOLM : {
     type : 'QY_STOCKHOLM',
     dialogCaption : 'Stockholm',
     chartContainerCaption : 'Quandl Yahoo Stockholm',
     fnOption : YahooStockholm.getTickets
  },
  QY_SWISS : {
     type : 'QY_SWISS',
     dialogCaption : 'Swiss',
     chartContainerCaption : 'Quandl Yahoo Swiss',
     fnOption : YahooSwiss.getTickets
  },
  QY_MILAN : {
     type : 'QY_MILAN',
     dialogCaption : 'Milan',
     chartContainerCaption : 'Quandl Yahoo Milan',
     fnOption : YahooMilan.getTickets
  },
  QY_MADRID : {
     type : 'QY_MADRID',
     dialogCaption : 'Madrid',
     chartContainerCaption : 'Quandl Yahoo Madrid',
     fnOption : YahooMadrid.getTickets
  },

  QY_AUSTRALIAN : {
      type : 'QY_AUSTRALIAN',
      dialogCaption : 'Australian',
      chartContainerCaption : 'Quandl Yahoo Australian',
      fnOption : YahooAustralian.getTickets
   },
   QY_SHANGHAI : {
     type : 'QY_SHANGHAI',
     dialogCaption : 'Shanghai',
     chartContainerCaption : 'Quandl Yahoo Shanghai',
     fnOption : YahooShanghai.getTickets
   },
   QY_SHENZHEN : {
     type : 'QY_SHENZHEN',
     dialogCaption : 'Shenzhen',
     chartContainerCaption : 'Quandl Yahoo Shenzhen',
     fnOption : YahooShenzhen.getTickets
   },
   QY_TAIWAN : {
     type : 'QY_TAIWAN',
     dialogCaption : 'Taiwan',
     chartContainerCaption : 'Quandl Yahoo Taiwan',
     fnOption : YahooTaiwan.getTickets
   },
   QY_HONG_KONG : {
     type : 'QY_HONG_KONG',
     dialogCaption : 'Hong Kong',
     chartContainerCaption : 'Quandl Yahoo Hong Kong',
     fnOption : YahooHongKong.getTickets
   },
   QY_SINGAPURE : {
     type : 'QY_SINGAPURE',
     dialogCaption : 'Singapure',
     chartContainerCaption : 'Quandl Yahoo Singapure',
     fnOption : YahooSingapure.getTickets
   },
   QY_BOMBEY : {
     type : 'QY_BOMBEY',
     dialogCaption : 'Bombey',
     chartContainerCaption : 'Quandl Yahoo Bombey',
     fnOption : YahooBombey.getTickets
   },
};

export default DataQY
