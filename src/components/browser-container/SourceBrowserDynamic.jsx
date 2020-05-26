import React from 'react'

import BrowserMenu from '../zhn-menu/BrowserMenu'

const SourceBrowserDynamic = React.memo(
  (props) => <BrowserMenu {...props} />,
  () => true
);

export default SourceBrowserDynamic
