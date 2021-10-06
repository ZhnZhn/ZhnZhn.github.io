import trJsonIfSdn from './trJsonIfSdn';

const _isArr = Array.isArray;

const _compareByText = (a, b) => {
  if (a.text < b.text) return -1;
  if (a.text > b.text) return 1;
  return 0;
};

const loadItems = (proxy='', dfProps, id) => {
  const { rootUrl, dfTi='', lT } = dfProps
  , _url = `${proxy}${rootUrl}/${id}${dfTi}`;
  return fetch(_url, { cache: "default" })
    .then(res => res.json())
    .then(json => {
      if (_isArr(json)) {
        json = trJsonIfSdn(json, id, lT)
        json.sort(_compareByText)
      }
      return json;
    })
};

export default loadItems
