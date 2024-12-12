"use strict";

exports.__esModule = true;
exports.updateVisible = exports.findElementIndexByKey = exports.filterArrByKey = exports.doVisible = void 0;
const findElementIndexByKey = (arr, key) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].key === key) {
      return i;
    }
  }
  return -1;
};
exports.findElementIndexByKey = findElementIndexByKey;
const doVisible = (arr, keyValue) => {
  const _elementIndex = findElementIndexByKey(arr, keyValue);
  return _elementIndex > -1 ? [...arr.slice(0, _elementIndex), ...arr.slice(_elementIndex + 1), arr[_elementIndex]] : arr;
};
exports.doVisible = doVisible;
const updateVisible = (hmIs, visibleDialogs, key, maxDialog) => {
  const _keyIndex = visibleDialogs.indexOf(key);
  if (_keyIndex > -1) {
    visibleDialogs.splice(_keyIndex, 1);
  }
  visibleDialogs.push(key);
  hmIs[key] = true;
  if (visibleDialogs.length > maxDialog) {
    hmIs[visibleDialogs[0]] = false;
    visibleDialogs.splice(0, 1);
  }
};
exports.updateVisible = updateVisible;
const filterArrByKey = (arr, key) => {
  arr.splice(arr.indexOf(key), 1);
};
exports.filterArrByKey = filterArrByKey;
//# sourceMappingURL=DialogContainerFn.js.map