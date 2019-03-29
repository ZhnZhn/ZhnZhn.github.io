
const PN_PREFIX = 'zhPlotLine'
const MAX_ID = 'max'
const MIN_ID = 'min'

const _crPropName = id => PN_PREFIX + id;

const _findPlotLine = (chart, id) => chart
  .options.yAxis[0].plotLines
     .find(item => item.id === id);

const zhTogglePlotLines = (Chart) => {
  Chart.prototype.zhTogglePlotLine = function(id){
    try {
      const _pn = _crPropName(id);
      if (!this[_pn]) {
        this[_pn] = _findPlotLine(this, id)
        this.yAxis[0].removePlotLine(id)
      } else {
        this.yAxis[0].addPlotLine(this[_pn])
        this[_pn] = null
      }
    } catch(err) {
      console.log(err.message)
    }
  }
  Chart.prototype.zhToggleMinMaxLines = function(){
    this.zhTogglePlotLine(MAX_ID)
    this.zhTogglePlotLine(MIN_ID)
  }
}

export default zhTogglePlotLines
