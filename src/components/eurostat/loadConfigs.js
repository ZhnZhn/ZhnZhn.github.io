import LoadGuard from '../../utils/LoadGuard'

import loadDims from './loadDims'
import loadDimsWithOptions from './loadDimsWithOptions'


const MSG_STILL_LOADING = "Another dialog are still loading";

const _isDimsWithOptions = (dims) => {
  const _len = dims.length;
  let i=0;
  for(i; i<_len;i++) {
    if (!dims[i].options) { break; }
  }
  return i === _len;
};

const _crConfigs = dims => dims
 .map(({c, v, options}) => ({id:v, caption:c, options}));


 const _crUrl = ({ proxy='', baseMeta, dfId }) => {
   return `${proxy}${baseMeta}/${dfId}`
 };
const _crMetaUrl = props => props.metaUrl
 || _crUrl(props);


const guard = new LoadGuard();

const loadConfigs = (props) => {
  if (!guard.isLoading) {
    const metaUrl = _crMetaUrl(props);
    //Load from dims configuration
    if (props.dims) {
      return loadDims({ metaUrl, ...props })
    }
    guard.start(metaUrl);
    return loadDimsWithOptions(metaUrl)
      .then(({ dims, mapFrequency, timeId }) => {
        guard.stop()
        return _isDimsWithOptions(dims)
          ? {
              timeId, mapFrequency,
              configs: _crConfigs(dims)
            }
          : loadDims({
             noTime: props.noTime,
             metaUrl, dims, mapFrequency, timeId
            })
      })
      .catch(({ errMsg, message }) => {
        guard.stop()
        return { errMsg: errMsg || message };
      });
  } else {
    return Promise
      .resolve({ errMsg: MSG_STILL_LOADING });
  }
}

export default loadConfigs
