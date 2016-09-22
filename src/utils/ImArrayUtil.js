
const ImArrayUtil = {

  push(arr, obj){
     return (arr) ? [...arr, obj] : [obj];
  },

  filterByProp(prop, arr, value){
    return arr.filter((obj, index) =>{
        return obj[prop] !== value;
    });
  },

  insertItem(item, index, arr=[]){
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
  }

};

export default ImArrayUtil
