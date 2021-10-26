
const toPlural = str => {
  if (!str) return str;
  const _lastIndex = str.length - 1;
  return str[_lastIndex] === 'y'
    ? str.slice(0, _lastIndex) + 'ies'
    : str + 's';
};

export default toPlural
