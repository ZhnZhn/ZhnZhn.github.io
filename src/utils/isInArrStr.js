
const _isArr = Array.isArray;

const isInArrStr = (arr) => (str) => {
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
};

export default isInArrStr
