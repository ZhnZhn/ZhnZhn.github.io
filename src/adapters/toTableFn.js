import {
  isArr,
  isTypeNumber,
  isStr,
  numberFormat,
  roundBy
} from "./AdapterFn";

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

const _crStyle = (
  styleProps
) => ({
  style: styleProps
})

export const crStyleBold = (
  styleProps
) => _crStyle({
  fontWeight: "bold",
  ...styleProps
})

export const crStyleCenter = (
  styleProps
) => _crStyle({
  textAlign: "center",
  ...styleProps
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
  flatHeaders,
  rows,
  dataSource,
  fns
) => ({
  id,
  title,
  headers,
  flatHeaders,
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
  flatHeaders,
  rows,
  dataSource,
  fns
}) => ({
  ...crTableOptions(
    id,
    title,
    headers,
    flatHeaders,
    rows,
    dataSource,
    fns
  ),
  zhCompType: "TABLE",
  zhConfig: {
    id: id,
    key: id
  }
})

export const crTableRows = (
  headers=[],
  rows=[],
  idPropName="id"
) => rows
  .map((r, rIndex) => {
     headers.forEach(h => {
       r[h.pn] = _getCellValue(r, h);
     })
     r.id = r[idPropName] || `id${rIndex}`
     return r;
  })

const _setIdToHeaderItem = (
  id,
  item
) => {
  if (id !== 0) {
    item.id = id
  }
  return item;
}
, _addItemTo = (
  arr,
  item,
  id
) => {
  arr.push(_setIdToHeaderItem(id, item))
  return id + 1;
};

export const crTableFlatHeaders = (
  headers
) => {
  const _arr = [];
  let id = 0;
  for(const header of headers){
    if (isArr(header.items)) {
      for(const headerItem of header.items){
        id = _addItemTo(_arr, headerItem, id)
      }
    } else {
      id = _addItemTo(_arr, header, id)
    }
  }
  return _arr;
}
