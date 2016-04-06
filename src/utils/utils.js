
export const isValueInObject = function(value, obj){
    for (var prop in obj){
      if (obj.hasOwnProperty(prop)){
         if (obj[prop] === value){
           return true;
         }
      }
    }
    return false;
}

export const isValueInPlainObject = function(value, obj){
  for (var prop in obj){
       if (obj[prop] === value){
         return true;
    }
  }
  return false;
}
