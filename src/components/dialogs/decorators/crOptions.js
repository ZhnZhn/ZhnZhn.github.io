
const _isArr = Array.isArray;

const _crCvItems = arr => arr
 .map(({ c, v, ...restProps }) => ({
    c: `${c} (${v})`, v, ...restProps
  }));

const _crSItems = arr => arr
  .map(({ c, v, s }) => ({
    c: `${c} (${s})`, v, s
  }));

const _crNbqItems = arr => {
  const items = [];
  arr.forEach(({ n, b, q }) => {
    if (_isArr(q)) {
      q.forEach(to => {
        const s = `${b}/${to}`;
        items.push({c: `${n} (${s})`, s})
      })
    }
  })
  return items;
};

const _crItems = (json, optionJsonProp) => {
  const _arr = json[optionJsonProp];
  if (json.isCv) {
    return _crCvItems(_arr);
  }
  if (json.isNbq) {
    return _crNbqItems(_arr);
  }
  return _arr[0] && _arr[0].s != null
    ? _crSItems(_arr)
    : _arr;
};

const _notNullOrUndef = v => v != null;

const _crPropCaption = arr => {
   if (!_isArr(arr) || arr.length === 0) {
     return;
   }
   const _items = arr[0];
   if (_notNullOrUndef(_items.caption)) {
     return;
   }
   if (_notNullOrUndef(_items.c)) {
     return 'c';
   }
}

const crOptions = (json, optionJsonProp) => {
  const items = _crItems(json, optionJsonProp)
  , propCaption = _crPropCaption(items);
  return { items, propCaption };
}

export default crOptions
