
import GoogleNasdaq from '../services/qg/GoogleNasdaq';
import GoogleNyse from '../services/qg/GoogleNyse';
import GoogleNyseAmex from '../services/qg/GoogleNyseAmex';
import GoogleNyseArca from '../services/qg/GoogleNyseArca';
import GoogleBrussels from '../services/qg/GoogleBrussels';
import GoogleLisbon from '../services/qg/GoogleLisbon';
import GoogleTallin from '../services/qg/GoogleTallin';
import GoogleRiga from '../services/qg/GoogleRiga';
import GoogleVilnius from '../services/qg/GoogleVilnius';
import GoogleShenzhen from '../services/qg/GoogleShenzhen';
import GoogleSingapure from '../services/qg/GoogleSingapure';
import GoogleKorea from '../services/qg/GoogleKorea';
import GoogleNewZealand from '../services/qg/GoogleNewZealand';
import GoogleSaoPaolo from '../services/qg/GoogleSaoPaolo';

import DialogType3 from '../components/dialogs/DialogType3';


const DataQG = {
  QG_NASDAQ : {
     type : 'QG_NASDAQ',
     dialogCaption : 'NASDAQ',
     chartContainerCaption : 'Quandl Google NASDAQ',
     fnOption : GoogleNasdaq.getTickets
  },
  QG_NYSE : {
     type : 'QG_NYSE',
     dialogCaption : 'NYSE',
     chartContainerCaption : 'Quandl Google NYSE',
     fnOption : GoogleNyse.getTickets
  },
  QG_AMEX : {
     type : 'QG_AMEX',
     dialogCaption : 'AMEX',
     chartContainerCaption : 'Quandl Google AMEX',
     fnOption : GoogleNyseAmex.getTickets
  },
  QG_ARCA : {
     type : 'QG_ARCA',
     dialogCaption : 'ARCA',
     chartContainerCaption : 'Quandl Google ARCA',
     fnOption : GoogleNyseArca.getTickets
  },

  QG_BRUSSELS : {
     type : 'QG_BRUSSELS',
     dialogCaption : 'Euronext Brussels',
     chartContainerCaption : 'Quandl Google Euronext Brussels',
     fnOption : GoogleBrussels.getTickets
  },
  QG_LISBON : {
     type : 'QG_LISBON',
     dialogCaption : 'Euronext Lisbon',
     chartContainerCaption : 'Quandl Google Euronext Lisbon',
     fnOption : GoogleLisbon.getTickets
  },
  QG_TALLIN : {
    type : 'QG_TALLIN',
    dialogCaption : 'Tallin',
    chartContainerCaption : 'Quandl Google Tallin',
    fnOption : GoogleTallin.getTickets
  },
  QG_RIGA : {
    type : 'QG_RIGA',
    dialogCaption : 'Riga',
    chartContainerCaption : 'Quandl Google Riga',
    fnOption : GoogleRiga.getTickets
  },
  QG_VILNIUS : {
    type : 'QG_VILNIUS',
    dialogCaption : 'Vilnius',
    chartContainerCaption : 'Quandl Google Vilnius',
    fnOption : GoogleVilnius.getTickets
  },

  QG_SHENZHEN : {
     type : 'QG_SHENZHEN',
     dialogCaption : 'Shenzhen',
     chartContainerCaption : 'Quandl Google Shenzhen',
     fnOption : GoogleShenzhen.getTickets
  },
  QG_SINGAPURE : {
     type : 'QG_SINGAPURE',
     dialogCaption : 'Singapure',
     chartContainerCaption : 'Quandl Google Singapure',
     fnOption : GoogleSingapure.getTickets
  },
  QG_KOREA : {
     type : 'QG_KOREA',
     dialogCaption : 'Korea',
     chartContainerCaption : 'Quandl Google Korea',
     fnOption : GoogleKorea.getTickets
  },
  QG_NEWZEALAND : {
     type : 'QG_NEWZEALAND',
     dialogCaption : 'New Zealand',
     chartContainerCaption : 'Quandl Google New Zealand',
     fnOption : GoogleNewZealand.getTickets
  },
  QG_SAO_PAOLO : {
     type : 'QG_SAO_PAOLO',
     dialogCaption : 'Sao Paolo',
     chartContainerCaption : 'Quandl Google Sao Paolo',
     fnOption : GoogleSaoPaolo.getTickets
  }
}

export default DataQG
