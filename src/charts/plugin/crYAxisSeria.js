import ChartConfig from '../ChartConfig'

const _isArr = Array.isArray
const _assign = Object.assign

const _getType = chartInst =>
  chartInst?.userOptions?.chart?.type ?? void 0;
const _isCategoryChart = chartInst => {
  const _type = _getType(chartInst);
  return _type === 'bar' || _type === 'column';
}
const _isCategoryData = data => _isArr(data)
 && data[0] && data[0].c;

const _isCategoryCase = (chartInst, data) =>
  _isCategoryChart(chartInst) && _isCategoryData(data);

const _getCategories = chartInst =>
  chartInst?.userOptions?.xAxis?.categories ?? void 0;
const _crCategoriesHm = categories => {
  const _hm = {};
  let i=0;
  for(; i<categories.length; i++){
    _hm[categories[i]] = i
  }
  return _hm;
}

const _isNumber = n => typeof n === 'number'
const _orderByHm = (data, hm, length) => {
  const _data = new Array(length);
  let item, categoryIndex, i=0;
  for(; i<data.length; i++){
    item = data[i]
    categoryIndex = hm[item.c]
    if (_isNumber(categoryIndex)) {
      _data[categoryIndex] = item
    }
  }
  return _data;
}

const _trToCategory = (chartInst, data) => {
  const _categories = _getCategories(chartInst);
  if (!_isArr(_categories)) { return data; }
  const _hmCategories = _crCategoriesHm(_categories)
  , _length = _categories.length
  , _data = _orderByHm(data, _hmCategories, _length)
  return _data;
}

const crYAxisSeria = (chartInst, options) => {
  const { data } = options;
  if (_isCategoryCase(chartInst, data)) {
    return _assign(options, {
      data: _trToCategory(chartInst, data),
      type: void 0,
      point: {
        events: {
          mouseOver: null
        }
      }
    })
  } else if (options.type === 'columnrange') {
    return options;
  }
  return ChartConfig.crSeria(options);
};

export default crYAxisSeria
