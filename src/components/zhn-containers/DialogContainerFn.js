export const findCompIndex = (
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
  const _compIndex = findCompIndex(arr, keyValue);
  return _compIndex > -1 ? [
    ...arr.slice(0, _compIndex),
    ...arr.slice(_compIndex+1),
    arr[_compIndex]
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
