import React, { Fragment } from 'react'

import Link from './Link'

const CL = "native-link";

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
    <Fragment>
      <Link
        className={CL}
        caption="FRED Search"
        href={C.URL_SEARCH + id}
      />
      <Delimeter/>
      <Link
        className={CL}
        caption="FRED Graph"
        href={C.URL_GRAPH + id}
      />
      <Delimeter/>
      { article && <Link
          className={CL}
          caption="FRED Article"
          href={article}
        />
      }
   </Fragment>
  );
}

export default FredLink
