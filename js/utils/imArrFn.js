"use strict";

exports.__esModule = true;
exports.imArrPush = exports.imArrInsertItem = exports.imArrFactoryFilterByProp = exports.imArrFactoryEditByProp = void 0;
const _isArr = Array.isArray;

const imArrPush = (arr, obj) => _isArr(arr) ? arr.concat({ ...obj
}) : [{ ...obj
}];

exports.imArrPush = imArrPush;

const imArrInsertItem = (item, index, arr) => _isArr(arr) ? [...arr.slice(0, index), { ...item
}, ...arr.slice(index)] : [{ ...item
}];

exports.imArrInsertItem = imArrInsertItem;

const imArrFactoryFilterByProp = propName => (arr, propValue) => arr.filter(obj => obj[propName] !== propValue);

exports.imArrFactoryFilterByProp = imArrFactoryFilterByProp;

const imArrFactoryEditByProp = propName => (arr, index, propValue) => [...arr.slice(0, index), { ...arr[index],
  [propName]: propValue
}, ...arr.slice(index + 1)];

exports.imArrFactoryEditByProp = imArrFactoryEditByProp;
//# sourceMappingURL=imArrFn.js.map