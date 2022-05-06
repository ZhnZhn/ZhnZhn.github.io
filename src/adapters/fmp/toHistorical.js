import { crCaption, crHistOption } from './fnAdapter';
import crAdapterOHLCV  from '../crAdapterOHLCV';

const _getData = (
  json,
  { dfPn }
) => (json[dfPn] || json).reverse();

const toChart = crAdapterOHLCV({
  crCaption,
  getArr: _getData,
  crAddConfig: crHistOption
})

export default toChart
