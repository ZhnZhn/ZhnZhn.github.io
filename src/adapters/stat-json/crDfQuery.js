import { LT_SFL } from '../../constants/LoadType';
import crDfArrQuery from './crDfArrQuery';

const _crResponseFormat = ({
  loadId
}) => loadId === LT_SFL
 ? "json-stat2"
 : "json-stat"

const crDfQuery = option => ({
  method: 'POST',
  body: JSON.stringify({
     query: crDfArrQuery(option),
     response: {
        format: _crResponseFormat(option)
     }
  })
});

export default crDfQuery
