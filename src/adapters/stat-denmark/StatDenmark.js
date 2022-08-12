import fStatJsonAdapter from '../stat-json/fStatJsonAdapter';

const DATA_URL = 'https://api.statbank.dk/v1/data';
const _crUrlPath = () => '';
const StatDenmark = fStatJsonAdapter(
  DATA_URL,
  _crUrlPath
);

export default StatDenmark
