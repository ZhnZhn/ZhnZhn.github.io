import { fCheckResponse } from '../AdapterFn';
import {
  DATA_SNB_URL,
  getTimeSeriesValues
} from './fnAdapter';

const API_URL = `${DATA_SNB_URL}/api/cube`;

const _isDimensionId = id => id === "D0" || id === "D1"
, _crItem = ({ id, v }) => _isDimensionId(id)
  ? `${id}(${v})`
  : v;

const _crDimSel = (
  options
) => options.items
  .map(_crItem)
  .sort()
  .join(',');

const SnbApi = {
  getRequestUrl(options){
    return `${options.proxy}${API_URL}/${options.dfId}/data/json/en?dimSel=${_crDimSel(options)}&fromDate=${options.fromDate}`;
  },
  checkResponse: fCheckResponse(getTimeSeriesValues)
};

export default SnbApi
