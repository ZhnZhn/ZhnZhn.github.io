import {
  isArr,
  crError
} from '../AdapterFn';
import { getTimeSeriesValues } from './fnAdapter';

const API_URL = "https://data.snb.ch/api/cube";

const _crDimSel = (
  options
) => options.items
  .map(item => item.v)
  .join(',');

const SnbApi = {
  getRequestUrl(options){
    return `${options.proxy}${API_URL}/${options.dfId}/data/json/en?dimSel=${_crDimSel(options)}&fromDate=${options.fromDate}`;
  },
  checkResponse(json, option){
    if (!isArr(getTimeSeriesValues(json))) {
      throw crError();
    }
  }
};

export default SnbApi
