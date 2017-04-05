
const ArrayUtil = {

  findIndexByProp: (propName) => (arr, propValue) => {
     if (!Array.isArray(arr)){
       return -1;
     }

     return arr.findIndex((item, index) => {
        return item[propName] === propValue;
    })
  },


  isSameByProp: (propName) => (arr, propValue) => {
      if (!Array.isArray(arr)){
        return false;
      }
      
      const index = arr.findIndex((item, i) => {
                      return item[propName] === propValue;
                    })

      return (index === -1) ? false : true;
  },

  isStrInArr : (str) => (arr) => {
     if (!Array.isArray(arr)){
       return false;
     }
     let i, len=arr.length;
     for(i=0;i<len;i++){
       if (str === arr[i]){
         return true;
       }
     }
     return false;
  }
};

export default ArrayUtil
