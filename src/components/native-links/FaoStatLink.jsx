import React from 'react'
import Link from './Link'

const C = {
  BASE: 'http://www.fao.org/faostat/en/#data/'
};

const FaoStatLink = ({ item }) => (
  <Link    
    href={item ? C.BASE + item : C.BASE}
    caption="FAOSTAT Link"
  />
);

export default FaoStatLink
