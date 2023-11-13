
const _getDocs = json =>
  ((json || {}).series || {}).docs || {};
const _getByPropName = (json, propName) =>
  _getDocs(json)[0][propName] || '';

const _fGetByPropName = propName =>
  json => _getByPropName(json, propName);


export const getPeriodAndValue = json => [
  _getByPropName(json, 'period'),
  _getByPropName(json, 'value')
]
export const getTitle = _fGetByPropName('dataset_name')
export const getSubtitle = _fGetByPropName('series_name')
export const getIndexedAt = _fGetByPropName('indexed_at')
