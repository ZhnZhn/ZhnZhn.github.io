import Link from '../zhn/Link';

const ROOT_URI = 'https://data.nasdaq.com/data/'
, DF_CAPTION = 'Nasdaq Data Link';

const NdlLink = ({
  linkId,
  caption=DF_CAPTION
}) => linkId ? (
   <Link href={`${ROOT_URI}${linkId}`}>{`${caption} ${linkId}`}</Link>
  ) : null;

export default NdlLink
