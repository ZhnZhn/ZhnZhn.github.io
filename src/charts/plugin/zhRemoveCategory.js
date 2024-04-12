import { tryUpdate } from './pluginFn';

const zhRemoveCategory = function(id) {
  const userOptions = this.userOptions
  , { xAxis, series } = userOptions
  , _categories = xAxis.categories;
  if (_categories) {
    const _updatedCategories = _categories
      .filter(str => str !== id);
    if (_updatedCategories.length < _categories.length) {
      tryUpdate(this, {
        xAxis: {
          ...xAxis,
          categories: _updatedCategories
        },
        series: [{
          ...series[0],
          data: series[0].data
            .filter(p => p.c !== id
               && p.name !== id
               && p.id !== id
            )
        }]
      })
    }
  }
};

export default zhRemoveCategory
