import React from 'react'

import MenuPart from './MenuPart'

const MenuParts = ({ menuItems=[] }) => menuItems
 .map((menuPart, index) => {
    return (<MenuPart key={index} {...menuPart} />);
  });

export default MenuParts
