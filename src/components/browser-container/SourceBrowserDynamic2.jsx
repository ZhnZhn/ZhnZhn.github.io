import React from 'react';

import memoEqual from '../hoc/memoEqual'
import MenuBrowserDynamic2 from '../zhn/MenuBrowserDynamic2';

const SourceBrowserDynamic2 = memoEqual(
  props => <MenuBrowserDynamic2 {...props} />
);

export default SourceBrowserDynamic2
