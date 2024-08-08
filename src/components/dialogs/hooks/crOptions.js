import {
  isArr,
  isObj,
  isStr
} from '../../uiApi';

const _notNullOrUndef = v => v != null;

const _crCvItems = arr => arr
 .map(({ c, v, ...restProps }) => ({
    c: `${c} (${v})`,
    v,
    ...restProps
  }));

const _crSItems = arr => arr
  .map(({ c, v, s }) => ({
    c: `${c} (${s})`,
    v,
    s
  }));

const _crVcItems = arr => arr.map(v => isObj(v)
 ? v
 : ({ c: v, v })
)

const _crNbqItems = arr => {
  const items = [];
  arr.forEach(({ n, b, q }) => {
    if (isArr(q)) {
      q.forEach(to => {
        const s = `${b}/${to}`;
        items.push({
          c: `${n} (${s})`,
          v: s
        })
      })
    }
  })
  return items;
};

const REG_BLANKS = /\s/g;

const _crCpItems = arr => arr
 .map(({ c, v, id }) => ({
    c: `${c} (${v})`,
    v: id || (`${v}-${(c || '').replace(REG_BLANKS, '-')}`).toLowerCase()
}));

const _fCrItems = crValue => arr => arr.map(c => {
  const [b, q] = c.split('/');
  return {c, v: crValue(b, q)};
})
, _crValueT1 = (b, q) => `${b}-${q}`
, _crValueT2 = (b, q) => `${b}${q}`
, _crValueT2L = (b, q) => `${b}${q}`.toLowerCase()
, _crValueT3 = (b, q) => `${b}_${q}`
, _rCrItems = {
  vc: _crVcItems,
  //cb-items, kc-items, kx-items
  t1: _fCrItems(_crValueT1),
  //bf-items, kr-items
  t2: _fCrItems(_crValueT2),
  //bt-items, ht-items
  t2l: _fCrItems(_crValueT2L),
  //gt-items
  t3: _fCrItems(_crValueT3),
  //bn-items
  nbq: _crNbqItems
};

const _crItemsWithFilters = (
  arr,
  filters
) => arr.map(item => {
  const not = item.not;
  if (isStr(not)) {
    const _filters = filters[not];
    if (isArr(_filters)) {
      item.not = _filters
    } else {
      delete item.not
    }
  }
  return item;
}, []);

const _crItems = (json, optionJsonProp) => {
  json = isObj(json) ? json : {}
  const _arr = json[optionJsonProp]
  , _crItems = json.isCv
    ? _crCvItems
    : json.isCp
    ? _crCpItems
    : _rCrItems[json.type];

  return _crItems
    ? _crItems(_arr)
    : _arr[0] && _notNullOrUndef(_arr[0].s)
        ? _crSItems(_arr)
        : isObj(json.filters)
            ? _crItemsWithFilters(_arr, json.filters)
            : _arr;
};

const _crPropCaption = (
  arr
) => !isArr(arr) || arr.length === 0
  ? void 0
  : _notNullOrUndef(arr[0].c)
     ? 'c'
     : void 0;

const crOptions = (
  json,
  optionJsonProp
) => {
  const items = _crItems(json, optionJsonProp)
  , propCaption = _crPropCaption(items);
  return {
    items,
    propCaption
  };
};

export default crOptions
