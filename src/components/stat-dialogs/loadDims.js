import JSONstat from 'jsonstat';

import LoadGuard from '../../utils/LoadGuard'
import loadJson from './loadJson'

const MSG_STILL_LOADING = "Another dims are still loading";

const C = {
  SELECTION_ALL: {
    selection: {
      filter: 'all',
      values: ['*']
    }
  },
  TID_DIM: {
      code: "Tid",
      selection: {
        filter: "top",
        values: [ "1" ]
      }
  }
};


const _crSelectDim = (code) => {
  return { code, ...C.SELECTION_ALL };
}

const _crOption = (dims, noTime) => {
  const arrQuery = dims
    .map(dim => _crSelectDim(dim.v));

  if (!noTime) {
   arrQuery.push(C.TID_DIM);
  }

  return  {
    method: 'POST',
    body: JSON.stringify({
       query: arrQuery,
       response: {
          format: "json-stat"
       }
    })
  };
}

const _crSelectOptions = (ds, dim) => {
  const arr = []
      , _id = dim.v
      , c = ds.Dimension(_id)
      , len = c.length;
  let i = 0;
  for(;i<len; i++){
    arr.push({
      caption: c.Category(i).label,
      slice: {
        [_id]: c.id[i]
      }
    })
  }
  return arr;
}

const _fNotTimeDimension = timeId => config => config.id !== timeId;

const _crConfigs = (json, dims, timeId) => {
  const _ds = JSONstat(json).Dataset(0)
  , configs = dims.map(dim => ({
      id: dim.v,
      caption: dim.c,
      options: _crSelectOptions(_ds, dim)
    }))
    .filter(_fNotTimeDimension(timeId));
  return configs;
}

const guard = new LoadGuard();

const loadDims = (props) => {
  const { metaUrl, dims=[], noTime, timeId } = props
  if (!guard.isLoading) {
    const _option = _crOption(dims, noTime);
    guard.start(metaUrl)
    return loadJson(metaUrl, _option)
      .then(json => {
        const configs = _crConfigs(json, dims, timeId);
        guard.stop()
        return { configs };
      })
      .catch(err => {
        guard.stop()
        return { errMsg: err.message };
      });
   } else {
     return Promise
       .resolve({ errMsg: MSG_STILL_LOADING });
   }
}

export default loadDims
