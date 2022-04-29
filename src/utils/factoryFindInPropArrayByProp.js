
const factoryFindInPropArrayByProp = (
  propArrName,
  propName
) => (obj, propValue) => obj[propArrName]
  .find( item => item[propName] === propValue);

export default factoryFindInPropArrayByProp
