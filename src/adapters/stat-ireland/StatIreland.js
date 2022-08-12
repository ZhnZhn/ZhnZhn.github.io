import fStatJsonAdapter from '../stat-json/fStatJsonAdapter';

const DATA_URL = 'https://ws.cso.ie/public/api.restful/PxStat.Data.Cube_API.ReadDataset';
const _crUrlPath = (
  option
) => {
  const { dfId } = option
  , _arr = dfId.split('/');
  return '/' + _arr[_arr.length-1] + '/JSON-stat/2.0/en';
}
const StatIreland = fStatJsonAdapter(
  DATA_URL,
  _crUrlPath
);

export default StatIreland
