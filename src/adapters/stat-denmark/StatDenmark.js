import fStatJsonAdapter from '../stat-json/fStatJsonAdapter';

const DATA_URL = 'https://api.statbank.dk/v1/data';
const StatDenmark = fStatJsonAdapter(DATA_URL)

export default StatDenmark
