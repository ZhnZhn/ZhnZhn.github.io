
const zhGetFromToDates = function({
  seriaIndex=0,
  format=a=>a
}){
  try {
    const pArr = this.series
      && this.series[seriaIndex].points
      || []
    , length = pArr.length;
    return Array.isArray(pArr) && length > 0 ? {
      from: format(pArr[0].x),
      to: format(pArr[length-1].x)
    } : {};
  } catch(err){
    console.log(err)
    return {};
  }
};

export default zhGetFromToDates
