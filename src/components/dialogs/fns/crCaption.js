
const crCaption = caption => caption
 && caption.indexOf(':') === -1
   ? `${caption}:`
   : caption;

export default crCaption
