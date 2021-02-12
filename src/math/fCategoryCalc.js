
const _findPointById = (data, category) => {
  for (let i=0; i<data.length; i++){
    const p = data[i]
    if (p.category === category) {
      return p;
    }
  }
};

const fCategoryRate = calc => (d1, d2, {rc, sc}) => {
  const dRate = [];
  for (let i=0; i<d1.length; i++){
    const p1 = d1[i]
    , { category, color, status } = p1
    , p2 = _findPointById(d2, category)
    , value = calc(p1, p2)
    dRate.push({
      y: value,
      id: category,
      c: category,
      color: color === sc ? rc : color,
      status: status
    })
  }
  return dRate;
};

export default fCategoryRate
