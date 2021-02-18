
const _crHm = data => {
  const hm = {};
  data.forEach(point => {
    hm[point.category] = point
  })
  return hm;
};

const fCategoryCalc = calc => (d1, d2, {rc, sc}) => {
  const hmD2 = _crHm(d2);
  return d1.map(p1 => {
    const {category, color, status} = p1
    , value = calc(p1, hmD2[category]);
    return {
      y: value,
      id: category,
      c: category,
      color: color === sc ? rc : color,
      status: status
    };
  });
};

export default fCategoryCalc
