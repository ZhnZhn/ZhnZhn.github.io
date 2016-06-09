
import ChartType from '../../constants/ChartType';
import {Quandl, QuandlYahoo, QuandlGoogle} from '../../constants/DialogType';

import {loadQuandl} from './loadQuandl';
import {loadQuandlCommodityTrade} from './loadQuandlCommodityTrade';

const LoadConfig = {};

const addConfig = function(obj, fn){
  for(var key in obj){
    LoadConfig[obj[key]] = fn;
  }
}
addConfig(Quandl, loadQuandl);
addConfig(QuandlGoogle, loadQuandl);
addConfig(QuandlYahoo, loadQuandl);
LoadConfig[ChartType.WATCH_LIST] = loadQuandl;
LoadConfig[ChartType.QUANDL_COMMODITY_TRADE] = loadQuandlCommodityTrade;

export default LoadConfig
