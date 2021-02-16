import Big from 'big.js'

const pby10 = (data, by) => {
  const multipleBy = Big(10).pow(by);
  return [data.map(point => {
    point.y = parseFloat(Big(point.y).times(multipleBy).toString())
    return point;
  }), parseFloat(multipleBy.toString())];
};

export default pby10
