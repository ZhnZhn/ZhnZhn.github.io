import fStatJsonAdapter from '../stat-json/fStatJsonAdapter';

const DATA_URL = 'https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.PxAPIv1/en'
const StatIreland = fStatJsonAdapter(DATA_URL);

export default StatIreland
