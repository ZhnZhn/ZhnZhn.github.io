import fnAdapter from './fnAdapter'
import crAdapterOHLCV  from '../crAdapterOHLCV'

const { crCaption, crHistOption } = fnAdapter

const _getData = (json, option) => {
  const { dfPn } = option;  
  return (json[dfPn] || json).reverse();
};

const toChart = crAdapterOHLCV({
  crCaption,
  getArr: _getData,
  crAddConfig: crHistOption
})

export default toChart
