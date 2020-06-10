
const _crItems = (json, optionJsonProp) => {
  const _arr = json[optionJsonProp];
  return _arr[0] && _arr[0].s != null
    ? _arr.map(({ c, v, s }) => ({
        c: `${c} (${s})`, v, s
      }))
    : _arr;
};

const _notNullOrUndef = v => v != null;

const _crPropCaption = arr => {
   if (!Array.isArray(arr) || arr.length === 0) {
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
