import {
  getValue,
  getCaption,
  fCheckResponse
} from '../AdapterFn';
import { isCategorySeriaType } from '../CategoryFn';
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
      dfPc,
      dfT
    } = option
    , _r = getValue(items[0])
    , _item1 = items[1]
    , _pc = getValue(_item1) || dfPc || "TO"
    , _url = _crApiUrl(option);

    if (isCategorySeriaType(option)) {
      const _caption1 = getCaption(_item1);
      if (_caption1) {
        option.title = _caption1
        option.subtitle = dfT
      } else {
        option.title = dfT
      }
      const _ps = (option.time || '')
        .replace("M", "") || 2023;
      return `${_url}&pc=${_pc}&ps=${_ps}`;
    }

    return `${_url}&r=${_r}&pc=${_pc}&ps=2005-2024`;
  },

  checkResponse: fCheckResponse(getDataset)
};

export default WtApi
