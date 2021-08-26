import fStatJsonAdapter from '../stat-json/fStatJsonAdapter';

const DATA_URL = 'https://api.scb.se/OV0104/v1/doris/en/ssd';
const StatSweden = fStatJsonAdapter(DATA_URL);

export default StatSweden
