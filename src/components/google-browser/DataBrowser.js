import {QuandlGoogle} from '../../constants/DialogType';
import ComponentActions from '../../flux/actions/ComponentActions';

const fnClick = function(dialogType){
  return ComponentActions.showDialog.bind(null, dialogType);
}


const DataBrowser = [
  {
     caption : 'North American Stocks',
     items : [
       { title : 'NASDAQ', onClick : fnClick(QuandlGoogle.NASDAQ) },
       { title : 'NYSE', onClick : fnClick(QuandlGoogle.NYSE) },
       { title : 'NYSE AMEX', onClick : fnClick(QuandlGoogle.AMEX) },
       { title : 'NYSE ARCA', onClick : fnClick(QuandlGoogle.ARCA) }
     ]
  },
  {
     caption : 'European Stocks',
     items : [
       { title : 'Euronext Brussels', onClick : fnClick(QuandlGoogle.BRUSSELS)},
       { title : 'Euronext Lisbon', onClick : fnClick(QuandlGoogle.LISBON)},
       { title : 'Tallin', onClick : fnClick(QuandlGoogle.TALLIN)},
       { title : 'Riga', onClick : fnClick(QuandlGoogle.RIGA)},
       { title : 'Vilnius', onClick : fnClick(QuandlGoogle.VILNIUS)},
     ]
  },
  {
    caption : 'World Stocks',
    items : [
      { title : 'Shenzhen', onClick : fnClick(QuandlGoogle.SHENZHEN)},
      { title : 'Singapure', onClick : fnClick(QuandlGoogle.SINGAPURE)},
      { title : 'Korea', onClick : fnClick(QuandlGoogle.KOREA)},
      { title : 'New Zealand', onClick : fnClick(QuandlGoogle.NEWZEALAND)},
      { title : 'Sao Paolo', onClick : fnClick(QuandlGoogle.SAO_PAOLO)}
    ]
  }
]

export default DataBrowser
