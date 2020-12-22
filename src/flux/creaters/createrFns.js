
import ut from '../../utils/ut'

const { getC, getV } = ut

const _isArr = Array.isArray;

const _crC = (title, subtitle) => ({
  title, subtitle
});

const _crItemCaption = (items, titles) => {
  if (!_isArr(titles) || titles.length === 0) {
    titles = [0]
  }
  return titles
    .map(titleIndex => getC(items[titleIndex]))
    .join(': ');
};

const createrFns = {
  getC,
  getV,

  crItemKey: (items, ...args) => {
    const _prefix = items
      .filter(Boolean)
      .map(item => getV(item) || getC(item) || item)
      .join('_');
    return [
      _prefix,
      ...args
    ].filter(Boolean)
     .join('_');
  },

  crCaption: (items, titles) => {
    const itemCaption = _crItemCaption(items, titles)
    , oneC = getC(items[0])
    , twoC = getC(items[1])
    , threeC = getC(items[2])
    , fourC = getC(items[3]);

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
