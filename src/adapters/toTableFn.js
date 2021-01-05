import AdapterFn from './AdapterFn'
import crTableConfig from './crTableConfig'

const { roundBy } = AdapterFn;

const DF = {
  TO_FIXED_BY: 2
};

const _replaceNaN = (n, str='') => n - n === 0
 ? n
 : str;

const _getCellValue = (r, h) => {
  const {
    pn, isToN,
    isToFixed, toFixedBy=DF.TO_FIXED_BY
  } = h
  , _strV = r[pn];
  return isToN
    ? isToFixed
        ? roundBy(_strV, toFixedBy)
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
