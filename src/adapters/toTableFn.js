import AdapterFn from './AdapterFn'

const { roundBy } = AdapterFn;

const DF = {
  TO_FIXED_BY: 2
};

const _getCellValue = (r, h) => {
  const {
    pn, isToN,
    isToFixed, toFixedBy=DF.TO_FIXED_BY
  } = h;
  return isToN
    ? isToFixed
        ? roundBy(r[pn], toFixedBy)
        : parseFloat(r[pn])
    : r[pn];
};

const toTableFn = {
  crRows: (headers=[], rows=[], idPropName='id') => {
    return rows.map(r => {
      headers.forEach(h => {
        r[h.pn] = _getCellValue(r, h);
      })
      r.id = r[idPropName]
      return r;
    });
  }
};

export default toTableFn
