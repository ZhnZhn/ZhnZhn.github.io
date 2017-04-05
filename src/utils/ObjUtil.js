
const ObjUtil = {

  findInPropArrayByProp : (propArrName, propName) => (obj, propValue) => {
    return obj[propArrName].find((item, index) => {
       return item[propName] === propValue;
    })
  }

};

export default ObjUtil
