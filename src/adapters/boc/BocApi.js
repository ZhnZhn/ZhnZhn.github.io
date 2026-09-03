import { fCheckResponse } from '../AdapterFn';
import { crProviderApi } from '../ApiFn';
import {
  getSeriesId,
  getObservationsData
} from './fnAdapter';

const API_URL = 'https://www.bankofcanada.ca/valet/observations'

const getRequestUrl = (
  options
) => `${API_URL}/${getSeriesId(options)}/json?start_date=${options.fromDate}`
, checkResponse = fCheckResponse(getObservationsData)
, BocApi = crProviderApi(
  getRequestUrl,
  checkResponse
);

export default BocApi
