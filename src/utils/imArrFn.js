const _isArr = Array.isArray;

export const imArrPush = (
  arr,
  obj
) => _isArr(arr)
  ? arr.concat({...obj})
  : [{...obj}];

export const imArrInsertItem = (
  item,
  index,
  arr
) => _isArr(arr)
  ? [
     ...arr.slice(0, index),
     {...item},
     ...arr.slice(index)
    ]
  : [{...item}];

export const imArrFactoryFilterByProp = (propName) =>
  (arr, propValue) => arr.filter(
      obj => obj[propName] !== propValue
  );

export const imArrFactoryEditByProp = (propName) =>
  (arr, index, propValue) => [
    ...arr.slice(0, index),
    {...arr[index], [propName]: propValue},
    ...arr.slice(index+1)
  ];
