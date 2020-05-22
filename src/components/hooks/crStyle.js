
const _assign = Object.assign;

const crStyle = (arr) => {
  const _len = arr.length
  , style = {};
  for(let i=0; i<_len; i++){
    const _style = arr[i];
    if (_style) { _assign(style, _style) }
  }
  return style;
};

export default crStyle
