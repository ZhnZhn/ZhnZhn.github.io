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
  crRows: (headers=[], rows=[]) => {
    const _rows = rows.map(r => {
      headers.forEach(h => {
        r[h.pn] = _getCellValue(r, h);
      })
      return r;
    })
    return _rows;
  }
};

export default toTableFn
