import api from './ApiDataset';
import adapter from '../stat-json/StatJsonAdapter';
import fStatJsonAdapter from '../stat-json/fStatJsonAdapter';

const DATA_URL = 'https://data.ssb.no/api/v0/en/table';

const StatNorway = {
  StatNorway: { api, adapter },
  StatNorway2: fStatJsonAdapter(DATA_URL)
};

export default StatNorway
