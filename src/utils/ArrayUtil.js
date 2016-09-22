
const ArrayUtil = {

  findIndexByProp (propItem, arr, value){
     return arr.findIndex((item, index) => {
        return item[propItem] === value;
    })
  },


  checkSameByProp(propItem, arr, value){
      const index = (arr)
             ? arr.findIndex((item, i) => {
                  return item[propItem] === value;
               })
             : -1 ;
      if (index === -1) { return false;}
      else {return true;}
  }

};

export default ArrayUtil
