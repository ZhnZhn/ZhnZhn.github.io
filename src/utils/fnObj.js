
const fnObj = {

  findInPropArrayByProp : (propArrName, propName) => (obj, propValue) => {
    return obj[propArrName].find(
      item => item[propName] === propValue
    );
  }

};

export default fnObj
