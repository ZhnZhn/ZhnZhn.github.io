const _assign = Object.assign;

export const crStyle2 = (
  style1,
  style2
) => style2
 ? {...style1, ...style2}
 : style1;

export const crStyle = (
  ...args
) => args.reduce((style, itemStyle) => itemStyle
  ? _assign(style, itemStyle)
  : style
, {})
