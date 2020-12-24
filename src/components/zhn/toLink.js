
const toLink = (href, isHttp) => {
  const protocol = (href || '')
   .split('://')[0];
  return protocol === 'https'
     || ( isHttp && protocol === 'http')
   ? href
   : void 0;
};

export default toLink
