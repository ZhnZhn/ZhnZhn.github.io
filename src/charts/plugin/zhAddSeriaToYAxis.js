import crDataMinMaxSlice from './crDataMinMaxSlice';
import crYAxisId from './crYAxisId';
import crYAxisSeria from './crYAxisSeria';

const _crAxis = (
  id,
  color
) => ({
    id,
    lineColor: color,
    tickColor: color,
    tickWidth: 3,
    tickLenght: 5,
    opossite: true,
    title: { text: ''},
    gridLineWidth: 0,
    labels: {
      style: {
        color
      }
    },
    showEmpty: false
});

//options = {color, name, yIndex, data, userMax, userMin}
//yIndex =  void 0 | 0 | number
const zhAddSeriaToYAxis = function(
  options={},
  seriaOptions
) {
  try {
    const {
      color,
      yIndex,
      name
    } = options
    , [
      isNewAxis,
      yAxisId
    ] = crYAxisId(this, yIndex, name);
    if (isNewAxis) {
      this.addAxis(_crAxis(yAxisId, color), false, true)
    }
    const _seria = crYAxisSeria(this, {
      color,
      name,
      ...seriaOptions,
      data: crDataMinMaxSlice(options),
      yAxis: yAxisId
    })
    , _seriaInst = this.addSeries(_seria, false);
    this.redraw();
    return _seriaInst;
  } catch(err) {
    console.log(err.message)
  }
};

export default zhAddSeriaToYAxis
