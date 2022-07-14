
const _assign = Object.assign;

const crStyle = (...args) => args
 .reduce((style, itemStyle) => {
   if (itemStyle) {
     _assign(style, itemStyle)
   }
   return style;
 }, {});

export default crStyle
