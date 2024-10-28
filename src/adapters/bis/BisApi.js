import { isCategory } from '../CategoryFn';
import { crItemId } from './fnAdapter';

const BIS_API = "https://stats.bis.org/api/v2/data/dataflow/BIS";

const BisApi = {
  getRequestUrl(option){
    const queryToken = isCategory(option)
      ? `c%5BTIME_PERIOD%5D=${option.time}`
      : `c%5BTIME_PERIOD%5D=ge%3A${option.fromDate}`
    return `${option.proxy}${BIS_API}/${option.dfCase}/1.0/${crItemId(option)}?${queryToken}`;
  }
};

export default BisApi
