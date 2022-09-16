import Link from './Link';

const ROOT_URI = 'https://data.nasdaq.com/data/'
, DF_CAPTION = 'Nasdaq Data Link';

const QuandlLink = ({
  linkId,
  caption=DF_CAPTION
}) => linkId ? (
   <Link
      href={`${ROOT_URI}${linkId}`}
      caption={`${caption} ${linkId}`}
   />
  ) : null;

export default QuandlLink
