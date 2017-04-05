
const ImArrayUtil = {

  push(arr, obj){
     return (arr)
        ? [...arr, Object.assign({}, obj)]
        : [ Object.assign({}, obj) ];
  },

  filterByPropFn : (propName) => (arr, propValue) => {
    return arr.filter((obj, index) =>{
        return obj[propName] !== propValue;
    });
  },

  insertItem(item, index, arr=[]){
    return [
        ...arr.slice(0, index),
        Object.assign({}, item),
        ...arr.slice(index)
    ]
    /*
    if (index !== 0){
      return [
          ...arr.slice(0, index),
          Object.assign({}, item),
          ...arr.slice(index)
      ]
    } else {
       return [
          Object.assign({}, item),
          ...arr
      ]
    }
    */
  },

  editByPropFn : (propName) => (arr, index, propValue) => {
    return [
      ...arr.slice(0, index),
      Object.assign({}, arr[index], { [propName]: propValue} ),
      ...arr.slice(index+1)
    ]
  }

};

export default ImArrayUtil
