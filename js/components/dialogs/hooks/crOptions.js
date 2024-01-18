"use strict";

exports.__esModule = true;
exports.default = void 0;
const _isArr = Array.isArray;
const _notNullOrUndef = v => v != null;
const _crCvItems = arr => arr.map(_ref => {
  let {
    c,
    v,
    ...restProps
  } = _ref;
  return {
    c: `${c} (${v})`,
    v,
    ...restProps
  };
});
const _crSItems = arr => arr.map(_ref2 => {
  let {
    c,
    v,
    s
  } = _ref2;
  return {
    c: `${c} (${s})`,
    v,
    s
  };
});
const _crNbqItems = arr => {
  const items = [];
  arr.forEach(_ref3 => {
    let {
      n,
      b,
      q
    } = _ref3;
    if (_isArr(q)) {
      q.forEach(to => {
        const s = `${b}/${to}`;
        items.push({
          c: `${n} (${s})`,
          s
        });
      });
    }
  });
  return items;
};
const REG_BLANKS = /\s/g;
const _crCpItems = arr => arr.map(_ref4 => {
  let {
    c,
    v,
    id
  } = _ref4;
  return {
    c: `${c} (${v})`,
    v: id || `${v}-${(c || '').replace(REG_BLANKS, '-')}`.toLowerCase()
  };
});

//cb-items
const _crT1 = arr => arr.map(c => {
  const [b, q] = c.split('/');
  return {
    c,
    v: `${b}-${q}`
  };
});
const _rCrItems = {
  t1: _crT1
};
const _crItems = (json, optionJsonProp) => {
  const _arr = json[optionJsonProp],
    _crItems = json.isCv ? _crCvItems : json.isNbq ? _crNbqItems : json.isCp ? _crCpItems : _rCrItems[json.type];
  return _crItems ? _crItems(_arr) : _arr[0] && _notNullOrUndef(_arr[0].s) ? _crSItems(_arr) : _arr;
};
const _crPropCaption = arr => !_isArr(arr) || arr.length === 0 ? void 0 : _notNullOrUndef(arr[0].c) ? 'c' : void 0;
const crOptions = (json, optionJsonProp) => {
  const items = _crItems(json, optionJsonProp),
    propCaption = _crPropCaption(items);
  return {
    items,
    propCaption
  };
};
var _default = exports.default = crOptions;
//# sourceMappingURL=crOptions.js.map