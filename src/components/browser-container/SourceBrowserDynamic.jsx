import React from 'react';

import MenuBrowserDynamic from '../zhn-menu/MenuBrowserDynamic';

const SourceBrowserDynamic = React.memo(
  (props) => <MenuBrowserDynamic {...props} />,
  () => true
);

export default SourceBrowserDynamic
