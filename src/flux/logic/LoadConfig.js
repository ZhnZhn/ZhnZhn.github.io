
import ChartType from '../../constants/ChartType';
import { LoadType } from '../../constants/Type';

import {loadQuandl} from './loadQuandl';
import {loadQuandlCommodityTrade} from './loadQuandlCommodityTrade';
import { loadEuroStat } from './loadEuroStat';

const LoadConfig = {
  [LoadType.Q] : loadQuandl,
  [LoadType.QCT] : loadQuandlCommodityTrade,
  [LoadType.EU_STAT] : loadEuroStat,
  [ChartType.WATCH_LIST] : loadQuandl
};

export default LoadConfig
