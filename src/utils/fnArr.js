
const _isArr = Array.isArray
, _fIsItem = (propName, propValue) =>
    item => item[propName] === propValue
, _findArrIndexBy = (arr, propName, propValue) =>
    arr.findIndex(_fIsItem(propName, propValue));

const fnArr = {

  findIndexByProp: (propName) => (arr, propValue) => _isArr(arr)
    ? _findArrIndexBy(arr, propName, propValue)
    : -1,

  isSameByProp: (propName) => (arr, propValue) => _isArr(arr)
    ? _findArrIndexBy(arr, propName, propValue) === -1
        ? false : true
    : false,

  isInArrStr: (arr) => (str) => {
    if (!_isArr(arr)) {
      return false;
    }
    let i;
    for(i=0;i<arr.length;i++){
      if (str === arr[i]){
        return true;
      }
    }
    return false;
  },

  /*
  isStrInArr: (str) => (arr) => {
     if (!_isArr(arr)){
       return false;
     }
     let i;
     for(i=0;i<arr.length;i++){
       if (str === arr[i]){
         return true;
       }
     }
     return false;
  }
  */
};

export default fnArr
