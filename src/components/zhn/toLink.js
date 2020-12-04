
const toLink = href => {
  const protocol = (href || '')
   .split('://')[0];
  return protocol === 'https'
    ? href
    : '';
};

export default toLink
