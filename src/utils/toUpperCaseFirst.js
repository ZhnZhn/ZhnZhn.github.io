
const toUpperCaseFirst = str => typeof str === 'string'
  && str.length > 0
    ? str[0].toUpperCase() + str.substring(1)
    : '';

export default toUpperCaseFirst
