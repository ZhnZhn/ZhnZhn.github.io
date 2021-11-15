
const _assign = Object.assign;

const crStyle = arr => (arr||[])
 .reduce((style, itemStyle) => {
   if (itemStyle) {
     _assign(style, itemStyle)
   }
   return style;
 }, {});

export default crStyle
