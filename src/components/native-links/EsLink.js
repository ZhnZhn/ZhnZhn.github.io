import React from 'react'

import Link from './Link'

const CL = "native-link";
const URL = 'http://appsso.eurostat.ec.europa.eu/nui/show.do?lang=en&dataset=';

const EsLink = ({ item }) => {
  if (!item || !item.dataset) {
    return null;
  }
  return (
    <Link
      className={CL}
      caption={`Eurostat Dataset Viewer (Http)`}
      href={`${URL}${item.dataset}`}
    />
  )
};  

export default EsLink
