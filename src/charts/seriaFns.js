
const fns = {
  columnRange: (d1, d2) => {
    const d3 = [];
    d1.forEach((p1, index) => {
      const p2 = d2[index];
      if ( Boolean(p1.y) && Boolean(p2.y) ) {
        d3.push({
          name: p1.category,
          low: p1.y <= p2.y ? p1.y : p2.y,
          high: p1.y >= p2.y ? p1.y : p2.y
        })
      }
    })
    return d3;
  },
}

export default fns
