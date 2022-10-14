const getFnByPropName = (
  obj,
  propName,
  dfValue
) => !obj || typeof obj[propName] !== 'function'
  ? () => dfValue
  : obj[propName];

export default getFnByPropName
