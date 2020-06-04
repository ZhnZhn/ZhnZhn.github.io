
const getC = item => {
  const { caption, c } = item ?? {};
  return '' + (caption ?? c ?? '');
};

export default getC
