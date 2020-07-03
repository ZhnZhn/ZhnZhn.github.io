
const fCompareBy = by => (arrOrObjA, arrOrObjB) => {
  if (arrOrObjA[by] < arrOrObjB[by]) return -1;
  else if (arrOrObjA[by] === arrOrObjB[by]) return 0;
  else return 1;
}

export default fCompareBy
