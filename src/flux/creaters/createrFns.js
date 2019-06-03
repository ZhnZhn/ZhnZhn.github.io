
const _getCaption = item => item && item.caption || '';

const _crC = (title, subtitle) => ({
  title, subtitle
});

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
    ].join('_');    
  },

  crCaption: items => {
    const oneC = _getCaption(items[0])
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
      oneC, twoC, threeC, fourC,
      ..._caption
    };
  },

  crAlertConf: (alertItemId, alertGeo, alertMetric) => ({
    alertItemId, alertGeo, alertMetric
  })
};

export default createrFns
