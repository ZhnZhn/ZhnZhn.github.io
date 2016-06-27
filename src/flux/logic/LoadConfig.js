
import ChartType from '../../constants/ChartType';

import {loadQuandl} from './loadQuandl';
import {loadQuandlCommodityTrade} from './loadQuandlCommodityTrade';

const LoadConfig = {
  Q : loadQuandl,
  QCT : loadQuandlCommodityTrade,
  [ChartType.WATCH_LIST] : loadQuandl
};

export default LoadConfig
