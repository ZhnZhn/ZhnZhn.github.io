

const _crP1 = (category, y, color) => ({
  y, category, color
})
, _crP2 = (category, y) => ({
  y, category
}),
_crExpectedPoint = (c, y, color) => ({
  y, c, color,
  id: c,
  status: void 0
});

//[c:'P1', s1:10, s2:5, r:5] Diff S1-S2
const _crParams = (arr, {sc, rc}) => {
  const d1 = [], d2 = [], expectedResult = [];
  arr.forEach(p => {
    d1.push(_crP1(p[0], p[1], sc))
    d2.push(_crP2(p[0], p[2]))
    expectedResult.push(_crExpectedPoint(p[0], p[3], rc))
  })
  return [d1, d2, expectedResult];
};

const categoryHelpers = {
   _crP1, _crP2, _crExpectedPoint, _crParams
};

describe('categoryHelpers',()=>{
  test('',()=>{})
})

export default categoryHelpers
