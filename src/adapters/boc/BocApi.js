import { fCheckResponse } from '../AdapterFn';
import {
  getSeriesId,
  getObservationsData
} from './fnAdapter';

const API_URL = 'https://www.bankofcanada.ca/valet/observations'

const BocApi = {
  getRequestUrl(options){
    return `${API_URL}/${getSeriesId(options)}/json?start_date=${options.fromDate}`
  },
  checkResponse: fCheckResponse(getObservationsData)
};

export default BocApi
