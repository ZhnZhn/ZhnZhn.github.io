import loadDimsWithOptions from './loadDimsWithOptions';

import crDimUrl from './crDimUrl';
import crConfigs from './crConfigs';

const MSG_DIMS = 'Loaded dims without options';

const _isDimsWithOptions = (dims) => {
  const _len = dims.length;
  let i=0;
  for(i; i<_len;i++) {
    if (!dims[i].options) { break; }
  }
  return i === _len;
};

const loadConfigsImplA = (guard, props) => {
  const dimUrl = crDimUrl(props)
  , propDims = props.dims;
  guard.start(dimUrl);
  return loadDimsWithOptions(dimUrl)
    .then(({ dims, mapFrequency, timeId }) => {
       if (!_isDimsWithOptions(dims)) {
         throw {errMsg: MSG_DIMS};
       }
       return {
         timeId, mapFrequency,
         configs: crConfigs(dims, propDims)
       };
    })
};

export default loadConfigsImplA
