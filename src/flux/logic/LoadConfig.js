import { LT_QCT } from '../../constants/LoadType';
import { loadNdlCommodityTrade } from './loadNdlCommodityTrade';
import LoadImpl from './LoadImpl';

const LoadConfig = {
  ...LoadImpl,
  [LT_QCT]: loadNdlCommodityTrade  
};

export default LoadConfig
