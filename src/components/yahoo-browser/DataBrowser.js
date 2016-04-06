
import {QuandlYahoo} from '../../constants/DialogType';
import ComponentActions from '../../flux/actions/ComponentActions';

const fnClick = function(dialogType){
  return ComponentActions.showDialog.bind(null, dialogType);
}

const DataBrowser = [
   {
      caption : 'North American Stocks',
      items : [
        { title : 'Toronto', onClick : fnClick(QuandlYahoo.TORONTO) },
        { title : 'Toronto Ventures', onClick : fnClick(QuandlYahoo.TORONTO_VENTURE) },
        { title : 'Montreal', onClick : fnClick(QuandlYahoo.MONTREAL) },
        { title : 'Indices', onClick : fnClick(QuandlYahoo.INDICE) },
      ]
   },
   {
      caption : 'European Stocks',
      items : [
        { title : 'London', onClick : fnClick(QuandlYahoo.LONDON)},
        { title : 'Paris', onClick : fnClick(QuandlYahoo.PARIS)},
        { title : 'Amsterdam', onClick : fnClick(QuandlYahoo.AMSTERDAM)},
        { title : 'Coppenhagen', onClick : fnClick(QuandlYahoo.COPPENHAGEN)},
        { title : 'Oslo', onClick: fnClick(QuandlYahoo.OSLO)},
        { title : 'Stockholm', onClick : fnClick(QuandlYahoo.STOCKHOLM)},
        { title : 'Swiss', onClick : fnClick(QuandlYahoo.SWISS)},
        { title : 'Milan', onClick : fnClick(QuandlYahoo.MILAN)},
        { title : 'Madrid', onClick : fnClick(QuandlYahoo.MADRID)},
      ]
   },
   {
     caption : 'World Stocks',
     items : [
       { title : 'Australian', onClick : fnClick(QuandlYahoo.AUSTRALIAN)},
       { title : 'Shanghai', onClick : fnClick(QuandlYahoo.SHANGHAI)},
       { title : 'Shenzhen', onClick : fnClick(QuandlYahoo.SHENZHEN)},
       { title : 'Taiwan', onClick : fnClick(QuandlYahoo.TAIWAN)},
       { title : 'Hong Kong', onClick : fnClick(QuandlYahoo.HONG_KONG)},
       { title : 'Singapure', onClick : fnClick(QuandlYahoo.SINGAPURE)},
       { title : 'Bombey', onClick : fnClick(QuandlYahoo.BOMBEY)}
     ]
   }
];


export default DataBrowser
