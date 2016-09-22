
const ObjUtil = {

  findInPropArrayByPropItem(propArr, propItem, obj, value){
    return obj[propArr].find((item, index) => {
       return item[propItem] === value;
    })
  }

};

export default ObjUtil
