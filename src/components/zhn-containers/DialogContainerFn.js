export const findElementIndexByKey = (
  arr,
  key
) => {
  for (let i=0; i<arr.length; i++){
    if (arr[i].key === key){
      return i;
    }
  }
  return -1;
}

export const doVisible = (
  arr,
  keyValue
) => {
  const _elementIndex = findElementIndexByKey(arr, keyValue);
  return _elementIndex > -1 ? [
    ...arr.slice(0, _elementIndex),
    ...arr.slice(_elementIndex+1),
    arr[_elementIndex]
  ] : arr;
}

export const updateVisible = (
  hmIs,
  visibleDialogs,
  key,
  maxDialog
) => {
  const _keyIndex = visibleDialogs.indexOf(key);
  if (_keyIndex > -1) {
    visibleDialogs.splice(_keyIndex, 1)
  }
  visibleDialogs.push(key)
  hmIs[key] = true
  if (visibleDialogs.length > maxDialog){
    hmIs[visibleDialogs[0]] = false
    visibleDialogs.splice(0, 1)
  }
}

export const filterArrByKey = (
  arr,
  key
) => {
  arr.splice(arr.indexOf(key), 1)
}
