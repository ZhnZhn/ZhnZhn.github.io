export const fCompareBy = (
  by
) => (
  arrOrObjA,
  arrOrObjB
) => ((arrOrObjA || {})[by] < (arrOrObjB || {})[by])
  ? -1
  : ((arrOrObjA || {})[by] === (arrOrObjB || {})[by])
  ? 0
  : 1

export const fCompareByTwoProps = (
  propName1,
  propName2
) => (a, b) => a[propName1] < b[propName1]
  ? -1
  : a[propName1] > b[propName1]
  ? 1
  : a[propName2] < b[propName2]
  ? -1
  : a[propName2] > b[propName2]
  ? 1
  : 0
