
const fCompareBy = by => (
  arrOrObjA,
  arrOrObjB
) => ((arrOrObjA || {})[by] < (arrOrObjB || {})[by])
  ? -1
  : ((arrOrObjA || {})[by] === (arrOrObjB || {})[by])
      ? 0
      : 1;

export default fCompareBy
