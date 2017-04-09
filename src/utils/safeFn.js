
export default function safeFn(obj, propName, dfValue) {
  if (!obj) {
    return () => { return dfValue; };
  }

  if (typeof obj[propName] == 'function'){
    return obj[propName];
  } else  {
    return () => { return dfValue; };
  }    
}
