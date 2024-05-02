import fStatJsonAdapter from '../stat-json/fStatJsonAdapter';

const DATA_URL = 'https://www.pxweb.bfs.admin.ch/api/v1/en';
const crUrlPath = ({
  dfId
}) => `/${dfId}/${dfId}.px`
const StatSwiss = fStatJsonAdapter(DATA_URL, crUrlPath);

export default StatSwiss
