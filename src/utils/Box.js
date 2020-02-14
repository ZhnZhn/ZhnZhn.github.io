
/*
const getFromNullable = (x, df={}) => {
   return x != null ? x : df;
};
*/

const Box = x => ({
  map : f => Box(f(x)),
  fold : f => f(x)
});

export default Box
