
const _isArr = Array.isArray;

const _getCaption = item => item && item.caption || '';

const _crC = (title, subtitle) => ({
  title, subtitle
});

const _crItemCaption = (items, titles) => {
  if (!_isArr(titles) || titles.length === 0) {
    titles = [0]
  }
  return titles
    .map(titleIndex => _getCaption(items[titleIndex]))
    .join(': ');
};

const createrFns = {

  crItemKey: (items, seriaType, date) => {
    const _prefix = items
      .filter(Boolean)
      .map(item => item.value || item.caption || item)
      .join('_');
    return [
      _prefix,
      seriaType || '',
      date || ''
    ].filter(Boolean)
     .join('_');
  },

  crCaption: (items, titles) => {
    const itemCaption = _crItemCaption(items, titles)
    , oneC = _getCaption(items[0])
    , twoC = _getCaption(items[1])
    , threeC = _getCaption(items[2])
    , fourC = _getCaption(items[3]);

    let _caption = _crC(oneC);
    if (fourC) {
      _caption = _crC(`${oneC}: ${twoC}`, `${threeC}: ${fourC}`)
    } else if (threeC) {
      _caption = _crC(oneC, `${twoC}: ${threeC}`)
    } else if (twoC) {
      _caption = _crC(oneC, twoC )
    }
    return {
      itemCaption, threeC,
      ..._caption
    };
  },

  crAlertConf: (alertItemId, alertGeo, alertMetric) => ({
    alertItemId, alertGeo, alertMetric
  })
};

export default createrFns
