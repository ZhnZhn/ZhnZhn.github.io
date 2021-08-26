import fStatJsonAdapter from '../stat-json/fStatJsonAdapter';

const DATA_URL = 'https://pxnet2.stat.fi/PXWeb/api/v1/en/StatFin';
const StatFinland = fStatJsonAdapter(DATA_URL);

export default StatFinland
