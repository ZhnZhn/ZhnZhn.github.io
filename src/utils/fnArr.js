
const fnArr = {

  findIndexByProp: (propName) => (arr, propValue) => {
     if (!Array.isArray(arr)){
       return -1;
     }

     return arr.findIndex(
       item => item[propName] === propValue
     );
  },


  isSameByProp: (propName) => (arr, propValue) => {
      if (!Array.isArray(arr)){
        return false;
      }

      return arr.findIndex(
         item => item[propName] === propValue
      ) === -1 ? false : true;
  },

  isStrInArr: (str) => (arr) => {
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

export default fnArr
