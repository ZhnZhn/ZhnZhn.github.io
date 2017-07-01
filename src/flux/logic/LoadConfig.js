
import ChartType from '../../constants/ChartType';
import { LoadType } from '../../constants/Type';

import {loadQuandl} from './loadQuandl';
import { loadBarchart } from './loadBarchart';
import { loadAlpha } from './loadAlpha';
import {loadQuandlCommodityTrade} from './loadQuandlCommodityTrade';
import { loadEuroStat } from './loadEuroStat';

const LoadConfig = {
  [LoadType.Q] : loadQuandl,
  [LoadType.B] : loadBarchart,
  [LoadType.AL] : loadAlpha,
  [LoadType.QCT] : loadQuandlCommodityTrade,
  [LoadType.EU_STAT] : loadEuroStat,
  [ChartType.WATCH_LIST] : loadQuandl,
  [LoadType.WL] : loadQuandl
};

export default LoadConfig
