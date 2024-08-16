import {  
  getValue,
  fCheckResponse
} from '../AdapterFn';
import { isCategory } from '../CategoryFn';
import { getDataset } from './fnAdapter';

const API_URL = 'https://api.wto.org/timeseries/v1/data';

const _crApiUrl = ({
  proxy,
  dfInd,
  apiKey
}) => `${proxy}${API_URL}?i=${dfInd}&p=000&subscription-key=${apiKey}`;

const WtApi = {
  getRequestUrl(option){
    const {
      items,
      dfPc
    } = option
    , _r = getValue(items[0])
    , _pc = getValue(items[1]) || dfPc || "TO"
    , _url = _crApiUrl(option);

    if (isCategory(option.seriaType)) {
      option.title = option.dfT
      const _ps = (option.time || '')
        .replace("M", "") || 2023;
      return `${_url}&pc=${_pc}&ps=${_ps}`;
    }

    return `${_url}&r=${_r}&pc=${_pc}&ps=2005-2024`;
  },

  checkResponse: fCheckResponse(getDataset)
};

export default WtApi
