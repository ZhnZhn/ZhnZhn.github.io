
import ChartType from '../../constants/ChartType';
import { LoadType } from '../../constants/Type';

import {loadQuandl} from './loadQuandl';
import {loadQuandlCommodityTrade} from './loadQuandlCommodityTrade';

const LoadConfig = {
  [LoadType.Q] : loadQuandl,
  [LoadType.QCT] : loadQuandlCommodityTrade,
  [ChartType.WATCH_LIST] : loadQuandl
};

export default LoadConfig
