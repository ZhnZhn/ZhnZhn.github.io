
const _isUndef = v => typeof v === 'undefined';
const _isStrNotEmpty = str => typeof str === 'string'
  && str;
const _isNumber = n => typeof n === 'number'
 && n-n === 0;

const _crId = () => (
  Date.now().toString(36) + Math.random().toString(36).substr(2, 4)
).toUpperCase();

//toChart.yAxis[].userOptions.id

const _getAxisId = yAxis => {
  const { userOptions } = yAxis || {}
  , { id } = userOptions || {}
  return id;
};
const _getYAxis = chart => {
  const { yAxis } = chart
  return yAxis || [];
};

const _isUniqueId = (chart, name) => {
  const yAxis = _getYAxis(chart);
  let i = 0;
  for (i; i<yAxis.length;i++){
    if (name === _getAxisId(yAxis[i])) {
      return false;
    }
  }
  return true;
};


//yIndex = void 0 | 0 | number
//result = [boolean, void 0 | string]
const crYAxisId = (chart, yIndex, name) => {
  if (_isUndef(yIndex)) {
    const _id = _isStrNotEmpty(name)
      ? name
      : _crId();
    return [_isUniqueId(chart, _id), _id];
  }

  if (yIndex === 0){
    return [false, void 0];
  }

  if (_isNumber(yIndex)){
    const yAxis = _getYAxis(chart)
    , id = _getAxisId(yAxis[yIndex])
    , _isNew = _isUndef(id)
    , _id = _isNew ? _crId() : id;
    return [_isNew, _id];
  }

  return [true, _crId()];
};

export default crYAxisId
