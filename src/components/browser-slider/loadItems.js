import trJsonSdn from './trJsonSdn';
import trJsonSir from './trJsonSir';

const _isArr = Array.isArray;

const _compareByText = (
  a,
  b
) => a.text < b.text
  ? -1
  : a.text > b.text
      ? 1
      : 0;

const _hmTr = {
  SDN: trJsonSdn,
  SIR: trJsonSir
};

const loadItems = (
  proxy='',
  dfProps,
  id
) => {
  const {
    rootUrl,
    dfTi='',
    lT
  } = dfProps
  , _url = `${proxy}${rootUrl}/${id}${dfTi}`;
  return fetch(_url, { cache: "default" })
    .then(res => {
      // For example case, CSO: Indicators
      if (res.status === 404) {
        throw { message: 'Items not found' };
      }
      return res.json();
    })
    .then(json => {
      if (_isArr(json)) {
        const _trJson = _hmTr[lT];
        if (_trJson) {
          json = _trJson(json, id)
        }
        json.sort(_compareByText)
      }
      return json;
    })
};

export default loadItems
