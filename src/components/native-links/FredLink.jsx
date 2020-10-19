import Link from './Link'

const ROOT = 'https://fred.stlouisfed.org/';
const C = {
  URL_SEARCH: `${ROOT}search?st=`,
  URL_GRAPH: `${ROOT}series/`
};

const S = {
  DELIMETER: {
    display: 'inline-block',
    width: '32px'
  }
};

const Delimeter = () =>
  <span style={S.DELIMETER}>&nbsp;</span>

const FredLink = ({ item={} }) => {
  const { id='', article } = item;
  return (
    <>
      <Link
        caption="FRED Search"
        href={C.URL_SEARCH + id}
      />
      <Delimeter/>
      <Link
        caption="FRED Graph"
        href={C.URL_GRAPH + id}
      />
      <Delimeter/>
      { article && <Link
          caption="FRED Article"
          href={article}
        />
      }
   </>
  );
}

export default FredLink
