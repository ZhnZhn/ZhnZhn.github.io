
const _isArr = Array.isArray;

const _compareByText = (a, b) => {
  if (a.text < b.text) return -1;
  if (a.text > b.text) return 1;
  return 0;
};

const _isEmptyTables = ({ tables }) => _isArr(tables)
  && tables.length === 0;

const _trJson = (json, id) => {
  const _json = [];
  json.forEach(item => {
    if (item.id !== id) {
      item.text=item.description
      if (item.hasSubjects || _isEmptyTables(item)) {
        item.type = 'l'
      }
      _json.push(item);
     }
  });
  return _json;
};

const _trJsonIfSdn = (json, id, lT) => {
  if (lT === 'SDN') {
    const _item = json[0];
    if ((_item.tables || []).length !== 0) {
      return _item.tables.map(a => {
        a.text = `${a.id}: ${a.text}, ${a.firstPeriod || ''}-${a.latestPeriod || ''}`
        return a;
      });
    } else if ((_item.subjects || []).length !== 0) {
      return _trJson(_item.subjects, id);
    } else {
      return _trJson(json, id);
    }
  }
  return json;
};

const loadItems = (proxy='', dfProps, id) => {
  const { rootUrl, dfTi='', lT } = dfProps
  , _url = `${proxy}${rootUrl}/${id}${dfTi}`;
  return fetch(_url, { cache: "default" })
    .then(res => res.json())
    .then(json => {
      if (_isArr(json)) {
        json = _trJsonIfSdn(json, id, lT)
        json.sort(_compareByText)
      }
      return json;
    })
};

export default loadItems
