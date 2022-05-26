import fStatJsonAdapter from '../stat-json/fStatJsonAdapter';

const DATA_URL = 'https://statfin.stat.fi/PxWeb/api/v1/en/StatFin';
const StatFinland = fStatJsonAdapter(DATA_URL);

export default StatFinland
