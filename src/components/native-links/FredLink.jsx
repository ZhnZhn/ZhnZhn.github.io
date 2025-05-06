import Link from '../zhn/Link';

const ROOT = 'https://fred.stlouisfed.org/';
const URL_SEARCH = `${ROOT}search?st=`;
const URL_GRAPH = `${ROOT}series/`;

const S_DELIMETER = {
  display: 'inline-block',
  width: 32
};

const Delimeter = () => (
  <span style={S_DELIMETER}>&nbsp;</span>
)

const FredLink = ({
  item={}
}) => {
  const {
    id='',
    article
  } = item;
  return (
    <>
      <Link href={URL_SEARCH + id}>FRED Search</Link>
      <Delimeter/>
      <Link href={URL_GRAPH + id}>FRED Graph</Link>
      <Delimeter/>
      { article && <Link href={article}>FRED Article</Link> }
   </>
  );
}

export default FredLink
