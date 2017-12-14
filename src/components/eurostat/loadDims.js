import JSONstat from 'jsonstat';


const MSG_STILL_LOADING = "Another dims are still loading.";

const C = {
  //ROOT_URL: 'http://data.ssb.no/api/v0/en/table',
  //ROOT_URL: 'http://api.scb.se/OV0104/v1/doris/en/ssd',
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

const _crUrl = (proxy, baseMeta, id) => {
  if (proxy) {
    return `${proxy}${baseMeta}/${id}`;
  }
  return `${baseMeta}/${id}`;
}

const _crSelectDim = (code) => {
  return { code, ...C.SELECTION_ALL };
}

const _crOption = (dims) => {
  const arrQuery = dims
    .map(dim => _crSelectDim(dim.v));

  arrQuery.push(C.TID_DIM);

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


let IS_LOADING = false;
let URL_LOADING;
let ID_TIMEOUT;
const _fClearLoading = (url) => () => {
  if (url === URL_LOADING) {
    IS_LOADING = false
  }
}
const _markStartLoading = (url) => {
  URL_LOADING = url
  ID_TIMEOUT = setTimeout(_fClearLoading(url), 5000);
  IS_LOADING = true;
}
const _markStopLoading = () => {
  IS_LOADING = false;
  clearTimeout(ID_TIMEOUT)
}

const loadDims = ({ proxy, baseMeta, id, dims }) => {
  if (!IS_LOADING) {
    const _url = _crUrl(proxy, baseMeta, id)
        , _option = _crOption(dims);
    _markStartLoading(_url)
    return fetch(_url, _option)
      .then(res => res.json())
      .then(json => {
        const _ds = JSONstat(json).Dataset(0)
            , configs = dims.map(dim => ({
                id: dim.v,
                caption: dim.c,
                options: _crSelectOptions(_ds, dim)
              }));
        _markStopLoading()
        return { configs };
      })
      .catch(err => {
        _markStopLoading()
        return { errMsg: err.message };
      });
   } else {
     return Promise
       .resolve({ errMsg: MSG_STILL_LOADING });
   }
}

export default loadDims
