import React from 'react';

import MenuBrowserDynamic2 from '../zhn/MenuBrowserDynamic2';

const SourceBrowserDynamic2 = React.memo(
  props => <MenuBrowserDynamic2 {...props} />,
  () => true
);

export default SourceBrowserDynamic2
