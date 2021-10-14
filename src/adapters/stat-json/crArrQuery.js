import crQueryItem from './crQueryItem';

const crArrQuery = items => {
  const arrQuery = [];
  items.forEach(item => {
     const { slice } = item || {};
     for(const propName in slice){
       arrQuery.push(
         crQueryItem(
           propName,           
           'item',
           slice[propName]
       ))
     }
  })
  return arrQuery;
};

export default crArrQuery;
