
import {Quandl} from '../../constants/DialogType';
import ComponentActions from '../../flux/actions/ComponentActions';

const fnClick = function(dialogType){
  return ComponentActions.showDialog.bind(null, dialogType);
}

const DataBrowser = [
   {
      caption : 'Economic',
      items : [
        { title : 'Currency Histories', onClick : fnClick(Quandl.CURRENCY_HISTORY) },
        { title : 'Commodity Prices', onClick : fnClick(Quandl.COMMODITY_PRICE) },
        { title : 'Economic Metrics', onClick : fnClick(Quandl.WORLDBANK_PRICE) }
      ]
   },
   {
      caption : 'World Stocks',
      items : [
        { title : 'Tokio', onClick : fnClick(Quandl.TOKIO_STOCK)},
        { title : 'WIKI', onClick : fnClick(Quandl.WIKI_STOCK)}
      ]
   },
   {
     caption : 'Futures',
     items : [
       { title : 'China DCE', onClick : fnClick(Quandl.CHINA_DCE_FUTURE)},
       { title : 'China ZCE', onClick : fnClick(Quandl.CHINA_DCE_FUTURE)}
     ]
   }
];


export default DataBrowser
