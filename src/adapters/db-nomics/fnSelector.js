
const _getDocs = json =>
  ((json || {}).series || {}).docs || {};
const _getByPropName = (json, propName) =>
  _getDocs(json)[0][propName] || '';

const _fGetByPropName = propName =>
  json => _getByPropName(json, propName);

const fnSelector = {
  getPeriodAndValue: json => ({
    period: _getByPropName(json, 'period'),
    value: _getByPropName(json, 'value')
  }),

  getTitle: _fGetByPropName('dataset_name'),
  getSubtitle: _fGetByPropName('series_name'),
  getIndexedAt: _fGetByPropName('indexed_at')
};

export default fnSelector
