import React from 'react'

import Link from './Link'

const URL = 'http://appsso.eurostat.ec.europa.eu/nui/show.do?lang=en&dataset=';

const S = {
  ROOT: {
    listStyle: 'none'
  }
};

const EsLink = ({ item }) => {
  if (!item) {
    return null;
  }
  return (
    <ul style={S.ROOT}>
      { item.href && <li>
         <Link
           caption="Eurostat Raw Data Link"
           href={item.href}
        />
        </li>
      }
      { item.dataset && <li>
          <Link
           caption="Eurostat Dataset Viewer (Http)"
           href={`${URL}${item.dataset}`}
         />
       </li>
      }
  </ul>
  )
};

export default EsLink
