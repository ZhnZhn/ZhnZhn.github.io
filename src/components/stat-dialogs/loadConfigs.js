import LoadGuard from '../../utils/LoadGuard';

import crEsDimUrl from './crEsDimUrl';
import loadDimsWithOptions from './loadDimsWithOptions';

const MSG_STILL_LOADING = "Another dialog are still loading"
, MSG_DIMS = 'Loaded dims without options';

const _isDimsWithOptions = (dims) => {
  const _len = dims.length;
  let i=0;
  for(i; i<_len;i++) {
    if (!dims[i].options) { break; }
  }
  return i === _len;
};

const _crConfigItem = (
  id,
  caption,
  options
) => ({
  id,
  caption,
  options
});

const _crPropDimsConfig = (dims, propDims) => {
  const _hmDim = Object.create(null);
  dims.forEach(dim => {
    _hmDim[dim.v] = dim
  })
  return propDims
    .map(({ v, c }) => _crConfigItem(v, c, _hmDim[v].options));
};

const _crDimsConfig = dims => dims
  .map(({c, v, options}) => _crConfigItem(v, c, options));


const _addDfItemTo = configs => {
  configs.forEach((config, index) => {
    const { options } = config;
    if (options.length === 1) {
      const _item = options[0];
      config.placeholder = _item.caption
      config.dfItem = _item
      config.isRow = false
    }
  })
};

const _crConfigs = (dims, propDims) => {
  const configs = propDims
    ? _crPropDimsConfig(dims, propDims)
    : _crDimsConfig(dims);
  configs.dateOptions = dims.dateOptions
  _addDfItemTo(configs)
  return configs;
};

const _crDimUrl = ({
  proxy='',
  baseMeta,
  dfId
}) => `${proxy}${baseMeta}/${dfId}`;

const _rCrDimUrl = {
  DF: _crDimUrl,
  EU_STAT: crEsDimUrl
};

const _crUrl = props =>
  (_rCrDimUrl[props.loadId] || _rCrDimUrl.DF)(props);

const _crMetaUrl = props => props.metaUrl
  || _crUrl(props);

const guard = new LoadGuard();

const loadConfigs = (props) => {
  if (!guard.isLoading) {
    const metaUrl = _crMetaUrl(props)
    , propDims = props.dims;
    guard.start(metaUrl);
    return loadDimsWithOptions(metaUrl)
      .then(({ dims, mapFrequency, timeId }) => {
         if (!_isDimsWithOptions(dims)) {
           throw {errMsg: MSG_DIMS};
         }
         return {
           timeId, mapFrequency,
           configs: _crConfigs(dims, propDims)
         };
      })
      .catch(({ errMsg, message }) => ({
         errMsg: errMsg || message
      }))
      .finally(()=>{
         guard.stop()
      });
  } else {
    return Promise
      .resolve({ errMsg: MSG_STILL_LOADING });
  }
};

export default loadConfigs
