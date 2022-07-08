import { crSeriaConfig} from '../ChartConfigFn';

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

const _isCategoryCase = (
  chartInst,
  data
) => _isCategoryChart(chartInst) && _isCategoryData(data);

const _getCategories = chartInst =>
  chartInst?.userOptions?.xAxis?.categories ?? void 0;

const _crDataHm = data => data
 .reduce((hm, p) => {
    hm[p.c] = p
    return hm;
 }, {});

const _crDataOrderedByCategories = (
  hmData,
  categories
) => categories
 .reduce((data, category) => {
    data.push(hmData[category] || {
      c: category,
      y: null
    })
    return data;
 }, []);

const _trToCategory = (
  chartInst,
  data
) => {
  const _categories = _getCategories(chartInst);
  if (!_isArr(_categories)) { return data; }
  const _hmData = _crDataHm(data);
  return _crDataOrderedByCategories(_hmData, _categories);
};

const crYAxisSeria = (
  chartInst,
  options
) => {
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
  return crSeriaConfig(options);
};

export default crYAxisSeria
