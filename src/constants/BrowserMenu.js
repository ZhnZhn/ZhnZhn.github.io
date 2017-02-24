import {BrowserType} from './Type';
import { Quandl } from './DialogType';
import DataQE from './DataQE';
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


const fnCreateMenu = function(menu=[], data, browserType){
  return menu.map((menuPart) => {
     const { caption, isInitClose, items=[] } = menuPart
         , _items = items.map((item, index) =>{
               const { id } = item
               return {
                  id: id,
                  title: data[id].menuTitle,
                  counter: 0,
                  isOpen: false,
                  onClick: fnClick(id, browserType),
                  onBadgeClick: fnBadgeClick(id, browserType),
                  onBadgeClose : fnBadgeClose(id)
               }
     });
     return {
        caption: caption,
        isInitClose: isInitClose,
        items: _items
     }
  })
}

const menuQuandl = [
  {
     caption : 'Economic',
     items : [
       { id : Quandl.CURRENCY_HISTORY },
       { id : Quandl.GLOBAL_INDICATOR },
       { id : Quandl.WORLDBANK_PRICE },
       { id : Quandl.IMF_CROSSCOUNTRY },
       { id : Quandl.EU_COMMISSION},
       { id : Quandl.CPI_INFLATION },
       { id : Quandl.BIG_MAC }
     ]
  },{
     caption : 'Commodity', isInitClose : true,
     items : [
       { id : Quandl.COMMODITY_PRICE },
       { id : Quandl.COMMODITY_TRADE },
       { id : Quandl.JODI_WORLD_GAS },
       { id : Quandl.JODI_WORLD_OIL },
       { id : Quandl.EIA_COAL },
       { id : Quandl.ROGERS_INDICES }
     ]
  },{
     caption : 'World Stocks',
     items : [
       { id : Quandl.EURONEXT_STOCK },
       { id : Quandl.TOKIO_STOCK },
       { id : Quandl.WIKI_STOCK },
       { id : Quandl.STOCK_INDEXES},
       { id : Quandl.UNICORN_RESEARCH }
     ]
  },{
    caption : 'Futures', isInitClose : true,
    items : [
      { id : Quandl.CHINA_FINANCE_FUTURE},
      { id : Quandl.DCE_FUTURE },
      { id : Quandl.ZCE_FUTURE },
      { id : Quandl.SHANGHAI_FUTURE },
      { id : Quandl.LIFFE_FUTURE },
      { id : Quandl.ICE_FUTURE },
      { id : Quandl.WIKI_FUTURE }
    ]
  },{
    caption : 'Real Estate', isInitClose : true,
    items : [
      { id : Quandl.ZILLOW_REAL_ESTATE },
      { id : Quandl.FMAC }
    ]
  }
];

const BrowserMenu = {
  //[BrowserType.QUANDL] : fnCreateMenu(menuQuandl, DataQE, BrowserType.QUANDL),
  [BrowserType.ECONOMIC] : fnCreateMenu(menuQuandl, DataQE, BrowserType.ECONOMIC),

  createMenu : fnCreateMenu
}

export default BrowserMenu
