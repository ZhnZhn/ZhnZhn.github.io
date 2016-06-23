import {BrowserType} from './Type';
import {Quandl, QuandlYahoo, QuandlGoogle} from './DialogType';
import DataQE from './DataQE';
import DataQY from './DataQY';
import DataQG from './DataQG';
import ComponentActions from '../flux/actions/ComponentActions';
import ChartActions from '../flux/actions/ChartActions';

const fnClick = function(dialogType, browserType){
  return ComponentActions.showDialog.bind(null, dialogType, browserType);
}

const fnBadgeClick = function(dialogType, browserType){
  return ChartActions.showChart.bind(null, dialogType, browserType);
}
const fnBadgeClose = function(chartType){
  return ComponentActions.closeChartContainer2.bind(null, chartType);
}


const fnCreateMenu = function(menu, data, browserType){
  return menu.map((menuPart) => {
     const items = menuPart.items.map((item, index) =>{
        return {
                 id: item.id,
                 title: data[item.id].menuTitle,
                 counter: 0,
                 isOpen: false,
                 onClick: fnClick(item.id, browserType),
                 onBadgeClick: fnBadgeClick(item.id, browserType),
                 onBadgeClose : fnBadgeClose(item.id)
               }
     });
     return {
        caption: menuPart.caption,
        items: items
     }
  })
}

const menuQuandl = [
  {
     caption : 'Economic',
     items : [
       { id : Quandl.CURRENCY_HISTORY },
       { id : Quandl.COMMODITY_PRICE },
       { id : Quandl.COMMODITY_TRADE},
       { id : Quandl.GLOBAL_INDICATOR},
       { id : Quandl.WORLDBANK_PRICE },
       { id : Quandl.IMF_CROSSCOUNTRY },
       { id : Quandl.CPI_INFLATION },
       { id : Quandl.BIG_MAC}
     ]
  },
  {
     caption : 'World Stocks',
     items : [
       { id : Quandl.TOKIO_STOCK },
       { id : Quandl.WIKI_STOCK }
     ]
  },
  {
    caption : 'Futures',
    items : [
      { id : Quandl.CHINA_DCE_FUTURE },
      { id : Quandl.CHINA_ZCE_FUTURE }
    ]
  }
];

const menuQuandlYahoo = [
   {
      caption : 'North American Stocks',
      items : [
        { id : QuandlYahoo.TORONTO },
        { id : QuandlYahoo.TORONTO_VENTURE },
        { id : QuandlYahoo.MONTREAL },
        { id : QuandlYahoo.INDICE }
      ]
   },
   {
      caption : 'European Stocks',
      items : [
        { id : QuandlYahoo.LONDON },
        { id : QuandlYahoo.PARIS },
        { id : QuandlYahoo.AMSTERDAM },
        { id : QuandlYahoo.COPPENHAGEN },
        { id : QuandlYahoo.OSLO },
        { id : QuandlYahoo.STOCKHOLM },
        { id : QuandlYahoo.SWISS },
        { id : QuandlYahoo.MILAN },
        { id : QuandlYahoo.MADRID }
      ]
   },
   {
     caption : 'World Stocks',
     items : [
       { id : QuandlYahoo.AUSTRALIAN },
       { id : QuandlYahoo.SHANGHAI },
       { id : QuandlYahoo.SHENZHEN },
       { id : QuandlYahoo.TAIWAN },
       { id : QuandlYahoo.HONG_KONG },
       { id : QuandlYahoo.SINGAPURE },
       { id : QuandlYahoo.BOMBEY }
     ]
   }
];

const menuQuandlGoogle = [
  {
     caption : 'North American Stocks',
     items : [
       { id : QuandlGoogle.NASDAQ },
       { id : QuandlGoogle.NYSE },
       { id : QuandlGoogle.AMEX },
       { id : QuandlGoogle.ARCA }
     ]
  },
  {
     caption : 'European Stocks',
     items : [
       { id : QuandlGoogle.BRUSSELS },
       { id : QuandlGoogle.LISBON },
       { id : QuandlGoogle.TALLIN },
       { id : QuandlGoogle.RIGA },
       { id : QuandlGoogle.VILNIUS }
     ]
  },
  {
    caption : 'World Stocks',
    items : [
      { id : QuandlGoogle.SHENZHEN },
      { id : QuandlGoogle.SINGAPURE },
      { id : QuandlGoogle.KOREA },
      { id : QuandlGoogle.TAILAND },
      { id : QuandlGoogle.NEWZEALAND },
      { id : QuandlGoogle.SAO_PAOLO }
    ]
  }
]

const QuandlMenu = fnCreateMenu(menuQuandl, DataQE, BrowserType.QUANDL);
const QuandlYahooMenu = fnCreateMenu(menuQuandlYahoo, DataQY, BrowserType.QUANDL_YAHOO);
const QuandlGoogleMenu = fnCreateMenu(menuQuandlGoogle, DataQG, BrowserType.QUANDL_GOOGLE);

const BrowserMenu = {
  [BrowserType.QUANDL] : QuandlMenu,
  [BrowserType.QUANDL_YAHOO] : QuandlYahooMenu,
  [BrowserType.QUANDL_GOOGLE] : QuandlGoogleMenu
}

export default BrowserMenu
