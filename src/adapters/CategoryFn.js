const _isArr = Array.isArray;

const _addToHm = (
  hm,
  p
) => (hm[p.c] = p, hm);

export const arrangeSeriaByCategories = (
  series,
  categories
) => {
  const _hmPoints = (series.data || [])
    .reduce(_addToHm, {});

  series.data = categories
    .map(category => _hmPoints[category] || null)
  return series;
};

//chart?.xAxis?.[0]?.categories
export const getCategories = (
  chart
) => ((chart.xAxis || [])[0] || {}).categories;

export const isCategoryCase = (
  config,
  categories
) => _isArr((config.xAxis||{}).categories)
  && _isArr(categories);
