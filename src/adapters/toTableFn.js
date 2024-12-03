import {
  isTypeNumber,
  isStr,
  numberFormat,
  roundBy
} from './AdapterFn';

export const crNameProps = (
  name,
  pnOrIsHideOrVoid,
  isHideOrVoid
) => {
  const [pn, isHide] = isStr(pnOrIsHideOrVoid)
    ? [pnOrIsHideOrVoid, isHideOrVoid]
    : [name.toLowerCase(), pnOrIsHideOrVoid];
  return {
    name,
    pn,
    isHide
  };
};

export const crStyleBold = () => ({
  style: {
    fontWeight: 'bold'
  }
})

export const crNumberProps = (n) => ({
  toN: [n],
  isF: true,
  ...crStyleBold()
})

const _replaceNaN = (
  n,
  str=''
) => n - n === 0 ? n : str;

const _getCellValue = (r, h) => {
  const { pn, toN } = h
  , _isToNumber = !!toN
  , _toFixedBy = _isToNumber && toN[0]
  , _strV = r[pn];
  return _isToNumber
    ? isTypeNumber(_toFixedBy)
        ? roundBy(_strV, _toFixedBy)
        : _replaceNaN(parseFloat(_strV))
    : _strV;
};

export const crTableOptions = (
  id,
  title,
  headers,
  rows,
  dataSource,
  fns
) => ({
  id,
  title,
  headers,
  rows,
  dataSource,
  tableFn: {
    numberFormat,
    ...fns
  }
})

export const crTableConfig = ({
  id,
  title,
  headers,
  rows,
  dataSource,
  fns
}) => ({
  ...crTableOptions(
    id,
    title,
    headers,
    rows,
    dataSource,
    fns
  ),
  zhCompType: 'TABLE',
  zhConfig: {
    id: id, key: id
  }
})

export const crTableRows = (
  headers=[],
  rows=[],
  idPropName='id'
) => rows
  .map((r, rIndex) => {
     headers.forEach(h => {
       r[h.pn] = _getCellValue(r, h);
     })
     r.id = r[idPropName] || `id${rIndex}`
     return r;
  })
