
export const Box = x => ({
  map : f => Box(f(x)),
  fold : f => f(x)
});

export const getFromNullable = (x, df={}) => {
   return x != null ? x : df;
};
