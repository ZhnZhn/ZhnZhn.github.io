"use strict";

exports.__esModule = true;
exports.default = void 0;
const _isArr = Array.isArray;

const _crCvItems = arr => arr.map(_ref => {
  let {
    c,
    v,
    ...restProps
  } = _ref;
  return {
    c: c + " (" + v + ")",
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
    c: c + " (" + s + ")",
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
        const s = b + "/" + to;
        items.push({
          c: n + " (" + s + ")",
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
    c: c + " (" + v + ")",
    v: id || (v + "-" + (c || '').replace(REG_BLANKS, '-')).toLowerCase()
  };
});

const _crItems = (json, optionJsonProp) => {
  const _arr = json[optionJsonProp];

  if (json.isCv) {
    return _crCvItems(_arr);
  }

  if (json.isNbq) {
    return _crNbqItems(_arr);
  }

  if (json.isCp) {
    return _crCpItems(_arr);
  }

  return _arr[0] && _arr[0].s != null ? _crSItems(_arr) : _arr;
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
};

const crOptions = (json, optionJsonProp) => {
  const items = _crItems(json, optionJsonProp),
        propCaption = _crPropCaption(items);

  return {
    items,
    propCaption
  };
};

var _default = crOptions;
exports.default = _default;
//# sourceMappingURL=crOptions.js.map