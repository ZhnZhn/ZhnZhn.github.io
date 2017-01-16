
export const isFn = (fn) => {
  return (typeof fn === 'function')
}

export const isStrInArr = (str) => (arr) => {
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


const is = {
  fn : isFn,
  strInArr : isStrInArr
}

export default is
