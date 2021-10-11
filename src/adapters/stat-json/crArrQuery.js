import crQueryItem from './crQueryItem';

const crArrQuery = (items, isUpperCase) => {
  const arrQuery = [];
  items.forEach(item => {
     const { slice } = item || {};
     for(const propName in slice){
       const code = isUpperCase
         ? propName.toUpperCase()
         : propName;
       arrQuery.push(
         crQueryItem(
           code,
           'item',
           slice[propName]
       ))       
     }
  })
  return arrQuery;
};

export default crArrQuery;
