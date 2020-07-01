
const _assign = Object.assign
, _isArr = Array.isArray;

const fnImArr = {

  push(arr, obj){
     return _isArr(arr)
        ? [...arr, _assign({}, obj)]
        : [ _assign({}, obj) ];
  },

  filterByPropFn: (propName) => (arr, propValue) => {
    return arr.filter(
      obj => obj[propName] !== propValue
    );
  },

  insertItem(item, index, arr){
    return _isArr(arr)
      ? [
         ...arr.slice(0, index),
         _assign({}, item),
         ...arr.slice(index)
        ]
      : [ _assign({}, item) ];
  },

  editByPropFn: (propName) => (arr, index, propValue) => {
    return [
      ...arr.slice(0, index),
      _assign({}, arr[index], { [propName]: propValue} ),
      ...arr.slice(index+1)
    ]
  }

};

export default fnImArr
