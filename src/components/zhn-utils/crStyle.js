export const crStyle2 = (
  style1,
  style2
) => style2
 ? {...style1, ...style2}
 : style1;

export const crStyle3 = (
  style1,
  style2,
  style3
) => crStyle2(
  crStyle2(style1, style2),
  style3
)
