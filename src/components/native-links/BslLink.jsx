import React from 'react'
import Link from './Link'

const C = {
  URL: 'https://data.bls.gov/timeseries'
};

const BslLink = ({ item='' }) =>
  <Link
    className="native-link"
    href={`${C.URL}/${item}`}
    caption="BSL Data Link"
  />

export default BslLink
