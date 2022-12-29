import Link from './Link';

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
      <Link
        caption="FRED Search"
        href={URL_SEARCH + id}
      />
      <Delimeter/>
      <Link
        caption="FRED Graph"
        href={URL_GRAPH + id}
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
