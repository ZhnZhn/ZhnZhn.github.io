
const fnSelector = {
  _getDocs: json => json.series.docs,
  _getPropBy: (json, propName) => fnSelector
     ._getDocs(json)[0][propName] || '',

  getPeriodAndValue: json => {
    const docs = fnSelector._getDocs(json);
    return {
      period: docs[0].period,
      value: docs[0].value
    };
  },
  
  getTitle: json => fnSelector
    ._getPropBy(json, 'dataset_name'),
  getSubtitle: json => fnSelector
    ._getPropBy(json, 'series_name')
};

export default fnSelector
