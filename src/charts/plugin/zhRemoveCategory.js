
//refresh chart config
const _updateSeriaAsync = (seria) => {
  setTimeout(() => seria && seria.update(seria.options), 500)
};

const zhRemoveCategory = function(id){
  try {
    const _c = this.xAxis[0].categories;
    if (_c) {
      const _newC = _c.filter(str => str !== id)
      , _newData = this.options.series[0].data.filter(p => p.c !== id && p.name !== id && p.id !== id)
      if (_newC.length < _c.length) {
        const _seria = this.series[0];
        this.xAxis[0].setCategories(_newC, false)
        _seria.update({ data: _newData })
        _updateSeriaAsync(_seria)
      }
    }
  } catch (err) {
    console.log(err.message)
  }
};


export default zhRemoveCategory
