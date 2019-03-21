
const _getExtremes = (v1, v2) => v1 >= v2
  ? { min: v2, max: v1 }
  : { min: v1, max: v2 };

const zhRemoveCategory = (Chart) => {
  Chart.prototype.zhRemoveCategory = function(id){
    try {
      const _c = this.xAxis[0].categories;
      if (_c) {
        const _newC = _c.filter(str => str !== id)
        , _newData = this.options.series[0].data.filter(p => p.c !== id && p.name !== id && p.id !== id)
        if (_newC.length < _c.length) {
          if (!this.yAxis[0].userOptions.zhNotZoomToMinMax) {
            const _len = _newData.length
                , { min, max } = _getExtremes(_newData[0].y, _newData[_len-1].y)
            this.yAxis[0].setExtremes(min, max, false)
          }
          this.xAxis[0].setCategories(_newC, false)
          this.series[0].update({ data: _newData }, true)
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  }
};

export default zhRemoveCategory
