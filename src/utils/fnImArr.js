
const fnImArr = {

  push(arr, obj){
     return (arr)
        ? [...arr, Object.assign({}, obj)]
        : [ Object.assign({}, obj) ];
  },

  filterByPropFn: (propName) => (arr, propValue) => {
    return arr.filter(
      obj => obj[propName] !== propValue
    );
  },

  insertItem(item, index, arr=[]){
    return [
      ...arr.slice(0, index),
      Object.assign({}, item),
      ...arr.slice(index)
    ];
  },

  editByPropFn: (propName) => (arr, index, propValue) => {
    return [
      ...arr.slice(0, index),
      Object.assign({}, arr[index], { [propName]: propValue} ),
      ...arr.slice(index+1)
    ]
  }

};

export default fnImArr
