import api from './ApiDataset';
import adapter from '../stat-json/StatJsonAdapter';
import fStatJsonAdapter from '../stat-json/fStatJsonAdapter';

const DATA_URL = 'https://data.ssb.no/api/v0/en/table';

export const StatNorway = { api, adapter }
export const StatNorway2 = fStatJsonAdapter(DATA_URL)
