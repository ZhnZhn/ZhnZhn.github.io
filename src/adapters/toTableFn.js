import AdapterFn from './AdapterFn'
import crTableConfig from './crTableConfig'

const { roundBy } = AdapterFn;

const _isNumber = n => typeof n === 'number'
, _replaceNaN = (n, str='') => n - n === 0
    ? n : str;

const _getCellValue = (r, h) => {
  const { pn, toN } = h
  , _isToNumber = !!toN
  , _toFixedBy = _isToNumber && toN[0]
  , _strV = r[pn];
  return _isToNumber
    ? _isNumber(_toFixedBy)
        ? roundBy(_strV, _toFixedBy)
        : _replaceNaN(parseFloat(_strV))
    : _strV;
};

const toTableFn = {
  crTableConfig,
  crRows: (headers=[], rows=[], idPropName='id') => {
    return rows.map((r, rIndex) => {
      headers.forEach(h => {
        r[h.pn] = _getCellValue(r, h);
      })
      r.id = r[idPropName] || `id${rIndex}`
      return r;
    });
  }
};

export default toTableFn
