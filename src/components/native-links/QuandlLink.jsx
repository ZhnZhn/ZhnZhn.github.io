import Link from './Link';

const ROOT_URI = 'https://www.quandl.com/data/'
, DF_CAPTION = 'Quandl Data Link'
, S_LINK = { color: '#e05927' };

const QuandlLink = ({
  linkId,
  caption=DF_CAPTION
}) => {
  if (!linkId) return null;

  return (
    <Link
      style={S_LINK}
      href={`${ROOT_URI}${linkId}`}
      caption={`${caption} ${linkId}`}
    />)
};

export default QuandlLink
