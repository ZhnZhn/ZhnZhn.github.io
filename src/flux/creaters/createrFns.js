
const _getCaption = item => item && item.caption || '';

const _crC = (title, subtitle) => ({
  title, subtitle
});

const createrFns = {

  crItemKey: (items, seriaType, date) => {
    const _prefix = items
      .filter(Boolean)
      .map(item => item.value || item)
      .join('_');
    return `${_prefix}_${seriaType || ''}_${date || ''}`;
  },

  crCaption: items => {
    const oneC = _getCaption(items[0])
    , twoC = _getCaption(items[1])
    , threeC = _getCaption(items[2])
    , fourC = _getCaption(items[3]);

    if (fourC) return _crC(`${oneC}: ${twoC}`, `${threeC}: ${fourC}`);
    if (threeC) return _crC(oneC, `${twoC}: ${threeC}`);
    if (twoC) return _crC(oneC, twoC );
    return {
      oneC, twoC, threeC, fourC,
      ..._crC(oneC)
    };
  },

  crAlertConf: (alertItemId, alertGeo, alertMetric) => ({
    alertItemId, alertGeo, alertMetric
  })
};

export default createrFns
