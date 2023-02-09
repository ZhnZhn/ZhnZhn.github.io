import crDataMinMaxSlice from './crDataMinMaxSlice';
import crYAxisId from './crYAxisId';
import crYAxisSeria from './crYAxisSeria';

const _crAxis = (
  id, {
  color,
  min,
  max
}) => ({
    id,
    min,
    max,
    lineColor: color,
    tickColor: color,
    tickWidth: 3,
    tickLenght: 5,
    opossite: true,
    title: { text: '' },
    gridLineWidth: 0,
    labels: {
      style: {
        color
      }
    },
    showEmpty: false
});

const _getToYAxisId = (
  chart,
  options
) => {
  const [
    isNewAxis,
    yAxisId
  ] = crYAxisId(
    chart,
    options.yIndex,
    options.name
  );
  if (isNewAxis) {
    chart.addAxis(_crAxis(yAxisId, options), false, true)
  }
  return yAxisId;
};

//options = {color, name, yIndex, min, max, data, userMax, userMin}
//yIndex =  void 0 | 0 | number
const zhAddSeriaToYAxis = function(
  options={},
  seriaOptions
) {
  try {
    const {
      name,
      color
    } = options
    , _seriaInst = this.addSeries(
       crYAxisSeria(this, {
         color,
         name,
         ...seriaOptions,
         data: crDataMinMaxSlice(options),
         yAxis: _getToYAxisId(this, options)
       }),
       false
    );

    this.redraw();
    return _seriaInst;
  } catch(err) {
    console.log(err.message)
  }
};

export default zhAddSeriaToYAxis
